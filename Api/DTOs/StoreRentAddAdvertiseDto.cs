using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class StoreRentAddAdvertiseDto
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
        public string balconyeMeter { get; set; }  

        // public int AdvertiseViews { get; set; }    
        // public string AdvertiseSubmitDate { get; set; }    
        // public DateTime houseEmptyDate { get; set; }    
        // rent specific columns
        public string depositPrice { get; set; }    
        public string rentPrice { get; set; }    
        public string controlType { get; set; }    
        public string rentStoreType { get; set; }  

    }
}