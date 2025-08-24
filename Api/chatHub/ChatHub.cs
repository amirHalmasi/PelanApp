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
            // var chatRoom = await _context.ChatRooms
            //     .Include(cr => cr.User)
            //     .Include(cr => cr.Owner)
            //     .Include(cr => cr.Messages)
            //     .FirstOrDefaultAsync(cr => cr.Id == createMessageDto.ChatRoomId);


            // بررسی اینکه آیا فرستنده صاحب آگهی است یا کاربر معمولی
            bool isSenderOwner = createMessageDto.SenderId == createMessageDto.AdvertiserUserId;

            var chatRoom = await _context.ChatRooms
                .Include(cr => cr.User)
                .Include(cr => cr.Owner)
                .Include(cr => cr.Messages)
                .FirstOrDefaultAsync(cr =>
                    cr.AdvertisementId == createMessageDto.AdvertiseCode &&
                    (
                        (isSenderOwner && cr.OwnerUserId == createMessageDto.SenderId && cr.UserId == createMessageDto.RecipientId) ||
                        (!isSenderOwner && cr.UserId == createMessageDto.SenderId && cr.OwnerUserId == createMessageDto.RecipientId)
                    )
                );



            if (chatRoom == null)
            {
                chatRoom = new ChatRoom
                {
                    ChatRoomCode = Convert.ToInt64($"{Math.Min(createMessageDto.SenderId, createMessageDto.RecipientId)}{createMessageDto.AdvertiseCode}{Math.Max(createMessageDto.SenderId, createMessageDto.RecipientId)}"),
                    UserId = isSenderOwner ? createMessageDto.RecipientId : createMessageDto.SenderId,
                    OwnerUserId = isSenderOwner ? createMessageDto.SenderId : createMessageDto.RecipientId,
                    AdvertisementId = createMessageDto.AdvertiseCode,
                    Messages = new List<Message>(),
                    ChatRoomTitle = createMessageDto.AdvertiseTitle
                };

                _context.ChatRooms.Add(chatRoom);
                await _context.SaveChangesAsync(); // یادت نره ذخیره
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
            // var chatRoomCode = $"{userId}{advertiseCode}{ownerUserId}";
            // var chatRoomNumericCode = Convert.ToInt64(chatRoomCode);

            // var chatRoom = await _context.ChatRooms
            //     .Include(cr => cr.Messages)
            //     // .Include(cr => cr.Owner)
            //     // .Include(cr => cr.User)
            //     .FirstOrDefaultAsync(cr => cr.Id == chatroomId || cr.ChatRoomCode == chatRoomNumericCode );
            
             // جستجو برای چت‌روم خاص بین این کاربر و صاحب آگهی برای این آگهی خاص
            var chatRoom = await _context.ChatRooms
                .Include(cr => cr.Messages)
                .FirstOrDefaultAsync(cr =>
                    cr.UserId == userId &&
                    cr.OwnerUserId == ownerUserId &&
                    cr.AdvertisementId == advertiseCode);


            // چک کردن اگر چت‌روم پیدا نشد
            if (chatRoom == null)
            {
                // ارسال پیام به فرانت‌اند به جای پرتاب خطا
                // await Clients.Caller.SendAsync("JoinChatRoomResponse", new
                // {
                //     Success = false,
                //     Message = "Chat room not found",
                //     ChatRoomData = (Object)null
                // });
                
                // return; // برگرداندن از متد

                chatRoom = new ChatRoom
                {
                    UserId = userId,
                    OwnerUserId = ownerUserId,
                    AdvertisementId = advertiseCode,
                    ChatRoomTitle = $"آگهی {advertiseCode}", // یا هر عنوان دلخواه
                    Messages = new List<Message>(),
                    ChatRoomCode = long.Parse($"{userId}{advertiseCode}{ownerUserId}")
                };

                _context.ChatRooms.Add(chatRoom);
                await _context.SaveChangesAsync();
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
            
            // await Groups.AddToGroupAsync(Context.ConnectionId, chatRoomCode);
             await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.ChatRoomCode.ToString());
            await Clients.Caller.SendAsync("JoinChatRoomResponse", new
            {
                Success = true,
                Message = "Joined successfully",
                // ChatRoom=chatRoom.ChatRoomCode
                ChatRoomData=chatRoom.Id
                // ChatRoomData = chatRoom
            }); 
        }


       
    }
}

