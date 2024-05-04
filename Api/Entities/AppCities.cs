using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class AppCities
    {
        
       public int Id { get; set; }
       public int Province_id { get; set; }
       public string City_name { get; set; }
       public string City_name_en { get; set; }     
       public string Latitude { get; set; }
       public string Longitude { get; set; }
       
    }
}