using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserId))
            {
                return BadRequest("username is taken by aother person.");
            }
            using var hmac = new HMACSHA512();
        
            var user = new AppUser
            {
                UserName = registerDto.UserId,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Mobile)),
                PasswordSalt = hmac.Key,
                UserId = registerDto.UserId,
                Mobile = registerDto.Mobile,
                Phone = registerDto.Phone,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Address = registerDto.Address,
                ProvinceId = registerDto.Province,
                CityId = registerDto.City,
                Shop=registerDto.Shop,
                Gender=registerDto.Gender,
                IsJobOwner=registerDto.IsJobOwner

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if(user == null){
                return Unauthorized("Invalid username");
            }

            using var hmac =new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++){
                if (computedHash[i] != user.PasswordHash[i]){
                    return Unauthorized("Invalid password");
                }
            }
            return user;

        } 

        private async Task<bool> UserExists(string UserId){
            return await _context.Users.AnyAsync(x=>
            x.UserId == UserId);
        }
    }
}