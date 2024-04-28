// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

using System.Numerics;

namespace Api.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; } 
        public string Mobile { get; set; } 
        public string Email { get; set; } 
        public string Gender { get; set; } 
        public int ProvinceId { get; set; } 
        public int CityId { get; set; } 
        public string ShopName { get; set; } 
        public string  ShopAddress { get; set; } 
        public string  Tels { get; set; } 
        
        public string UserName { get; set; }       
        public string UserType { get; set; }       
        public string Password { get; set; }       
              
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }


    }
}