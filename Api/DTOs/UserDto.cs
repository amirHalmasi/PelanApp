using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public int UserId { get; set; }
        public string IsJobOwner { get; set; }
        public string Token { get; set; }
        public DateTime LoginDate { get; set; }
        // بعدا اضافه شده
        // public int Id { get; set; }
        // public string UserName { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        // public string Mobile { get; set; }
        // public string Email { get; set; }
    }
}