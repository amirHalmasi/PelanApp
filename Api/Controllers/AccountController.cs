// using System;
// using System.Collections.Generic;
// using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context,ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
        // public async Task<ActionResult<AppUser>> Register(UserDto user){

            if(await UserExist(registerDto.userid)){

                return BadRequest("Username is taken by another person.");
                //we get access to badrequest(400) simply because we are using an action result. and when we use an action result we able to return different http status codes as a response.

            }
            using var hmac =new HMACSHA512();
            var user =new AppUser
            {
                // UserName=username,
                
                UserName=registerDto.userid,
                FirstName=registerDto.firstname,
                LastName=registerDto.lastname,
                UserId=registerDto.userid,
                Mobile=registerDto.mobile,
                Email=registerDto.email,
                Gender=registerDto.gender,
                ProvinceId=registerDto.provinceid,
                CityId=registerDto.cityid,
                ShopName=registerDto.shopname,
                ShopAddress=registerDto.shopaddress,
                Tels =registerDto.tels,
                Password = registerDto.mobile,
                UserType = registerDto.usertype,
                // PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.mobile)),
                PasswordSalt=hmac.Key,
               
                // UserId=userId
                
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //what is async and await do?

            // return user;
            return new UserDto{
                Username=user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            var user = await  _context.Users.SingleOrDefaultAsync(dbData=>dbData.UserName==loginDto.Username);
            // what is FirstOrDefaultAsync()?
            // what is SingleOrDefaultAsync()?
            // what is different between exception and error?

            if (user==null)
            {
                return Unauthorized("Invalid username.");
            }

            using var hmac=new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            //becuse computedHash is a byte Array so we need to loop throw each byte to that they are same or not if one of the the bytes isn't same we will return Invalid password like bellow:
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i]!=user.PasswordHash[i])
                {
                    return Unauthorized ("Invalid password.");                   
                }
            }
            // return user;
           return new UserDto{
                Username=user.UserName,
                Usertype=user.UserType,
                
                Token = _tokenService.CreateToken(user),
                Expires = DateTime.Now.AddDays(7),
            };
            
        }
        private async Task<bool> UserExist(string username){
            return await _context.Users.AnyAsync(dbData=>dbData.UserName.ToLower()==username.ToLower());
            //what is Any() do in asp.net?

        }
    }
}