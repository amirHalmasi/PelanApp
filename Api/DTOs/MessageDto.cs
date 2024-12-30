

using System;


namespace Api.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSentDate { get; set; }
        // added below line by myself
        public int AdvertiserUserId { get; set; }
        public int? AdvertiseCode { get; set; }
        public int ChatRoomId { get; set; }
        public string ChatRoomTitle { get; set; }

    }
}


// namespace Api.DTOs
// {
//     public class MessageDto
//     {
//         public int Id { get; set; }
//         public int AdvertiserUserId { get; set; }
//         public int SenderId { get; set; }
//         public string SenderUsername { get; set; }
//         public int RecipientId { get; set; }
//         public string RecipientUsername { get; set; }
//         public string Content { get; set; }
//         public DateTime? DateRead { get; set; }
//         public DateTime MessageSentDate { get; set; }
//         public int AdvertiseCode { get; set; }
//         public string AdvertiseTitle { get; set; }
//     }
// }





////////////////////
//     before     //
////////////////////


// namespace Api.DTOs
// {
//     public class MessageDto
//     {
//         public int Id { get; set; }
//         public int AdvertiserUserId { get; set; }
//         // public int ChatStarterUserId { get; set; }
//         public int SenderId { get; set; }
//         public string SenderUsername { get; set; }
//         public int RecipientId { get; set; }
//         public string RecipientUsername { get; set; }
//         public string Content { get; set; }
//         public DateTime? DateRead { get; set; }
//         public DateTime MessageSentDate { get; set; }
//         public string AdvertiseCode { get; set; }
//         public string AdvertiseTitle { get; set; }
//     }
// }








///////////////
//   first   //
///////////////

// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace Api.DTOs
// {
//     public class MessageDto
//     {
//         public int Id { get; set; }
//         public int SenderId { get; set; }
//         public string SenderUsername { get; set; }
       
//         public string SenderPhotoUrl { get; set; }
//         public int RecipientId { get; set; }
//         public string RecipientUsername { get; set; }

//          public string RecipientPhotoUrl { get; set; }
        
//         public string Content { get; set; }
//         public DateTime? DateRead { get; set; }
//         public DateTime MessageSent { get; set; }
        

//         public DateTime? RoomDeleteDate { get; set; } 
//         public bool IsAdvertiseDeleted { get; set; } 


//         public string AdvertiseCode { get; set; }
//         public string AdvertiseSenderUserNationalId { get; set; }
//         public string AdvertiseTitle { get; set; }
//     }
// }
