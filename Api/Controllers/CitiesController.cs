using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    
    public class CitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public CitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        // public ActionResult<List<AppUser>> 
        public async Task<ActionResult<IEnumerable<AppCities>>> GetProvinces(int id){
            // return await _context.Cities.ToListAsync();
            //.FindAsync(id);
            return await _context.Cities.Where(cities => cities.Province_id ==id).ToListAsync();
             
        }
        
    }
}