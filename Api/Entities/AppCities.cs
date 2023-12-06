using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class AppCities
    {
        public int Id { get; set; }
        public int ProvinceId { get; set; }
        
        public string Cities { get; set; }
        public string Cities_en { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        

    }
}