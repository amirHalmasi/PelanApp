using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class AppHomeAdvertise
    {
        public int Id { get; set; }        
        public string Username { get; set; }
        public string AdvertiseCode { get; set; }
        public int ProvinceId { get; set; } 
        public int CityId { get; set; } 
        public string Neighborhood { get; set; }
        public string HouseDirection { get; set; } 
        public string AdvertiseType { get; set; } 
        public string Description { get; set; } 
        public string Floor { get; set; } 
        public string Meterage { get; set; } 
        public string RentPrice { get; set; } 
        public string Mortgage { get; set; } 
        public string RoomCount { get; set; } 
        public string SuitableFor { get; set; } 
        public string IsItApartment { get; set; } 
        public string ComplexName { get; set; } 
        public string Address { get; set; } 
        public string HasParking { get; set; } 
        public string IsRepair { get; set; } 
        public string BuiltIn { get; set; } 

    }
}