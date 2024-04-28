using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string firstname { get; set; }
        [Required]
        public string lastname { get; set; }
        [Required]
        public string userid { get; set; } 
        [Required]
        public string mobile { get; set; } 
        public string email { get; set; } 
        
        public string gender { get; set; } 
        public int provinceid { get; set; } 
        public int cityid { get; set; } 
        public string shopname { get; set; } 
        public string  shopaddress { get; set; } 
        public string  tels { get; set; } 
        public int  rate { get; set; } 
        public string usertype { get; set; } 
        
    }
}