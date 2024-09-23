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
   
    public class StoreAdvertiseController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly ITokenBlacklistService _tokenBlacklistService;

        public StoreAdvertiseController(DataContext context, ITokenService tokenService, ITokenBlacklistService tokenBlacklistService)
        {
            _context = context;
            _tokenService = tokenService;
            _tokenBlacklistService = tokenBlacklistService;
        }
        [Authorize]
        [HttpPost("rent")]
        public async Task<ActionResult<AdvertiseSuccessDto>> AddRentStoreAdvertise(StoreRentAddAdvertiseDto RentStoreDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        
            try
            {
                var SroreCommonData = new storeCommonAdvertise
                {
                    AdvertiseType = RentStoreDto.advertiseType,
                    Username = RentStoreDto.username, 
                    AdvertiseCode = RentStoreDto.advertiseCode, 
                    PasajhName = RentStoreDto.pasajhName, 
                    Floor = RentStoreDto.floor, 
                    HasElevator = RentStoreDto.hasElevator,
                    HasBalconey = RentStoreDto.hasBalconey, 
                    HasCeramic = RentStoreDto.hasCeramic,
                    HasRestroom = RentStoreDto.hasRestroom,
                    HasParking = RentStoreDto.hasParking  ,
                    ParkingType = RentStoreDto.parkingType  ,
                    StoreMeter = RentStoreDto.storeMeter ,
                    MajmoehName = RentStoreDto.majmoehName ,
                    StoreType = RentStoreDto.storeType,
                    ProvinceId = RentStoreDto.province,
                    CityId = RentStoreDto.city,
                    Description = RentStoreDto.desc,
                    Neighborhood = RentStoreDto.neighbourhood,
                    AdvertiseViews = 0,
                    AdvertiseSubmitDate = DateTime.Now  ,
                    StoreEmptyDate = DateTime.Now  ,
                };

                var SroreRentData = new StoreRentAdvertise
                {
                    AdvertiseCode = RentStoreDto.advertiseCode,
                    Username = RentStoreDto.username,
                    DepositPrice = RentStoreDto.depositPrice,
                    RentPrice = RentStoreDto.rentPrice,
                    BranchesControlStatus = RentStoreDto.controlType,
                    StoreRentType = RentStoreDto.rentStoreType
                };
                
                _context.StoreCommonAdvertises.Add(SroreCommonData);
                // await _context.SaveChangesAsync();
                _context.StoreRentAdvertises.Add(SroreRentData);
                await _context.SaveChangesAsync();
                return new AdvertiseSuccessDto
                {
                    AdvertiseType = SroreCommonData.AdvertiseType, 
                    AdvertiseSubmitDate = SroreCommonData.AdvertiseSubmitDate,       
                    Username = SroreCommonData.Username,  
                    AdvertiseCode = SroreCommonData.AdvertiseCode,
                
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while processing your request." });
            }

        }
        [Authorize]
        [HttpPost("sell")]
        public async Task<ActionResult<AdvertiseSuccessDto>> AddRentStoreAdvertise(StoreSellAddAdvertiseDto SellStoreDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        
            try
            {
                var SroreCommonData = new storeCommonAdvertise
                {
                    AdvertiseType = SellStoreDto.advertiseType,
                    Username = SellStoreDto.username, 
                    AdvertiseCode = SellStoreDto.advertiseCode, 
                    PasajhName = SellStoreDto.pasajhName, 
                    Floor = SellStoreDto.floor, 
                    HasElevator = SellStoreDto.hasElevator,
                    HasBalconey = SellStoreDto.hasBalconey, 
                    HasCeramic = SellStoreDto.hasCeramic,
                    HasRestroom = SellStoreDto.hasRestroom,
                    HasParking = SellStoreDto.hasParking  ,
                    ParkingType = SellStoreDto.parkingType  ,
                    StoreMeter = SellStoreDto.storeMeter ,
                    MajmoehName = SellStoreDto.majmoehName ,
                    StoreType = SellStoreDto.storeType,
                    ProvinceId = SellStoreDto.province,
                    CityId = SellStoreDto.city,
                    Description = SellStoreDto.desc,
                    Neighborhood = SellStoreDto.neighbourhood,
                    AdvertiseViews = 0,
                    AdvertiseSubmitDate = DateTime.Now  ,
                    StoreEmptyDate = DateTime.Now  ,
                };

                var SroreSellData = new StoreSellAdvertise
                {
                    AdvertiseCode = SellStoreDto.advertiseCode,
                    Username = SellStoreDto.username,
                    GroundMeter = SellStoreDto.groundMeter,
                    OwneringType = SellStoreDto.owneringType,
                    Price = SellStoreDto.price,
                    StoreDocument = SellStoreDto.storeDocument,
                    StoreWidth = SellStoreDto.storeWidth
                };
                
                _context.StoreCommonAdvertises.Add(SroreCommonData);
                // await _context.SaveChangesAsync();
                _context.StoreSellAdvertises.Add(SroreSellData);
                await _context.SaveChangesAsync();
                return new AdvertiseSuccessDto
                {
                    AdvertiseType = SroreCommonData.AdvertiseType, 
                    AdvertiseSubmitDate = SroreCommonData.AdvertiseSubmitDate,       
                    Username = SroreCommonData.Username,  
                    AdvertiseCode = SroreCommonData.AdvertiseCode,
                
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while processing your request." });
            }

        }


       [HttpGet("{city_id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllAdvertises(string city_id)
        {
            try
            {
                // Join StoreRentAdvertises with StoreCommonAdvertises
                var rentAdvertises = await (from rent in _context.StoreRentAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { rent.Username, rent.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.CityId == city_id
                                            select new
                                            {
                                                RentData = rent,   
                                                CommonData = common
                                            }).ToListAsync();

                // Join HouseSellAdvertise with StoreCommonAdvertise
                var sellAdvertises = await (from sell in _context.StoreSellAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { sell.Username, sell.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.CityId == city_id
                                            select new
                                            {
                                                SellData = sell,   
                                                CommonData = common
                                            }).ToListAsync();

                // After retrieving the data, iterate over the results and get the files
                var rentResultWithFiles = rentAdvertises.Select(rent => new
                {
                    RentData = rent.RentData,
                    CommonData = rent.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(rent.CommonData.Username, rent.CommonData.AdvertiseCode)
                }).ToList();
                var SellResultWithFiles = sellAdvertises.Select(sell => new
                {
                    SellData = sell.SellData,
                    CommonData = sell.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(sell.CommonData.Username, sell.CommonData.AdvertiseCode)
                }).ToList();

                 var allAdvertises = rentResultWithFiles.Cast<object>()
                    .Concat(SellResultWithFiles.Cast<object>())
                    .ToList();

                // Return the results
                return Ok(allAdvertises);
            }
            catch (Exception ex)
            {
                // Log the exception message and stack trace for debugging purposes
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine(ex.StackTrace);

                return StatusCode(500, new { error = "An error occurred while retrieving the advertisements." });
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
        private List<object> GetAdvertiseFiles(string username, string advertiseCode)
        {

            var lowQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(username, advertiseCode, "lowQuality"));
            var highQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(username, advertiseCode, "highQuality"));

            var filesList = new List<object>();

            if (highQualityFiles.Any() && lowQualityFiles.Any())
            {
                filesList = highQualityFiles.Select((highQuality, index) =>
                new {
                        highQuality = highQuality,
                        lowQuality = lowQualityFiles.ElementAtOrDefault(index),
                    }
                ).ToList<object>();
            }
            else
            {
                var lowQualityPlaceHolderFiles = GetFilesFromDirectory("Resources/Images", "placeholder/lowQuality");
                var placeholderFiles = GetFilesFromDirectory("Resources/Images", "placeholder/highQuality");

                if (placeholderFiles.Any() && lowQualityPlaceHolderFiles.Any())
                {
                    filesList = placeholderFiles.Select((highQuality, index) => new 
                    {
                        lowQuality = lowQualityPlaceHolderFiles.ElementAtOrDefault(index),
                        highQuality = highQuality
                    }).ToList<object>();
                }
            }
            return filesList;
           
        }

        // private List<string> GetAdvertiseFiles(string username, string advertiseCode)
        // {
        //     var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
        //     var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        //     List<string> files = new List<string>();

        //     if (Directory.Exists(pathToRead))
        //     {
        //         files = Directory.GetFiles(pathToRead)
        //             .Select(file => Path.Combine(folderName, Path.GetFileName(file)))
        //             .ToList();

        //         if (!files.Any())
        //         {
        //             files = GetPlaceholderFiles();
        //         }
        //     }
        //     else
        //     {
        //         files = GetPlaceholderFiles();
        //     }

        //     return files;
        // }

        // private List<string> GetPlaceholderFiles()
        // {
        //     var placeholderFolderName = Path.Combine("Resources", "Images", "placeholder");
        //     var placeholderPathToRead = Path.Combine(Directory.GetCurrentDirectory(), placeholderFolderName);

        //     if (Directory.Exists(placeholderPathToRead))
        //     {
        //         return Directory.GetFiles(placeholderPathToRead)
        //             .Select(file => Path.Combine(placeholderFolderName, Path.GetFileName(file)))
        //             .ToList();
        //     }

        //     return new List<string>();
        // }

        




       
    }
}