using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

// //////////////////////////////////
public string CreateToken(AppUser user)
{
    var claims = new List<Claim>
    {
        new Claim("userId", user.Id.ToString()),               // شناسه کاربر
        new Claim("username", user.UserName.ToString()),            // اختیاری ولی خوبه
        new Claim("isJobOwner", user.IsJobOwner.ToString())    // صاحب آگهی یا نه
    };

    var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(8), // اعتبار کوتاه برای امنیت
        SigningCredentials = creds
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
}

    }
}