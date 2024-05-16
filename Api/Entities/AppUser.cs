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
        // private int Id { get; set; }
        // protected int Id { get; set; }
        public string FirstName { get; set; }       
        public string LastName { get; set; }       
        public string UserName { get; set; }       
        public string UserId { get; set; }       
        public string Mobile { get; set; }       
        public string Phone { get; set; }       
        public string Address { get; set; }       
        public string Gender { get; set; }       
        public string Shop { get; set; }       
        public string Email { get; set; }    
        public string ProvinceId { get; set; }    
        public string CityId { get; set; }    
        public int IsJobOwner { get; set; }   

        // public string UserId { get; set; } 
        public byte[] PasswordHash{ get; set; }
        public byte[] PasswordSalt{ get; set; }
              

    }
}