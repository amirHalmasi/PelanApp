using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class storeCommonAdvertise
    {
        // common with sell
        public int Id { get; set; }
        public string AdvertiseType { get; set; }    
        public string Username { get; set; }   
        public string AdvertiseCode { get; set; }   
        public string PasajhName { get; set; }       
        public string MajmoehName { get; set; }       
        public string Floor { get; set; }       
        public string HasElevator { get; set; }       
        public string HasBalconey { get; set; }       
        public string HasCeramic { get; set; }       
        public string HasRestroom { get; set; }       
        public string HasParking { get; set; }       
        public string StoreMeter { get; set; }       
        public string ParkingType { get; set; }       
        public string StoreType { get; set; }       
        public string ProvinceId { get; set; }    
        public string CityId { get; set; }    
        public string Description { get; set; }    
        public string Neighborhood { get; set; }    
        public int AdvertiseViews { get; set; }    
        public DateTime AdvertiseSubmitDate { get; set; }    
        public DateTime StoreEmptyDate { get; set; }    
        
    }
}