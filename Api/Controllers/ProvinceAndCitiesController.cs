using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class ProvinceAndCitiesController:BaseApiController
    {
         private readonly DataContext _context;

        public ProvinceAndCitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("provinces")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppProvince>>> GetProvinces()
        {
            var provinces = await _context.Provinces.ToListAsync();

            return provinces;
        }

        [HttpGet("cities")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppCities>>> GetCities()
        {
            var cities = await _context.Cities.ToListAsync();
            //there some row with null column data so to prent any error happen :
        //      var cities = await _context.Cities
        // .Select(city => new AppCities
        // {
        //     Id = city.Id,
        //     ProvinceId = city.ProvinceId,
        //     Cities = city.Cities ?? "", // Handle NULL value by providing a default value
        //     Cities_en = city.Cities_en ?? "", // Handle NULL value by providing a default value
        //     Latitude = city.Latitude,
        //     Longitude = city.Longitude
        //     // Add other properties as needed
        // })
        // .ToListAsync(); 

            return cities;
        }

        [HttpGet("{province_id}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppCities>>> GetCity(int province_id)
        {
            var city = await _context.Cities
                .Where(dbTable => dbTable.ProvinceId == province_id)
                .ToListAsync();

            return city;
        }
        
        

    }
}