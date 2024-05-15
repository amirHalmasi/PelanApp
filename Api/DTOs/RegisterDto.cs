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
        public string Username { get; set; }       
        [Required]
        public string Password{ get; set; }
    }
}