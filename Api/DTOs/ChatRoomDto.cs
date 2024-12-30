using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class ChatRoomDto
    {
        public int Id { get; set; }
        // public int UserId { get; set; }
        public int ChatStarterUserId { get; set; }

        // public int OwnerUserId { get; set; }
        public int AdvertiserOwnerUserId { get; set; }
        public int AdvertisementId { get; set; }
        public string LastMessageContent { get; set; }
        public int UnreadMessagesCount { get; set; }
        public string ChatRoomTitle { get; set; }
        public DateTime? LastMessageDate { get; set; }
    }
}



// namespace Api.DTOs
// {
//     public class ChatRoomDto
//     {
//         public int ChatRoomId { get; set; }
//         public int OtherUserId { get; set; }
//         public string LastMessage { get; set; }
//         public DateTime LastMessageDate { get; set; }
//     }
// }