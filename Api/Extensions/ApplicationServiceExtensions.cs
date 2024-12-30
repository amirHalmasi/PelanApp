using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// /////////////////////////////////////
using Microsoft.Extensions.DependencyInjection;
using Api.Interfaces;
using Api.Services;
using Api.Data;
using Microsoft.EntityFrameworkCore;
// using Api.Helpers;



namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService,TokenService>();
            // services.AddScoped<IUserRepository,UserRepository>();
            // services.AddScoped<IMessageRepository,MessageRepository>();
            // services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            // services.AddScoped<IMessageRepository,MessageRepository>();
            services.AddDbContext<DataContext>(options=>{
                
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                //Shorthand for _config.GetSection("ConnectionStrings")["DefaultConnection"]
            });

            return services;
        }
    }
}