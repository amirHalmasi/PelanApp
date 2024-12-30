using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers;

namespace Api.DTOs
{
    public class houseRentAddAdvertiseDto
    {
       
        public string advertiseType { get; set; }  
        public string username { get; set; }  
        public int advertiserUserId { get; set; }  
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
        public string flatStatusType { get; set; }    
        // public int AdvertiseViews { get; set; }    
        // public string AdvertiseSubmitDate { get; set; }    
        public DateTime houseEmptyDate { get; set; }    
        // rent specific columns
        public string entryType { get; set; }    
        public string depositPrice { get; set; }    
        public string rentPrice { get; set; }    
        public string controlType { get; set; }    
        public string rentFlatType { get; set; }  

    }
}

// "The JSON value could not be converted to System.String. Path: $.city | LineNumber: 0 | BytePositionInLine: 573."