using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class AdvertiseSuccessDto
    {
        public string AdvertiseType { get; set; }  
        public DateTime  AdvertiseSubmitDate { get; set; }        
        public string Username { get; set; }   
        public string AdvertiseCode { get; set; }   
    }
}