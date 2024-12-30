using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Interfaces;
using Api.DTOs;
using Api.Data;
using Api.Entities;
using Microsoft.EntityFrameworkCore;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly DataContext _context;

        public ChatController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("GetChatRooms/{userId}")]
        public async Task<ActionResult<IEnumerable<ChatRoomDto>>> GetChatRooms(int userId)
        {
            try
            {
                // دریافت لیست چت‌روم‌ها با فیلتر
                var chatRooms = await _context.ChatRooms
                    .Where(cr => cr.UserId == userId || cr.OwnerUserId == userId)
                    .Include(cr => cr.Messages)
                    .Select(cr => new ChatRoomDto
                    {
                        Id = cr.Id,
                        AdvertiserOwnerUserId = cr.OwnerUserId,
                        ChatStarterUserId = cr.UserId,
                        AdvertisementId = cr.AdvertisementId,
                        LastMessageContent = cr.Messages.Any()
                            ? cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().Content
                            : null,
                        UnreadMessagesCount = cr.Messages.Count(m => m.RecipientId == userId && m.DateRead == null),
                        LastMessageDate = cr.Messages.Any()
                            ? cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().SentAt
                            : null,
                        ChatRoomTitle = cr.ChatRoomTitle
                    })
                    .ToListAsync();

                // اگر لیست چت‌روم‌ها خالی بود، لیست خالی بازگردانده شود
                if (chatRooms == null || !chatRooms.Any())
                {
                    return Ok(new List<ChatRoomDto>());
                }

                return Ok(chatRooms);
            }
            catch (Exception ex)
            {
                // ثبت لاگ خطا
                Console.Error.WriteLine($"Error occurred while fetching chat rooms: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        // [HttpGet("GetChatRooms/{userId}")]
        // public async Task<ActionResult<IEnumerable<ChatRoomDto>>> GetChatRooms(int userId)
        // {
        //     var chatRooms = await _context.ChatRooms
        //         .Where(cr => cr.UserId == userId || cr.OwnerUserId == userId)
        //         .Include(cr => cr.Messages)
        //         .Select(cr => new ChatRoomDto
        //         {
        //             Id = cr.Id,
        //             // OwnerUserId = cr.OwnerUserId,
        //             AdvertisOwnerUserId = cr.OwnerUserId,

        //             // UserId = cr.UserId,
        //             ChatStarterUserId = cr.UserId,

        //             AdvertisementId = cr.AdvertisementId,
        //             LastMessageContent = cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().Content,
        //             UnreadMessagesCount = cr.Messages.Count(m => m.RecipientId == userId && m.DateRead == null),
        //             LastMessageTime = cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().SentAt
        //         })
        //         .ToListAsync();

        //     return Ok(chatRooms);
        // }

        [HttpGet("GetMessages/{chatRoomCode}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages(int chatRoomCode)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatRoomId == chatRoomCode)
                .Include(cr => cr.ChatRoom)
                .OrderBy(m => m.SentAt)
                .Select(m => new MessageDto
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    // SenderUsername = m.Sender.UserName,
                    SenderUsername = m.Sender.FirstName + " " + m.Sender.LastName,
                    RecipientId = m.RecipientId,
                    // RecipientUsername = m.Recipient.UserName,
                    RecipientUsername = m.Recipient.FirstName+ " " + m.Recipient.LastName,
                    Content = m.Content,
                    MessageSentDate = m.SentAt,
                    ChatRoomId = m.ChatRoom.Id,
                    DateRead = m.DateRead,
                    AdvertiserUserId = (int)m.AdvertiserUserId,
                    AdvertiseCode = m.AdvertiseCode,
                    ChatRoomTitle = m.ChatRoom.ChatRoomTitle,
                })
                .ToListAsync();

            return Ok(messages);
        }
    }
}

// namespace Api.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ChatsController : ControllerBase
//     {
//         private readonly DataContext _context;

//         public ChatsController(DataContext context)
//         {
//             _context = context;
//         }

//         // دریافت لیست چت‌روم‌های یک کاربر بر اساس UserId
//         [HttpGet("rooms/{userId}")]
//         public async Task<ActionResult<IEnumerable<ChatRoomDto>>> GetChatRooms(int userId)
//         {
           
                       
//             var chatRooms = await _context.ChatRooms
//                 .Where(cr => cr.UserId == userId || cr.OwnerUserId == userId)
//                 .Include(cr => cr.Messages)
//                 .Select(cr => new
//                 {
//                     ChatRoomId = cr.Id,
//                     OtherUserId = cr.UserId == userId ? cr.OwnerUserId : cr.UserId,
//                     LastMessage = cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().Content,
//                     LastMessageDate = cr.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault().SentAt
//                 })
//                 .ToListAsync();

//             return Ok(chatRooms);
            
            
//             // var chatRooms = await _context.ChatRooms
//             // .Where(cr => cr.UserId == userId || cr.OwnerUserId == userId)
//             // .ToListAsync();
//             // return Ok(chatRooms);

//         }

//         // دریافت لیست پیام‌های یک چت‌روم خاص بر اساس ChatRoomId
//         [HttpGet("messages/{chatRoomId}")]
//         public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int chatRoomId)
//         {
            
            
//             var messages = await _context.Messages
//                 .Where(m => m.ChatRoomId == chatRoomId)
//                 .OrderBy(m => m.SentAt)
//                 .Select(m => new MessageDto
//                 {
//                     Id = m.Id,
//                     SenderId = m.SenderId,
//                     RecipientId = m.RecipientId,
//                     Content = m.Content,
//                     MessageSentDate = m.SentAt,
//                     AdvertiseCode = m.ChatRoom.AdvertisementId,
//                     AdvertiserUserId = m.ChatRoom.OwnerUserId,
//                     SenderUsername = m.Sender.UserName,
//                     RecipientUsername = m.Recipient.UserName
//                 })
//                 .ToListAsync();

//             return Ok(messages);

            
//             // var messages = await _context.Messages
//             //     .Where(m => m.ChatRoomId == chatRoomId)
//             //     .OrderBy(m => m.SentAt)
//             //     .ToListAsync();

//             // return Ok(messages);
//         }

//         // ارسال پیام جدید
//         [HttpPost("send")]
//         public async Task<ActionResult> SendMessage([FromBody] Message newMessage)
//         {
//             if (newMessage == null) return BadRequest("Message cannot be null.");

//             var chatRoom = await _context.ChatRooms.FindAsync(newMessage.ChatRoomId);
//             if (chatRoom == null) return NotFound("Chat room not found.");

//             _context.Messages.Add(newMessage);
//             await _context.SaveChangesAsync();

//             return Ok(newMessage);
//         }



//             // ایجاد یا بازیابی چت‌روم بین دو کاربر
//         [HttpPost("startChat")]
//         public async Task<IActionResult> StartChat(CreateMessageDto createMessageDto)
//         {
//             // بررسی اینکه آیا چت‌روم از قبل وجود دارد
//             var existingChatRoom = await _context.ChatRooms
//                 .FirstOrDefaultAsync(cr =>
//                     cr.UserId == createMessageDto.SenderId &&
//                     cr.OwnerUserId == createMessageDto.AdvertiserUserId &&
//                     cr.AdvertisementId == createMessageDto.AdvertiseCode);

//             // اگر چت‌روم وجود ندارد، ایجاد آن
//             if (existingChatRoom == null)
//             {
//                 var newChatRoom = new ChatRoom
//                 {
//                     UserId = createMessageDto.SenderId,
//                     OwnerUserId = createMessageDto.AdvertiserUserId,
//                     AdvertisementId = createMessageDto.AdvertiseCode,
//                     Created = DateTime.Now
//                 };

//                 _context.ChatRooms.Add(newChatRoom);
//                 await _context.SaveChangesAsync();

//                 existingChatRoom = newChatRoom; // به منظور استفاده در ادامه‌ی کد
                
//             }

//             // return Ok(existingChatRoom.Id);
//             return Ok(new { ChatRoomId = chatRoom.Id });


//             // ////////////////////////////////////////
//             // ////////////////////////////////////////

//             // // ایجاد پیام در چت‌روم موجود
//             // var message = new Message
//             // {
//             //     ChatRoomId = existingChatRoom.Id,
//             //     SenderId = createMessageDto.SenderId,
//             //     RecipientId = createMessageDto.RecipientId,
//             //     Content = createMessageDto.Content,
//             //     SentAt = DateTime.UtcNow
//             // };

//             // _context.Messages.Add(message);
//             // await _context.SaveChangesAsync();

//             // var messageDto = new MessageDto
//             // {
//             //     Id = message.Id,
//             //     SenderId = message.SenderId,
//             //     RecipientId = message.RecipientId,
//             //     Content = message.Content,
//             //     MessageSentDate = message.SentAt,
//             //     AdvertiseCode = createMessageDto.AdvertiseCode,
//             //     AdvertiserUserId = createMessageDto.AdvertiserUserId,
//             //     SenderUsername = (await _context.Users.FindAsync(message.SenderId))?.UserName,
//             //     RecipientUsername = (await _context.Users.FindAsync(message.RecipientId))?.UserName
//             // };

//             // return Ok(messageDto);
//         }
//     }
// }



////////////////////
//     before     //
////////////////////


// namespace Api.Controllers
// {
//     public class MessagesController : BaseApiController
//     {
//         private readonly DataContext _context;

//         public MessagesController(DataContext context)
//         {
//             _context = context;
//         }

//         // GET: api/messages/{userId}
//         [HttpGet("{userId}")]
//         public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages(int userId)
//         {
//             var messages = await _context.Messages
//                 .Include(m => m.Sender)
//                 .Include(m => m.Recipient)
//                 .Where(m => m.RecipientId == userId || m.SenderId == userId)
//                 .OrderBy(m => m.MessageSentDate)
//                 .Select(m => new MessageDto
//                 {
//                     Id = m.Id,
//                     SenderId = m.SenderId,
//                     SenderUsername = m.Sender.UserName,
//                     RecipientId = m.RecipientId,
//                     RecipientUsername = m.Recipient.UserName,
//                     Content = m.Content,
//                     DateRead = m.DateRead,
//                     MessageSentDate = m.MessageSentDate,
//                     AdvertiseCode = m.AdvertiseCode,
//                     AdvertiseTitle = m.AdvertiseTitle
//                 })
//                 .ToListAsync();

//             return Ok(messages);
//         }

//         // POST: api/messages
//         [HttpPost]
//         public async Task<ActionResult<MessageDto>> SendMessage([FromBody] CreateMessageDto createMessageDto)
//         {
//             var sender = await _context.Users.FindAsync(createMessageDto.SenderId);
//             var recipient = await _context.Users.FindAsync(createMessageDto.RecipientId);

//             if (recipient == null)
//                 return NotFound("Recipient not found");

//             var message = new Message
//             {
//                 SenderId = createMessageDto.SenderId,
//                 RecipientId = createMessageDto.RecipientId,
//                 Content = createMessageDto.Content,
//                 MessageSentDate = DateTime.UtcNow,
//                 AdvertiseCode = createMessageDto.AdvertiseCode,
//                 AdvertiseTitle = createMessageDto.AdvertiseTitle
//             };

//             _context.Messages.Add(message);
//             await _context.SaveChangesAsync();

//             var messageDto = new MessageDto
//             {
//                 Id = message.Id,
//                 SenderId = message.SenderId,
//                 SenderUsername = sender.UserName,
//                 RecipientId = message.RecipientId,
//                 RecipientUsername = recipient.UserName,
//                 Content = message.Content,
//                 MessageSentDate = message.MessageSentDate,
//                 AdvertiseCode = message.AdvertiseCode,
//                 AdvertiseTitle = message.AdvertiseTitle
//             };

//             return Ok(messageDto);
//         }

//         // DELETE: api/messages/{messageId}
//         [HttpDelete("{messageId}")]
//         public async Task<ActionResult> DeleteMessage(int messageId)
//         {
//             var message = await _context.Messages.FindAsync(messageId);

//             if (message == null)
//                 return NotFound();

//             _context.Messages.Remove(message);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }
    

//         // ////////////////////////////////////

//         //   message.txt code was commented here

//         // ////////////////////////////////////
        
//     }
// }