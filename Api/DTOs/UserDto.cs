using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string IsJobOwner { get; set; }
        public string Token { get; set; }
        public DateTime LoginDate { get; set; }
    }
}