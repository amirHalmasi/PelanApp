// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

using System.Numerics;
using System.Collections.Generic;
using Api.Entities;
using System;
using System.Collections.Generic;

namespace Api.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }       
        public string LastName { get; set; }       
        public string UserName { get; set; }       
        public string UserNationalId { get; set; }       
        public string Mobile { get; set; }       
        public string Phone { get; set; }       
        public string Address { get; set; }       
        public string Gender { get; set; }       
        public string Shop { get; set; }       
        public string Email { get; set; }    
        public string ProvinceId { get; set; }    
        public string CityId { get; set; }    
        public int IsJobOwner { get; set; }   

        public byte[] PasswordHash{ get; set; }
        public byte[] PasswordSalt{ get; set; }
        public DateTime? Created { get; set; } = DateTime.Now;

         // 🔹 توکن عمومی امن برای لینک اختصاصی (در URL استفاده می‌شود)
        public string AgentLinkId { get; set; }  // nullable: فقط برای صاحبین املاک لازم است


        // ارتباط با پیام‌ها
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }

        // ارتباط با چت‌روم‌ها
        public ICollection<ChatRoom> ChatRooms { get; set; }
    }
}



////////////////////
//     before     //
////////////////////



// namespace Api.Entities
// {
//     public class AppUser
//     {
//         public int Id { get; set; }
//         public string FirstName { get; set; }       
//         public string LastName { get; set; }       
//         public string UserName { get; set; }       
//         public string UserNationalId { get; set; }       
//         public string Mobile { get; set; }       
//         public string Phone { get; set; }       
//         public string Address { get; set; }       
//         public string Gender { get; set; }       
//         public string Shop { get; set; }       
//         public string Email { get; set; }    
//         public string ProvinceId { get; set; }    
//         public string CityId { get; set; }    
//         public int IsJobOwner { get; set; }   

//         // public string UserId { get; set; } 
//         public byte[] PasswordHash{ get; set; }
//         public byte[] PasswordSalt{ get; set; }
//         public DateTime? Created { get; set; } = DateTime.Now;

//         // ارتباط با پیام‌ها
//         public ICollection<Message> MessagesSent { get; set; }
//         public ICollection<Message> MessagesReceived { get; set; }      

//     }
// }