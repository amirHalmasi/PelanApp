using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string BaseUrl { get; set; }
        public string UserNationalId { get; set; }
    }
}