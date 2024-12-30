using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;


using System;

// namespace Api.Entities
// {
//     public class Message
//     {
//         public int Id { get; set; }
//         public int ChatRoomId { get; set; }
//         public ChatRoom ChatRoom { get; set; }

//         public int SenderId { get; set; }
//         public AppUser Sender { get; set; }

//         public int RecipientId { get; set; }
//         public AppUser Recipient { get; set; }

//         public string Content { get; set; }
//         public DateTime SentAt { get; set; } = DateTime.Now;
//         public bool IsRead { get; set; } = false;
//     }
// }

namespace Api.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int? AdvertiserUserId{ get; set; } 
        public int ChatRoomId { get; set; }
        public long ChatRoomCode { get; set; }
        public ChatRoom ChatRoom { get; set; }
        public int SenderId { get; set; }
        public AppUser Sender { get; set; }
        public int RecipientId { get; set; }
        public AppUser Recipient { get; set; }
        public string Content { get; set; }
        public DateTime SentAt { get; set; }= DateTime.UtcNow;
        public DateTime? DateRead { get; set; }

        public bool SenderDeleted { get; set; }=false;
        public bool RecipientDeleted { get; set; }=false;
        public bool IsAdvertiseDeleted { get; set; }=false;
        public DateTime? RoomDeleteDate { get; set; } 
        public int AdvertiseCode { get; set; }

    }
}


////////////////////
//     before     //
////////////////////



// namespace Api.Entities
// {
//     public class Message
//     {
//         public int Id { get; set; }
//         // public int ChatStarterUserId{ get; set; }

//         // کلید خارجی برای کاربر ارسال‌کننده
//         public int AdvertiserUserId{ get; set; } 
//         public int SenderId { get; set; }
//         public AppUser Sender { get; set; }

//         // کلید خارجی برای کاربر دریافت‌کننده
//         public int RecipientId { get; set; }
//         public AppUser Recipient { get; set; }

//         public string Content { get; set; }
//         public DateTime? DateRead { get; set; }
//         public DateTime MessageSentDate { get; set; } = DateTime.UtcNow;
//         public bool SenderDeleted { get; set; }
//         public bool RecipientDeleted { get; set; }

//         public DateTime? RoomDeleteDate { get; set; } 
//         public bool IsAdvertiseDeleted { get; set; } 
//         public DateTime? AdvertiseDeleteDate { get; set; } 

//         public string AdvertiseCode { get; set; }
//         public string AdvertiseSenderUserId { get; set; }
//         public string AdvertiseTitle { get; set; }


        

        
//     }
// }