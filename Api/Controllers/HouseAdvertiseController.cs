using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
   
    public class HouseAdvertiseController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly ITokenBlacklistService _tokenBlacklistService;

        public HouseAdvertiseController(DataContext context, ITokenService tokenService, ITokenBlacklistService tokenBlacklistService)
        {
            _context = context;
            _tokenService = tokenService;
            _tokenBlacklistService = tokenBlacklistService;
        }

        [Authorize]
        [HttpPost("rent")]
        public async Task<ActionResult<AdvertiseSuccessDto>> AddRentHouseAdvertise(houseRentAddAdvertiseDto RentHouseDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        
            try
            {
                var rentHouseData = new HouseRentAdvertise
                {
            
                    AdvertiseType = RentHouseDto.advertiseType,   
                    Username = RentHouseDto.username,
                    AdvertiseCode = RentHouseDto.advertiseCode,   
                    BuildingName = RentHouseDto.buildingName,       
                    Floor = RentHouseDto.floor,       
                    HasElevator = RentHouseDto.hasElevator.ToString(),       
                    HasWareHouse = RentHouseDto.hasHouseWare.ToString(),       
                    WareHouseMeter = RentHouseDto.wareHouseMeter,       
                    HouseMeter = RentHouseDto.houseMeter,       
                    HouseType = RentHouseDto.houseType,       
                    Orientation = RentHouseDto.orientations,       
                    ParkingType = RentHouseDto.parkingType,
                    HasParking = RentHouseDto.hasParking,
                    Rooms = RentHouseDto.rooms,    
                    ProvinceId = RentHouseDto.province,    
                    CityId = RentHouseDto.city,    
                    Description = RentHouseDto.desc,    
                    Neighborhood = RentHouseDto.neighborhood,    
                    FlatStatusType = RentHouseDto.flatStatusType,    
                    AdvertiseViews = 0, 
                    // submitDate   
                    AdvertiseSubmitDate = DateTime.Now, 
                    // HouseEmptyDate = RentHouseDto.HouseEmptyDate,    
                    HouseEmptyDate = DateTime.Now,    
                    EntryType = RentHouseDto.entryType,    
                    DepositPrice = RentHouseDto.depositPrice,    
                    RentPrice = RentHouseDto.rentPrice,    
                    BranchStatus = RentHouseDto.controlType,    
                    RentFlatType = RentHouseDto.rentFlatType
                };

                
                _context.HouseRentAdvertise.Add(rentHouseData);
                await _context.SaveChangesAsync();
                return new AdvertiseSuccessDto
                {
                    AdvertiseType = rentHouseData.AdvertiseType, 
                    AdvertiseSubmitDate = rentHouseData.AdvertiseSubmitDate,       
                    Username = rentHouseData.Username,  
                    AdvertiseCode = rentHouseData.AdvertiseCode,
                
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while processing your request." });
            }

        }
        [Authorize]
        [HttpPost("sell")]
        public async Task<ActionResult<AdvertiseSuccessDto>> AddSellHouseAdvertise(houseSellAddAdvertiseDto sellHouseDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        
            try
            {
                var sellHouseData = new HouseSellAdvertise
                {
            
                    AdvertiseType = sellHouseDto.advertiseType,   
                    Username = sellHouseDto.username,
                    AdvertiseCode = sellHouseDto.advertiseCode,   
                    BuildingName = sellHouseDto.buildingName,       
                    Floor = sellHouseDto.floor,       
                    HasElevator = sellHouseDto.hasElevator.ToString(),       
                    HasWareHouse = sellHouseDto.hasHouseWare.ToString(),       
                    WareHouseMeter = sellHouseDto.wareHouseMeter,       
                    HouseMeter = sellHouseDto.houseMeter,       
                    HouseType = sellHouseDto.houseType,       
                    Orientation = sellHouseDto.orientations,       
                    ParkingType = sellHouseDto.parkingType,    

                    HasParking = sellHouseDto.hasParking,

                    Rooms = sellHouseDto.rooms,    
                    ProvinceId = sellHouseDto.province,    
                    CityId = sellHouseDto.city,    
                    Description = sellHouseDto.desc,    
                    Neighborhood = sellHouseDto.neighborhood,    
                    // FlatStatusType = sellHouseDto.flatStatusType,    
                    AdvertiseViews = 0, 
                    // submitDate   
                    AdvertiseSubmitDate = DateTime.Now, 
                    // HouseEmptyDate = sellHouseDto.HouseEmptyDate,                        
                    State = sellHouseDto.state,
                    TejariMeter = sellHouseDto.tejariMeter,
                    Price = sellHouseDto.price,
                    HouseDocument = sellHouseDto.houseDocument,
                    GroundMeter = sellHouseDto.groundMeter,
                    Floors = sellHouseDto.floors,
                    AllUnits = sellHouseDto.allUnits, 
                    
                   
                };

                
                _context.HouseSellAdvertise.Add(sellHouseData);
                await _context.SaveChangesAsync();
                return new AdvertiseSuccessDto
                {
                    AdvertiseType = sellHouseData.AdvertiseType, 
                    AdvertiseSubmitDate = sellHouseData.AdvertiseSubmitDate,       
                    Username = sellHouseData.Username,  
                    AdvertiseCode = sellHouseData.AdvertiseCode,
                
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while processing your request." });
            }

        }
        

        private List<string> GetFilesFromDirectory(string baseFolderName, string subFolderName)
        {
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), baseFolderName, subFolderName);
            if (Directory.Exists(folderPath))
            {
                return Directory.GetFiles(folderPath)
                                .Select(file => Path.Combine(baseFolderName, subFolderName, Path.GetFileName(file)))
                                .ToList();
            }
            return new List<string>();
        }

        [HttpGet("{city_id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllAdvertises(string city_id)
        {
            try
            {
                var rentAdvertises = await _context.HouseRentAdvertise
                    .Where(h => h.CityId == city_id)
                    .ToListAsync();

                var sellAdvertises = await _context.HouseSellAdvertise
                    .Where(h => h.CityId == city_id)
                    .ToListAsync();

                var allAdvertises = rentAdvertises.Cast<object>()
                    .Concat(sellAdvertises.Cast<object>())
                    .ToList();

                var advertiseWithFiles = new List<object>();

                foreach (var advertise in allAdvertises)
                {
                    string username = advertise is HouseRentAdvertise rentAdvertise ? rentAdvertise.Username : (advertise as HouseSellAdvertise).Username;
                    string advertiseCode = advertise is HouseRentAdvertise rentAd ? rentAd.AdvertiseCode : (advertise as HouseSellAdvertise).AdvertiseCode;

                    var lowQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(username, advertiseCode, "lowQuality"));
                    var highQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(username, advertiseCode, "highQuality"));

                    if (highQualityFiles.Any() && lowQualityFiles.Any())
                    {
                        var filePairs = highQualityFiles.Select((highQuality, index) => new
                        {
                            HighQuality = highQuality,
                            LowQuality = lowQualityFiles.ElementAtOrDefault(index)
                        }).ToList();

                        advertiseWithFiles.Add(new
                        {
                            Advertise = advertise,
                            Files = filePairs,
                            TodayDate = DateTime.Now
                        });
                    }
                    else
                    {
                        var lowQualityPlaceHolderFiles = GetFilesFromDirectory("Resources/Images", "placeholder/lowQuality");
                        var placeholderFiles = GetFilesFromDirectory("Resources/Images", "placeholder/highQuality");

                        if (placeholderFiles.Any() && lowQualityPlaceHolderFiles.Any())
                        {
                            var filePairs = placeholderFiles.Select((highQuality, index) => new
                            {
                                HighQuality = highQuality,
                                LowQuality = lowQualityPlaceHolderFiles.ElementAtOrDefault(index)
                            }).ToList();

                            advertiseWithFiles.Add(new
                            {
                                Advertise = advertise,
                                Files = filePairs,
                                TodayDate = DateTime.Now
                            });
                        }
                    }
                }

                return Ok(advertiseWithFiles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while retrieving the advertisements." });
            }
        }

        // [AllowAnonymous]
        // [HttpGet]
        // // public ActionResult<List<AppUser>> 
        // public async Task<ActionResult<IEnumerable<HouseRentAdvertise>>> GetAdvertises(){
        //     return await _context.HouseRentAdvertise.ToListAsync();
             
        // }
    }
}