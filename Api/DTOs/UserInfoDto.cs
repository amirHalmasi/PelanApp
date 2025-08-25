using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class UserInfoDto
    {
        public string Username { get; set; }
        public int UserId { get; set; }
        public string IsJobOwner { get; set; }
        
        public string AgentLinkId { get; set; }
        
        
    }
}