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
        public string UserName { get; set; }       
        public string UserId { get; set; } 

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }


    }
}