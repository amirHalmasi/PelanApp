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

        [HttpPatch("sell/{advertiseCode}")]
        public async Task<ActionResult<AdvertiseSuccessDto>> UpdateSellHouseAdvertise(string advertiseCode, houseSellAddAdvertiseDto sellHouseDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }

            try
            {
                // Find the existing advertise by AdvertiseCode
                var existingAd = await _context.HouseSellAdvertise
                    .FirstOrDefaultAsync(a => a.AdvertiseCode == advertiseCode);

                if (existingAd == null)
                {
                    return NotFound(new { message = "Advertise not found" });
                }

                // Update the properties
                existingAd.AdvertiseType = sellHouseDto.advertiseType;   
                // existingAd.Username = sellHouseDto.username;
                existingAd.BuildingName = sellHouseDto.buildingName;       
                existingAd.Floor = sellHouseDto.floor;       
                existingAd.HasElevator = sellHouseDto.hasElevator.ToString();       
                existingAd.HasWareHouse = sellHouseDto.hasHouseWare.ToString();       
                existingAd.WareHouseMeter = sellHouseDto.wareHouseMeter;       
                existingAd.HouseMeter = sellHouseDto.houseMeter;       
                existingAd.HouseType = sellHouseDto.houseType;       
                existingAd.Orientation = sellHouseDto.orientations;       
                existingAd.ParkingType = sellHouseDto.parkingType;    
                existingAd.HasParking = sellHouseDto.hasParking;
                existingAd.Rooms = sellHouseDto.rooms;    
                existingAd.ProvinceId = sellHouseDto.province;    
                existingAd.CityId = sellHouseDto.city;    
                existingAd.Description = sellHouseDto.desc;    
                existingAd.Neighborhood = sellHouseDto.neighborhood;
                existingAd.State = sellHouseDto.state;
                existingAd.TejariMeter = sellHouseDto.tejariMeter;
                existingAd.Price = sellHouseDto.price;
                existingAd.HouseDocument = sellHouseDto.houseDocument;
                existingAd.GroundMeter = sellHouseDto.groundMeter;
                existingAd.Floors = sellHouseDto.floors;
                existingAd.AllUnits = sellHouseDto.allUnits; 
                // existingAd.AdvertiseSubmitDate = DateTime.Now;  // Update the submit date

                // Save the updated advertise back to the database
                await _context.SaveChangesAsync();

                return new AdvertiseSuccessDto
                {
                    AdvertiseType = existingAd.AdvertiseType, 
                    AdvertiseSubmitDate = existingAd.AdvertiseSubmitDate,       
                    Username = existingAd.Username,  
                    AdvertiseCode = existingAd.AdvertiseCode,
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while updating the advertisement." });
            }
        }


        [HttpPatch("rent/{advertiseCode}")]
        public async Task<ActionResult<AdvertiseSuccessDto>> UpdateSellHouseAdvertise(string advertiseCode, houseRentAddAdvertiseDto RentHouseDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }

            try
            {
                // Find the existing advertise by AdvertiseCode
                var existingAd = await _context.HouseRentAdvertise
                    .FirstOrDefaultAsync(a => a.AdvertiseCode == advertiseCode);

                if (existingAd == null)
                {
                    return NotFound(new { message = "Advertise not found" });
                }

                // Update the properties
                
            
                    existingAd.AdvertiseType = RentHouseDto.advertiseType;  
                    // existingAd.Username = RentHouseDto.username;                      
                    existingAd.BuildingName = RentHouseDto.buildingName;      
                    existingAd.Floor = RentHouseDto.floor;      
                    existingAd.HasElevator = RentHouseDto.hasElevator.ToString();      
                    existingAd.HasWareHouse = RentHouseDto.hasHouseWare.ToString();      
                    existingAd.WareHouseMeter = RentHouseDto.wareHouseMeter;      
                    existingAd.HouseMeter = RentHouseDto.houseMeter;      
                    existingAd.HouseType = RentHouseDto.houseType;      
                    existingAd.Orientation = RentHouseDto.orientations;      
                    existingAd.ParkingType = RentHouseDto.parkingType;
                    existingAd.HasParking = RentHouseDto.hasParking;
                    existingAd.Rooms = RentHouseDto.rooms;   
                    existingAd.ProvinceId = RentHouseDto.province;   
                    existingAd.CityId = RentHouseDto.city;   
                    existingAd.Description = RentHouseDto.desc;   
                    existingAd.Neighborhood = RentHouseDto.neighborhood;   
                    existingAd.FlatStatusType = RentHouseDto.flatStatusType;   
                    existingAd.HouseEmptyDate = DateTime.Now;   
                    existingAd.EntryType = RentHouseDto.entryType;   
                    existingAd.DepositPrice = RentHouseDto.depositPrice;   
                    existingAd.RentPrice = RentHouseDto.rentPrice;   
                    existingAd.BranchStatus = RentHouseDto.controlType;   
                    existingAd.RentFlatType = RentHouseDto.rentFlatType;
                // existingAd.AdvertiseSubmitDate = DateTime.Now;  // Update the submit date

                // Save the updated advertise back to the database
                await _context.SaveChangesAsync();

                return new AdvertiseSuccessDto
                {
                    AdvertiseType = existingAd.AdvertiseType, 
                    AdvertiseSubmitDate = existingAd.AdvertiseSubmitDate,       
                    Username = existingAd.Username,  
                    AdvertiseCode = existingAd.AdvertiseCode,
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while updating the advertisement." });
            }
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
                    AdvertiserUserId = RentHouseDto.advertiserUserId,
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
                    AdvertiserUserId = rentHouseData.AdvertiserUserId,
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
                    AdvertiserUserId = sellHouseDto.advertiserUserId,
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
                    AdvertiserUserId = sellHouseData.AdvertiserUserId,
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


        // getSpecific advertise with ADVERTISE cODE
        [HttpGet("houserent/{advertiseCode}")]
        public async Task<ActionResult<IEnumerable<object>>> GetSpecificAdvertises(string AdvertiseCode)
        {
            try
            {
                var rentAdvertises = await _context.HouseRentAdvertise
                    .Where(h => h.AdvertiseCode == AdvertiseCode)
                    .ToListAsync();

                // var sellAdvertises = await _context.HouseSellAdvertise
                //     .Where(h => h.CityId == city_id)
                //     .ToListAsync();

                var Advertises = rentAdvertises.Cast<object>()
                    // .Concat(sellAdvertises.Cast<object>())
                    .ToList();

                var advertiseWithFiles = new List<object>();

                foreach (var advertise in Advertises)
                {
                    string username = (advertise as HouseRentAdvertise).Username;
                    string advertiseCode = (advertise as HouseRentAdvertise).AdvertiseCode;

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