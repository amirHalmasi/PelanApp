using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class StoreSellAdvertise
    {
        public int Id { get; set; }
        public string AdvertiseCode { get; set; }    
        public string Username { get; set; }  
        
        public string GroundMeter { get; set; }
        public string OwneringType { get; set; }
        public string Price { get; set; }
        public string StoreDocument { get; set; }
        public string StoreWidth { get; set; }


    }
}