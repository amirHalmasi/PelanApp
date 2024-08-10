using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class houseAdvertiseDto
   {
    public string RentAdvertiseType { get; set; }
    public string RentUsername { get; set; }
    public string RentAdvertiseCode { get; set; }
    public string RentBuildingName { get; set; }
    public string RentFloor { get; set; }
    public string RentHasElevator { get; set; }
    public string RentHasWareHouse { get; set; }
    public int RentWareHouseMeter { get; set; }
    public int RentHouseMeter { get; set; }
    public string RentHouseType { get; set; }
    public string RentOrientation { get; set; }
    public string RentParkingType { get; set; }
    public int RentRooms { get; set; }
    public int RentProvinceId { get; set; }
    public int RentCityId { get; set; }
    public string RentDescription { get; set; }
    public string RentNeighborhood { get; set; }
    public int RentFlatStatusType { get; set; }
    public int RentAdvertiseViews { get; set; }
    public DateTime RentAdvertiseSubmitDate { get; set; }
    public DateTime RentHouseEmptyDate { get; set; }
    public string RentEntryType { get; set; }
    public decimal RentDepositPrice { get; set; }
    public decimal RentRentPrice { get; set; }
    public int RentBranchStatus { get; set; }
    public int RentRentFlatType { get; set; }
    
    public string SellAdvertiseType { get; set; }
    public string SellUsername { get; set; }
    public string SellAdvertiseCode { get; set; }
    public string SellBuildingName { get; set; }
    public string SellFloor { get; set; }
    public string SellHasElevator { get; set; }
    public string SellHasWareHouse { get; set; }
    public int SellWareHouseMeter { get; set; }
    public int SellHouseMeter { get; set; }
    public string SellHouseType { get; set; }
    public string SellOrientation { get; set; }
    public string SellParkingType { get; set; }
    public int SellRooms { get; set; }
    public int SellProvinceId { get; set; }
    public int SellCityId { get; set; }
    public string SellDescription { get; set; }
    public string SellNeighborhood { get; set; }
    public int SellAdvertiseViews { get; set; }
    public DateTime SellAdvertiseSubmitDate { get; set; }
    public int SellState { get; set; }
    public int SellTejariMeter { get; set; }
    public decimal SellPrice { get; set; }
    public string SellHouseDocument { get; set; }
    public int SellGroundMeter { get; set; }
    public int SellFloors { get; set; }
    public int SellAllUnits { get; set; }
}
}