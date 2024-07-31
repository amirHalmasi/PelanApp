using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class HouseRentAdvertise
    {
        // common with sell
        public int Id { get; set; }
        public string AdvertiseType { get; set; }    
        public string Username { get; set; }   
        public string AdvertiseCode { get; set; }   
        public string BuildingName { get; set; }       
        public string Floor { get; set; }       
        public string HasElevator { get; set; }       
        public string HasWareHouse { get; set; }       
        public string WareHouseMeter { get; set; }       
        public string HouseMeter { get; set; }       
        public string HouseType { get; set; }       
        public string Orientation { get; set; }       
        public string ParkingType { get; set; }       
        public string Rooms { get; set; }    
        public string ProvinceId { get; set; }    
        public string CityId { get; set; }    
        public string Description { get; set; }    
        public string Neighborhood { get; set; }    
        public string FlatStatusType { get; set; }    
        public int AdvertiseViews { get; set; }    
        public DateTime AdvertiseSubmitDate { get; set; }    
        public DateTime HouseEmptyDate { get; set; }    
        // rent specific columns
        public string EntryType { get; set; }    
        public string DepositPrice { get; set; }    
        public string RentPrice { get; set; }    
        public string BranchStatus { get; set; }    
        public string RentFlatType { get; set; }  

    }
}