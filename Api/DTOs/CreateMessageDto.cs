using System;

namespace Api.DTOs
{
    public class CreateMessageDto
    {
        public int SenderId { get; set; }
        // public string SenderUsername { get; set; }
        public int RecipientId { get; set; }
        // public string RecipientUsername { get; set; }
        public int AdvertiserUserId { get; set; }
        public string Content { get; set; }
        public int AdvertiseCode { get; set; }
        public string AdvertiseTitle { get; set; }

        public long ChatRoomCode { get; set; }
        public int ChatRoomId { get; set; }

    }
}



// namespace Api.DTOs
// {
//     public class CreateMessageDto
//     {
//         public int SenderId { get; set; }
//         public int RecipientId { get; set; }
//         public int AdvertiserUserId { get; set; }
//         // public int AdvertisementId { get; set; }  // اضافه کردن AdvertisementId برای تطابق با چت‌روم
//         public string Content { get; set; }
//         public int AdvertiseCode { get; set; }
//         public string AdvertiseTitle { get; set; }
//     }
// }



////////////////////
//     before     //
////////////////////

// namespace Api.DTOs
// {
//     public class CreateMessageDto
//     {
//         public int SenderId { get; set; }
//         public int RecipientId { get; set; }
//         public int AdvertiserUserId { get; set; }
//         // public int ChatStarterUserId { get; set; }

//         public string Content { get; set; }
//         public string AdvertiseCode { get; set; }
//         public string AdvertiseTitle { get; set; }
//     }
// }