using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class StoreSellAddAdvertiseDto
    {
        public string advertiseType { get; set; }  
        public string username { get; set; }   
        public string advertiseCode { get; set; }   
        public string pasajhName { get; set; }       
        public string floor { get; set; }   
        
        public string hasElevator  { get; set; } 
        public string hasBalconey { get; set; } 
        public string hasCeramic { get; set; } 
        public string hasRestroom { get; set; } 
        public string hasParking { get; set; } 
        public string parkingType { get; set; } 
        public string majmoehName { get; set; } 
        
              
        public string storeMeter { get; set; }       
        public string storeType { get; set; }       
        public string province { get; set; }    
        public string city { get; set; }    
        public string desc { get; set; }    
        public string neighbourhood { get; set; }    

        // sell fields
        public string groundMeter { get; set; }
        public string owneringType { get; set; }
        public string price { get; set; }
        public string storeDocument { get; set; }
        public string storeWidth { get; set; }
    }
}