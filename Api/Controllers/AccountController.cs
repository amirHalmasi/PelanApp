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
    public class AccountController : BaseApiController
    {
        
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly ITokenBlacklistService _tokenBlacklistService;

        public AccountController(DataContext context, ITokenService tokenService, ITokenBlacklistService tokenBlacklistService)
        {
            _context = context;
            _tokenService = tokenService;
            _tokenBlacklistService = tokenBlacklistService;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
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
                UserNationalId = registerDto.UserId,
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
           // 🔹 تولید AgentLinkId فقط برای صاحبین ملک
            if (user.IsJobOwner == 1)
            {
                user.AgentLinkId = GenerateAgentLinkId();
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.CreateToken(user);

                // 🔹 ست کردن JWT در HttpOnly Cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(8)
            };
            Response.Cookies.Append("access_token", token, cookieOptions);

            // برگرداندن فقط اطلاعات غیر حساس
            // return new UserDto
            // {                
            //     IsJobOwner = user.IsJobOwner.ToString(),
            //     AgentLinkId = user.AgentLinkId
            // };

            return new UserDto
            {
                Username = user.UserName,
                IsJobOwner = user.IsJobOwner.ToString(),
                // Token = _tokenService.CreateToken(user),
                Token = token,
                AgentLinkId = user.AgentLinkId // اگر میخوای مستقیم برگرده
            };
        }
        private string GenerateAgentLinkId()
        {
            var bytes = RandomNumberGenerator.GetBytes(16); // 128-bit تصادفی
            var jobOwnerTokenId = Convert.ToBase64String(bytes)
                    .Replace("+", "-")
                    .Replace("/", "_")
                    .TrimEnd('='); // طول ~22 کاراکتر، مناسب URL
            return jobOwnerTokenId;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);
                if(user == null) return Unauthorized("Invalid username");

                using var hmac = new HMACSHA512(user.PasswordSalt ?? throw new Exception("PasswordSalt is null"));
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                if (computedHash.Length != user.PasswordHash.Length)
                    return Unauthorized("Invalid password");

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i])
                        return Unauthorized("Invalid password");
                }

                var token = _tokenService.CreateToken(user);

                Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddHours(8)
                });

                return new UserDto
                {
                    IsJobOwner = user.IsJobOwner.ToString(),
                    LoginDate = DateTime.Now,
                    AgentLinkId = user.AgentLinkId
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        

        private async Task<bool> UserExists(string UserId){
            return await _context.Users.AnyAsync(x=>
            x.UserNationalId == UserId);
        }

        
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            // خواندن JWT از کوکی
            var token = Request.Cookies["access_token"];
            if (!string.IsNullOrEmpty(token))
            {
                await _tokenBlacklistService.AddTokenToBlacklistAsync(token);
                Response.Cookies.Delete("access_token");
                return Ok(new { message = "Logged out successfully" });
            }

            return BadRequest(new { message = "Token not found" });
        }
        
        
    

        // [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserInfoDto>> GetCurrentUser()
        {
            // گرفتن userId از Claim داخل توکن
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userIdClaim == null) return Unauthorized();

            var user = await _context.Users.FindAsync(int.Parse(userIdClaim));
            if (user == null) return NotFound();

            return new UserInfoDto
            {
                UserId = user.Id,
                Username = user.UserName,
                IsJobOwner = user.IsJobOwner.ToString(),
                AgentLinkId = user.AgentLinkId
            };
        }
        private string GetUsernameFromToken()
        {
            var token = Request.Cookies["access_token"];
            if (string.IsNullOrEmpty(token)) return null;

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

            return usernameClaim;
        }

        // private List<string> GetFilesFromDirectory(string baseFolderName, string subFolderName)
        // {
        //     var folderPath = Path.Combine(Directory.GetCurrentDirectory(), baseFolderName, subFolderName);
        //     if (Directory.Exists(folderPath))
        //     {
        //         return Directory.GetFiles(folderPath)
        //                         .Select(file => Path.Combine(baseFolderName, subFolderName, Path.GetFileName(file)))
        //                         .ToList();
        //     }
        //     return new List<string>();
        // }

        private List<string> GetFilesFromDirectory(string baseFolderName, string subFolderName)
        {
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), baseFolderName, subFolderName);
            if (Directory.Exists(folderPath))
            {
                return Directory.GetFiles(folderPath)
                                .Select(file =>
                                    Path.Combine(baseFolderName, subFolderName, Path.GetFileName(file))
                                        .Replace("\\", "/") // 👈 بک‌اسلش رو با اسلش عوض کن
                                )
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

        // get all advertise of loggedin user
        [HttpGet("allAdvertises/{username}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllAdvertises(string username)
        {
            try
            {
                var rentAdvertises = await _context.HouseRentAdvertise
                    .Where(h => h.Username == username)
                    .OrderByDescending(h => h.AdvertiseSubmitDate)
                    .ToListAsync();

                var sellAdvertises = await _context.HouseSellAdvertise
                    .Where(h => h.Username == username)
                    .OrderByDescending(h => h.AdvertiseSubmitDate)
                    .ToListAsync();

                var allHouseAdvertises = rentAdvertises.Cast<object>()
                    .Concat(sellAdvertises.Cast<object>())
                    .ToList();

                var advertiseHouseWithFiles = new List<object>();


                // Join StoreRentAdvertises with StoreCommonAdvertises
                var rentStoreAdvertises = await (from rent in _context.StoreRentAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { rent.Username, rent.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.Username == username
                                            orderby common.AdvertiseSubmitDate descending
                                            select new
                                            {
                                                RentData = rent,   
                                                CommonData = common
                                            }).ToListAsync();

                // Join HouseSellAdvertise with StoreCommonAdvertise
                var sellStoreAdvertises = await (from sell in _context.StoreSellAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { sell.Username, sell.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.Username == username
                                            orderby common.AdvertiseSubmitDate descending
                                            select new
                                            {
                                                SellData = sell,   
                                                CommonData = common
                                            }).ToListAsync();

                // After retrieving the data, iterate over the results and get the files
                var rentStoreResultWithFiles = rentStoreAdvertises.Select(rent => new
                {
                    RentData = rent.RentData,
                    CommonData = rent.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(rent.CommonData.Username, rent.CommonData.AdvertiseCode)
                }).ToList();
                var SellStoreResultWithFiles = sellStoreAdvertises.Select(sell => new
                {
                    SellData = sell.SellData,
                    CommonData = sell.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(sell.CommonData.Username, sell.CommonData.AdvertiseCode)
                }).ToList();

                 var allStoreAdvertises = rentStoreResultWithFiles.Cast<object>()
                    .Concat(SellStoreResultWithFiles.Cast<object>())
                    .ToList();


                // ////////////////////////////////////////////
                // ////////////////////////////////////////////

                foreach (var advertise in allHouseAdvertises)
                {
                    string user_name = advertise is HouseRentAdvertise rentAdvertise ? rentAdvertise.Username : (advertise as HouseSellAdvertise).Username;
                    string advertise_code = advertise is HouseRentAdvertise rentAd ? rentAd.AdvertiseCode : (advertise as HouseSellAdvertise).AdvertiseCode;

                    var lowQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(user_name, advertise_code, "lowQuality"));
                    var highQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(user_name, advertise_code, "highQuality"));

                    if (highQualityFiles.Any() && lowQualityFiles.Any())
                    {
                        var filePairs = highQualityFiles.Select((highQuality, index) => new
                        {
                            HighQuality = highQuality,
                            LowQuality = lowQualityFiles.ElementAtOrDefault(index)
                        }).ToList();

                        advertiseHouseWithFiles.Add(new
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

                            advertiseHouseWithFiles.Add(new
                            {
                                Advertise = advertise,
                                Files = filePairs,
                                TodayDate = DateTime.Now
                            });
                        }
                    }
                }

                return Ok(new
                {
                    HouseAdvertisements = advertiseHouseWithFiles,
                    StoreAdvertisements = allStoreAdvertises
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while retrieving the advertisements." });
            }
        }


        [Authorize]
        [HttpGet("houseAdvertises")]
        public async Task<ActionResult<IEnumerable<object>>> GetHouseAdvertises()
        {
            try
            {
                var username = GetUsernameFromToken(); // از کوکی JWT بخون
                if (string.IsNullOrEmpty(username)) return Unauthorized();
                var rentAdvertises = await _context.HouseRentAdvertise
                    .Where(h => h.Username == username)
                    .OrderByDescending(h => h.AdvertiseSubmitDate)
                    .ToListAsync();

                var sellAdvertises = await _context.HouseSellAdvertise
                    .Where(h => h.Username == username)
                    .OrderByDescending(h => h.AdvertiseSubmitDate)
                    .ToListAsync();

                var allHouseAdvertises = rentAdvertises.Cast<object>()
                    .Concat(sellAdvertises.Cast<object>())
                    .ToList();

                var advertiseHouseWithFiles = new List<object>();

                foreach (var advertise in allHouseAdvertises)
                {
                    string user_name = advertise is HouseRentAdvertise rentAdvertise ? rentAdvertise.Username : (advertise as HouseSellAdvertise).Username;
                    string advertise_code = advertise is HouseRentAdvertise rentAd ? rentAd.AdvertiseCode : (advertise as HouseSellAdvertise).AdvertiseCode;

                    var lowQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(user_name, advertise_code, "lowQuality"));
                    var highQualityFiles = GetFilesFromDirectory("Resources/Images", Path.Combine(user_name, advertise_code, "highQuality"));

                    if (highQualityFiles.Any() && lowQualityFiles.Any())
                    {
                        var filePairs = highQualityFiles.Select((highQuality, index) => new
                        {
                            HighQuality = highQuality,
                            LowQuality = lowQualityFiles.ElementAtOrDefault(index)
                        }).ToList();

                        advertiseHouseWithFiles.Add(new
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

                            advertiseHouseWithFiles.Add(new
                            {
                                Advertise = advertise,
                                Files = filePairs,
                                TodayDate = DateTime.Now
                            });
                        }
                    }
                }

                return Ok(new
                {
                    HouseAdvertisements = advertiseHouseWithFiles,
                    // StoreAdvertisements = allStoreAdvertises
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while retrieving the advertisements." });
            }
        }

        
        [Authorize]
        [HttpGet("storeAdvertises")]
        public async Task<ActionResult<IEnumerable<object>>> GetStoreAdvertises()
        {
            try
            {
                
                var username = GetUsernameFromToken(); // از کوکی JWT بخون
                if (string.IsNullOrEmpty(username)) return Unauthorized();

                var rentStoreAdvertises = await (from rent in _context.StoreRentAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { rent.Username, rent.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.Username == username
                                            orderby common.AdvertiseSubmitDate descending
                                            select new
                                            {
                                                RentData = rent,   
                                                CommonData = common
                                            }).ToListAsync();

                // Join HouseSellAdvertise with StoreCommonAdvertise
                var sellStoreAdvertises = await (from sell in _context.StoreSellAdvertises
                                            join common in _context.StoreCommonAdvertises
                                            on new { sell.Username, sell.AdvertiseCode } equals new { common.Username, common.AdvertiseCode }
                                            where common.Username == username
                                            orderby common.AdvertiseSubmitDate descending
                                            select new
                                            {
                                                SellData = sell,   
                                                CommonData = common
                                            }).ToListAsync();

                // After retrieving the data, iterate over the results and get the files
                var rentStoreResultWithFiles = rentStoreAdvertises.Select(rent => new
                {
                    RentData = rent.RentData,
                    CommonData = rent.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(rent.CommonData.Username, rent.CommonData.AdvertiseCode)
                }).ToList();
                var SellStoreResultWithFiles = sellStoreAdvertises.Select(sell => new
                {
                    SellData = sell.SellData,
                    CommonData = sell.CommonData,
                    TodayDate = DateTime.Now,
                    Files = GetAdvertiseFiles(sell.CommonData.Username, sell.CommonData.AdvertiseCode)
                }).ToList();

                 var allStoreAdvertises = rentStoreResultWithFiles.Cast<object>()
                    .Concat(SellStoreResultWithFiles.Cast<object>())
                    .ToList();


                

                return Ok(new
                {
                    // HouseAdvertisements = advertiseHouseWithFiles,
                    StoreAdvertisements = allStoreAdvertises
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while retrieving the advertisements." });
            }
        }
       
    }

    
}