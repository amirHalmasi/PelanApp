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
        // [RegularExpression] only letters
        public string Username{set;get;}
        [Required]
        public string Password{set;get;}
        [Required]
        // [RegularExpression] only numbers allowed
        public string Userid{get;set;}
    }
}