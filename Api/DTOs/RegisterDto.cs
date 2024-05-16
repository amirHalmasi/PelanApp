using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers;

namespace Api.DTOs
{
    public class RegisterDto
    {
        
        [Required]
        public string UserId { get; set; }       
        [Required]     
        public string Mobile { get; set; }
        
        public string FirstName { get; set; }       
        public string LastName { get; set; }       
       
               
        public string Phone { get; set; }       
        public string Address { get; set; }       
        public string Gender { get; set; }       
        public string Shop { get; set; }       
        public string Email { get; set; }    
        public string Province { get; set; }    
        public string City { get; set; }   
        public int IsJobOwner { get; set; }   


    }
}