using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTOs;

namespace Api.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSentDate { get; set; }
        public string AdvertiseCode { get; set; }
        public string AdvertiseTitle { get; set; }
        
        // public int Id { get; set; }
        // // private int Id { get; set; }
        // // protected int Id { get; set; }
        // public string FirstName { get; set; }       
        // public string LastName { get; set; }       
        // public string UserName { get; set; }       
        // public string UserNationalId { get; set; }       
        // public string Mobile { get; set; }       
        // public string Phone { get; set; }       
        // public string Address { get; set; }       
        // public string Gender { get; set; }       
        // public string Shop { get; set; }       
        // public string Email { get; set; }    
        // public string ProvinceId { get; set; }    
        // public string CityId { get; set; }    
        // public int IsJobOwner { get; set; }   

        // // public string UserId { get; set; } 
        // public DateTime? Created { get; set; } 
        // public ICollection<PhotoDto> Photos { get; set; }
    }
}