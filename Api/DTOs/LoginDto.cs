using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username {set;get;}
        [Required]
        public string Password {set;get;}
    }
}