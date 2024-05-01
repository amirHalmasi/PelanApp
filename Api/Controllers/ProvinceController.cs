using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProvinceController : ControllerBase
    {
        private readonly DataContext _context;

        public ProvinceController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        // public ActionResult<List<AppUser>> 
        public async Task<ActionResult<IEnumerable<AppProvince>>> GetProvinces(){
            return await _context.Provinces.ToListAsync();
             
        }
    }
}