using Microsoft.AspNetCore.SignalR;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.chatHub
{
    public class ChatHub : Hub
    {
        private readonly DataContext _context;
        private static Dictionary<string, string> _onlineUsers = new Dictionary<string, string>(); 

        public ChatHub(DataContext context)
        {
            _context = context;
        }

        private string GetUserIdFromToken()
        {
            var httpContext = Context.GetHttpContext();
            var token = httpContext.Request.Query["access_token"];

            if (!string.IsNullOrEmpty(token))
            {
                var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(token) as System.IdentityModel.Tokens.Jwt.JwtSecurityToken;

                if (jwtToken != null)
                {
                    var nameIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.NameId);

                    if (nameIdClaim != null)
                    {
                        var nameIdValues = nameIdClaim.Value.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                        return nameIdValues.FirstOrDefault()?.Trim(new[] { '[', ']', '"' });
                    }
                }
            }
            return null;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = GetUserIdFromToken();
            if (!string.IsNullOrEmpty(userId) && !_onlineUsers.ContainsKey(userId))
            {
                _onlineUsers.Add(userId, Context.ConnectionId);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = GetUserIdFromToken();
            if (!string.IsNullOrEmpty(userId) && _onlineUsers.ContainsKey(userId))
            {
                _onlineUsers.Remove(userId);
            }
            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessageToUser(CreateMessageDto createMessageDto)
        {
            var chatRoomCode = $"{createMessageDto.SenderId}{createMessageDto.AdvertiseCode}{createMessageDto.AdvertiserUserId}";
            var chatRoomNumericId = Convert.ToInt64(chatRoomCode);
            // دریافت یا ایجاد ChatRoom بر اساس ChatRoomId
            var chatRoom = await _context.ChatRooms
                .Include(cr => cr.User)
                .Include(cr => cr.Owner)
                .Include(cr => cr.Messages)
                .FirstOrDefaultAsync(cr => cr.Id == createMessageDto.ChatRoomId);

            if (chatRoom == null)
            {
                chatRoom = new ChatRoom
                {
                    ChatRoomCode = chatRoomNumericId,
                    UserId = createMessageDto.SenderId,
                    OwnerUserId = createMessageDto.AdvertiserUserId,
                    AdvertisementId = createMessageDto.AdvertiseCode,
                    Messages = new List<Message>(),
                    ChatRoomTitle = createMessageDto.AdvertiseTitle,
                    
                };
                _context.ChatRooms.Add(chatRoom);
                // await _context.SaveChangesAsync();

                // chatRoom = await _context.ChatRooms
                // .Include(cr => cr.User)
                // .Include(cr => cr.Owner)
                // .FirstOrDefaultAsync(cr => cr.ChatRoomCode == chatRoomNumericId);
            }
            //  chatRoom = await _context.ChatRooms
            //     .Include(cr => cr.User)
            //     .Include(cr => cr.Owner)
            //     .FirstOrDefaultAsync(cr => cr.Id == createMessageDto.ChatRoomId);
            // ساخت پیام جدید و افزودن به ChatRoom
            var message = new Message
            {
                SenderId = createMessageDto.SenderId,
                RecipientId = createMessageDto.RecipientId,
                AdvertiserUserId = createMessageDto.AdvertiserUserId,
                Content = createMessageDto.Content,
                ChatRoomCode = chatRoom.ChatRoomCode,
                AdvertiseCode = createMessageDto.AdvertiseCode,
                ChatRoomId = chatRoom.Id,
                                
            };

            chatRoom.Messages.Add(message);
            _context.Messages.Add(message);

            // ذخیره تغییرات در دیتابیس
            await _context.SaveChangesAsync();

            // chatRoom = await _context.ChatRooms
            //     .Include(cr => cr.User)
            //     .Include(cr => cr.Owner)
            //     .FirstOrDefaultAsync(cr => cr.Id == message.ChatRoomId);

            // دریافت اطلاعات فرستنده و گیرنده
            var sender = await _context.Users.FindAsync(createMessageDto.SenderId);
            var recipient = await _context.Users.FindAsync(createMessageDto.RecipientId);

            // ایجاد MessageDto با مقادیر مناسب
            var messageDto = new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                SenderUsername = sender != null ? $"{sender.FirstName} {sender.LastName}" : "فرستنده ناشناس",
                RecipientId = message.RecipientId,
                RecipientUsername = recipient != null ? $"{recipient.FirstName} {recipient.LastName}" : "گیرنده ناشناس",
                Content = message.Content,
                DateRead = message.DateRead,
                MessageSentDate = message.SentAt,
                AdvertiserUserId = message.AdvertiserUserId ?? 0,
                AdvertiseCode = createMessageDto.AdvertiseCode,
                ChatRoomTitle = chatRoom.ChatRoomTitle,
                ChatRoomId = message.ChatRoomId,
            };

            //  await Clients.Group(chatRoom.ChatRoomCode.ToString()).SendAsync("ReceiveMessage", messageDto);


            // //////////////////////////////////////////////////////////////
            // بررسی آنلاین بودن کاربر دریافت‌کننده
            if (_onlineUsers.TryGetValue(recipient.Id.ToString(), out string connectionId))
            {
                // ارسال پیام در صورت آنلاین بودن کاربر دریافت‌کننده
                if (_onlineUsers.TryGetValue(sender.Id.ToString(), out string connectionId_b))
                {
                    await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageDto);
                    await Clients.Client(connectionId_b).SendAsync("ReceiveMessage", messageDto);
                    
                }
                
                // await Clients.Client(sender.Id.ToString()).SendAsync("ReceiveMessage", messageDto);
            }

            if (_onlineUsers.TryGetValue(sender.Id.ToString(), out string connectionId_c))
            {
                await Clients.Client(connectionId_c).SendAsync("ReceiveMessage", messageDto);
            }
            

            // ///////////////////////////////////////////////////////////
            // ارسال پیام به گیرنده
            // await Clients.User(createMessageDto.RecipientId.ToString())
            //     .SendAsync("ReceiveMessage", messageDto);
        }

        public async Task MarkMessagesAsRead(int chatRoomId)
        {
            // جستجوی تمامی پیام‌های خوانده‌نشده در این چت‌روم
            var messages = await _context.Messages
                .Where(m => m.ChatRoomId == chatRoomId && m.DateRead == null)
                .ToListAsync();

            // به‌روزرسانی وضعیت خوانده‌شدن پیام‌ها
            foreach (var message in messages)
            {
                message.DateRead = DateTime.UtcNow;
            }

            // ذخیره تغییرات در پایگاه داده
            await _context.SaveChangesAsync();

            // ارسال به‌روزرسانی به کلاینت‌ها (اختیاری)
            await Clients.Group(chatRoomId.ToString())
                .SendAsync("MessagesMarkedAsRead", chatRoomId);
        }
        public async Task JoinChatRoom(int userId, int ownerUserId, int chatroomId, int advertiseCode)
        {
            if (userId == ownerUserId)
            {
                await Clients.Caller.SendAsync("JoinChatRoomResponse", new
                {
                    Success = false,
                    Message = "Same UserId for owner and starter",
                    ChatRoomData = (Object)null
                });
                return;
            }
            var chatRoomCode = $"{userId}{advertiseCode}{ownerUserId}";
            var chatRoomNumericCode = Convert.ToInt64(chatRoomCode);

            var chatRoom = await _context.ChatRooms
                .Include(cr => cr.Messages)
                // .Include(cr => cr.Owner)
                // .Include(cr => cr.User)
                .FirstOrDefaultAsync(cr => cr.Id == chatroomId || cr.ChatRoomCode == chatRoomNumericCode );
            
            // چک کردن اگر چت‌روم پیدا نشد
            if (chatRoom == null)
            {
                // ارسال پیام به فرانت‌اند به جای پرتاب خطا
                await Clients.Caller.SendAsync("JoinChatRoomResponse", new
                {
                    Success = false,
                    Message = "Chat room not found",
                    ChatRoomData = (Object)null
                });
                
                return; // برگرداندن از متد
            }
            else if (Context.ConnectionId == null)
            {
                await Clients.Caller.SendAsync("JoinChatRoomResponse", new
                {
                    Success = false,
                    Message = "ConnectionId is not available",
                    ChatRoomData = (Object)null
                });

                return;
            }

            // پیوستن به گروه چت‌روم
            // await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatRoomCode.ToString());
            await Groups.AddToGroupAsync(Context.ConnectionId, chatRoomCode);
            
            await Clients.Caller.SendAsync("JoinChatRoomResponse", new
            {
                Success = true,
                Message = "Joined successfully",
                // ChatRoom=chatRoom.ChatRoomCode
                ChatRoomData=chatRoom.Id
                // ChatRoomData = chatRoom
            }); 
        }


       
        // {
        //     var chatRoomId = $"{userId}{advertiseCode}{ownerUserId}";
        //     var chatRoomNumericId = Convert.ToInt64(chatRoomId);

        //     var chatRoom = await _context.ChatRooms
        //         .Include(cr => cr.Messages)
        //         .FirstOrDefaultAsync(cr => cr.ChatRoomCode == chatRoomNumericId);

        //     if (chatRoom == null)
        //     {
        //         // ارسال پیام به فرانت‌اند
                // await Clients.Caller.SendAsync("JoinChatRoomResponse", new
                // {
                //     Success = false,
                //     Message = "Chat room not found",
                //     ChatRoomData = (Object)null
                // });
                
                // return; // از ادامه متد جلوگیری می‌کنیم
        //     }

            // if (Context.ConnectionId == null)
            // {
            //     await Clients.Caller.SendAsync("JoinChatRoomResponse", new
            //     {
            //         Success = false,
            //         Message = "ConnectionId is not available",
            //         ChatRoomData = (Object)null
            //     });

            //     return;
            // }

        //     await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatRoomCode.ToString());
            // await Clients.Caller.SendAsync("JoinChatRoomResponse", new
            // {
            //     Success = true,
            //     Message = "Joined successfully",
            //     ChatRoomData = chatRoom
            // }); 
        // }


       


        // public async Task JoinChatRoom(int userId, int ownerUserId, int advertiseCode)
        // {
        //     var chatRoom = await _context.ChatRooms
        //         .Include(cr => cr.Messages)
        //         .FirstOrDefaultAsync(cr =>
        //             cr.UserId == userId &&
        //             cr.OwnerUserId == ownerUserId &&
        //             cr.AdvertisementId == advertiseCode);

        //     if (chatRoom == null)
        //     {
        //         chatRoom = new ChatRoom
        //         {
        //             UserId = userId,
        //             OwnerUserId = ownerUserId,
        //             AdvertisementId = advertiseCode
        //         };
        //         _context.ChatRooms.Add(chatRoom);
        //         await _context.SaveChangesAsync();
        //     }

        //     await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.Id.ToString());
        // }
    }
}


// namespace Api.chatHub
// {
//     public class ChatHub : Hub
//     {
//         private readonly DataContext _context;
//         private static Dictionary<string, string> _onlineUsers = new Dictionary<string, string>();

//         public ChatHub(DataContext context)
//         {
//             _context = context;
//         }

//         // دریافت UserId از توکن JWT
//         private string GetUserIdFromToken()
//         {
//             var httpContext = Context.GetHttpContext();
//             var token = httpContext.Request.Query["access_token"];

//             if (!string.IsNullOrEmpty(token))
//             {
//                 var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
//                 var jwtToken = handler.ReadToken(token) as System.IdentityModel.Tokens.Jwt.JwtSecurityToken;

//                 if (jwtToken != null)
//                 {
//                     var nameIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.NameId);

//                     if (nameIdClaim != null)
//                     {
//                         var nameIdValues = nameIdClaim.Value.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
//                         return nameIdValues.FirstOrDefault()?.Trim(new[] { '[', ']', '"' });
//                     }
//                 }
//             }
//             return null;
//         }

//         // اتصال کاربر به چت و ثبت آن در لیست آنلاین‌ها
//         public override async Task OnConnectedAsync()
//         {
//             var userId = GetUserIdFromToken();
//             if (!string.IsNullOrEmpty(userId) && !_onlineUsers.ContainsKey(userId))
//             {
//                 _onlineUsers.Add(userId, Context.ConnectionId);
//             }
//             await base.OnConnectedAsync();
//         }

//         // قطع اتصال و حذف کاربر از لیست آنلاین‌ها
//         public override async Task OnDisconnectedAsync(Exception exception)
//         {
//             var userId = GetUserIdFromToken();
//             if (!string.IsNullOrEmpty(userId) && _onlineUsers.ContainsKey(userId))
//             {
//                 _onlineUsers.Remove(userId);
//             }
//             await base.OnDisconnectedAsync(exception);
//         }

//         // پیوستن به چت‌روم
//         public async Task JoinChatRoom(int userId, int ownerUserId, int advertiseCode)
//         {
//             var chatRoom = await _context.ChatRooms
//                 .Include(cr => cr.Messages)
//                 .FirstOrDefaultAsync(cr =>
//                     cr.UserId == userId &&
//                     cr.OwnerUserId == ownerUserId &&
//                     cr.AdvertisementId == advertiseCode);

//             if (chatRoom == null)
//             {
//                 chatRoom = new ChatRoom
//                 {
//                     UserId = userId,
//                     OwnerUserId = ownerUserId,
//                     AdvertisementId = advertiseCode
//                 };
//                 _context.ChatRooms.Add(chatRoom);
//                 await _context.SaveChangesAsync();
//             }

//             await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.Id.ToString());
//         }

//         // ارسال پیام
//         public async Task SendMessage(CreateMessageDto createMessageDto)
//         {
//             var senderId = GetUserIdFromToken();
//             if (string.IsNullOrEmpty(senderId)) return;

//             var sender = await _context.Users.FindAsync(int.Parse(senderId));
//             var recipient = await _context.Users.FindAsync(createMessageDto.RecipientId);

//             if (recipient == null)
//             {
//                 await Clients.Caller.SendAsync("ErrorMessage", "Recipient not found");
//                 return;
//             }

//             var chatRoom = await _context.ChatRooms
//                 .FirstOrDefaultAsync(cr =>
//                     cr.UserId == int.Parse(senderId) && 
//                     cr.OwnerUserId == createMessageDto.AdvertiserUserId && 
//                     cr.AdvertisementId == createMessageDto.AdvertiseCode);


//                     if (chatRoom == null)
//                     {
//                         // ایجاد چت‌روم جدید
//                         chatRoom = new ChatRoom
//                         {
//                             UserId = createMessageDto.SenderId,
//                             OwnerUserId = createMessageDto.AdvertiserUserId,
//                             AdvertisementId = createMessageDto.AdvertiseCode,
//                             Created = DateTime.Now
//                         };
//                         _context.ChatRooms.Add(chatRoom);
//                         await _context.SaveChangesAsync();
//                     }



//             var message = new Message
//             {
//                 ChatRoomId = chatRoom.Id,
//                 SenderId = sender.Id,
//                 RecipientId = recipient.Id,
//                 Content = createMessageDto.Content,
//                 SentAt = DateTime.UtcNow,
//             };

//             _context.Messages.Add(message);
//             await _context.SaveChangesAsync();

//             var messageDto = new MessageDto
//             {
//                 Id = message.Id,
//                 // AdvertiserUserId = chatRoom.OwnerUserId,
//                 SenderId = sender.Id,
//                 SenderUsername = sender.UserName,
//                 RecipientId = recipient.Id,
//                 RecipientUsername = recipient.UserName,
//                 Content = message.Content,
//                 MessageSentDate = message.SentAt,
//                 AdvertiseCode = createMessageDto.AdvertiseCode,
//                 AdvertiseTitle = createMessageDto.AdvertiseTitle
//             };

//             // if (_onlineUsers.TryGetValue(recipient.Id.ToString(), out string connectionId))
//             // {
//             //     await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageDto);
//             // }

//              if (_onlineUsers.TryGetValue(recipient.Id.ToString(), out string connectionId))
//             {
//                 // ارسال پیام در صورت آنلاین بودن کاربر دریافت‌کننده
//                 await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageDto);
//                 // if (_onlineUsers.TryGetValue(sender.Id.ToString(), out string connectionId_b))
//                 // {
//                 //     await Clients.Client(connectionId_b).SendAsync("ReceiveMessage", messageDto);
//                 // }
                
//             }
//             if (_onlineUsers.TryGetValue(sender.Id.ToString(), out string connectionId_b))
//             {
//                 await Clients.Client(connectionId_b).SendAsync("ReceiveMessage", messageDto);
//             }

//             await Clients.Caller.SendAsync("MessageSent", messageDto);
//         }


//         /*
        
//         public async Task JoinChatRoom(int userId, int ownerUserId, int advertiseCode)
//         {
//             var chatRoom = await _context.ChatRooms
//                 .Include(cr => cr.Messages)
//                 .FirstOrDefaultAsync(cr =>
//                     cr.UserId == userId &&
//                     cr.OwnerUserId == ownerUserId &&
//                     cr.AdvertisementId == advertiseCode);

//             if (chatRoom == null)
//             {
//                 chatRoom = new ChatRoom
//                 {
//                     UserId = userId,
//                     OwnerUserId = ownerUserId,
//                     AdvertisementId = advertiseCode,
//                     Created = DateTime.Now
//                 };
//                 _context.ChatRooms.Add(chatRoom);
//                 await _context.SaveChangesAsync();
//             }

//             await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.Id.ToString());
//         }
    
        
//         */

//     }
// }


////////////////////
//     before     //
////////////////////

// namespace Api.chatHub
// {
//     public class ChatHub : Hub
//     {
//         private readonly DataContext _context;
//         private static Dictionary<string, string> _onlineUsers = new Dictionary<string, string>(); // نگه داشتن کاربران آنلاین

//         public ChatHub(DataContext context)
//         {
//             _context = context;
//         }

//         // استخراج userId از توکن JWT
//         private string GetUserIdFromToken()
//         {
//             var httpContext = Context.GetHttpContext();
//             var token = httpContext.Request.Query["access_token"]; // دریافت توکن از Query String

//             if (!string.IsNullOrEmpty(token))
//             {
//                 var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
//                 var jwtToken = handler.ReadToken(token) as System.IdentityModel.Tokens.Jwt.JwtSecurityToken;

//                 if (jwtToken != null)
//                 {
//                     var nameIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.NameId);

//                     if (nameIdClaim != null)
//                     {
//                         var nameIdValues = nameIdClaim.Value.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
//                         return nameIdValues.FirstOrDefault()?.Trim(new[] { '[', ']', '"' });
//                     }
//                 }
//             }
//             return null;
//         }


//         // اتصال کاربر به چت و ثبت آن در لیست آنلاین‌ها
//         public override async Task OnConnectedAsync()
//         {
//             var userId = GetUserIdFromToken();
//             if (!string.IsNullOrEmpty(userId) && !_onlineUsers.ContainsKey(userId))
//             {
//                 _onlineUsers.Add(userId, Context.ConnectionId);
//             }
//             await base.OnConnectedAsync();
//         }

//         // قطع اتصال و حذف کاربر از لیست آنلاین‌ها
//         public override async Task OnDisconnectedAsync(Exception exception)
//         {
//             var userId = GetUserIdFromToken();
//             if (!string.IsNullOrEmpty(userId) && _onlineUsers.ContainsKey(userId))
//             {
//                 _onlineUsers.Remove(userId);
//             }
//             await base.OnDisconnectedAsync(exception);
//         }

//         // ارسال پیام خصوصی به کاربر خاص
//         public async Task SendMessageToUser(CreateMessageDto createMessageDto)
//         {
//             var senderId = GetUserIdFromToken();
//             if (string.IsNullOrEmpty(senderId)) return;

//             // var sender = await _context.Users.FindAsync(int.Parse(senderId));
//             var sender = await _context.Users.FindAsync(createMessageDto.SenderId);
//             var recipient = await _context.Users.FindAsync(createMessageDto.RecipientId);

//             if (recipient == null)
//             {
//                 await Clients.Caller.SendAsync("ErrorMessage", "Recipient not found");
//                 return;
//             }

//             var message = new Message
//             {
//                 SenderId = sender.Id,
//                 RecipientId = recipient.Id,
//                 Content = createMessageDto.Content,
//                 MessageSentDate = DateTime.UtcNow,
//                 AdvertiseCode = createMessageDto.AdvertiseCode,
//                 AdvertiseTitle = createMessageDto.AdvertiseTitle,
//                 AdvertiserUserId = createMessageDto.AdvertiserUserId
//             };

//             // ذخیره پیام در دیتابیس
//             _context.Messages.Add(message);
//             await _context.SaveChangesAsync();

//             var messageDto = new MessageDto
//             {
//                 Id = message.Id,
//                 AdvertiserUserId = message.AdvertiserUserId,
//                 SenderId = sender.Id,
//                 SenderUsername = sender.UserName,
//                 RecipientId = recipient.Id,
//                 RecipientUsername = recipient.UserName,
//                 Content = message.Content,
//                 MessageSentDate = message.MessageSentDate,
//                 AdvertiseCode = message.AdvertiseCode,
//                 AdvertiseTitle = message.AdvertiseTitle
//             };

//             // بررسی آنلاین بودن کاربر دریافت‌کننده
//             if (_onlineUsers.TryGetValue(recipient.Id.ToString(), out string connectionId))
//             {
//                 // ارسال پیام در صورت آنلاین بودن کاربر دریافت‌کننده
//                 await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageDto);
//                 if (_onlineUsers.TryGetValue(sender.Id.ToString(), out string connectionId_b))
//                 {
//                     await Clients.Client(connectionId_b).SendAsync("ReceiveMessage", messageDto);
//                 }
//                 // await Clients.Client(sender.Id.ToString()).SendAsync("ReceiveMessage", messageDto);
//             }
            
//             // ارسال پیام به فرستنده برای تأیید ارسال موفقیت‌آمیز
//             await Clients.Caller.SendAsync("MessageSent", messageDto);
//         }
//     }
// }


