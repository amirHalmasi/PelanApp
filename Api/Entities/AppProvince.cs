using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class AppProvince
    {
        public int Id { get; set; }
        public string ProvinceName { get; set; }
        public string ProvinceName_en { get; set; }
        public string Center { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
       
        
    }
}