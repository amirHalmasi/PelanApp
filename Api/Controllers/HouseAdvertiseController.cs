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
        
            // try
            // {
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
            // }
            // catch (Exception ex)
            // {
            //     return StatusCode(500, new { error = "An error occurred while processing your request." });
            // }

        }
    }
}