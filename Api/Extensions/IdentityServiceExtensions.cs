using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// ////////////////////////////////
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Api.Interfaces;
using Api.Services;

namespace Api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options=>{
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,

                };
            });

            

            services.AddScoped<ITokenBlacklistService, InMemoryTokenBlacklistService>();
            return services;
        }
    }
}