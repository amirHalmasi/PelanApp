using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Api.DTOs
{
    public class houseSellAddAdvertiseDto
    {
        public string advertiseType { get; set; }            
        public string username { get; set; }           
        public string advertiseCode { get; set; } 
        public string buildingName { get; set; }       
        public string floor { get; set; }       
        public string hasElevator { get; set; }       
        public string hasHouseWare { get; set; }       
        public string wareHouseMeter { get; set; }       
        public string houseMeter { get; set; }       
        public string houseType { get; set; }       
        public string orientations { get; set; }       
        public string parkingType { get; set; }  
        public string hasParking { get; set; }     
        public string rooms { get; set; }    
        public string province { get; set; }    
        public string city { get; set; }    
        public string desc { get; set; }    
        public string neighborhood { get; set; }    
        // public string flatStatusType { get; set; }    
        // public int AdvertiseViews { get; set; }    
       
        public DateTime houseEmptyDate { get; set; }   
         
        // sell specific columns
        public string state { get; set; }    
        public string tejariMeter { get; set; }    
        public string price { get; set; }    
        public string houseDocument { get; set; }    
        public string groundMeter { get; set; }    
        public string floors { get; set; }    
        public string allUnits { get; set; }    
    }
}