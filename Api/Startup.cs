// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.HttpsPolicy;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
// using System.Text;
// using Api.Data;
using Api.Extensions;
using Api.Interfaces;
using Api.Services;
using Api.Middleware;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
// using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;
using Api.chatHub;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        // public IConfiguration _config{get;}

        public Startup(IConfiguration config)
        {
            _config = config;
        }

     

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenBlacklistService, InMemoryTokenBlacklistService>();
            ///////////////////////////////////////////////////////////////////////////////// 
            // services.AddScoped<ITokenService,TokenService>();
            // services.AddDbContext<DataContext>(options=>{
                
            //     options.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            //     //Shorthand for _config.GetSection("ConnectionStrings")["DefaultConnection"]
            // });
            services.AddApplicationServices(_config);
            // services.AddApplicationServices(_config);
            ///////////////////////////////////////////////////////////////////////////////// 
            
            services.AddControllers();
            services.AddCors();
            ///////////////////////////////////////////////////////////////////////////////// 
            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options=>{
            //     options.TokenValidationParameters = new TokenValidationParameters
            //     {
            //         ValidateIssuerSigningKey = true,
            //         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
            //         ValidateIssuer = false,
            //         ValidateAudience = false,

            //     };
            // });
            //  services.AddScoped<ITokenBlacklistService, InMemoryTokenBlacklistService>();
            services.AddIdentityServices(_config);
            ///////////////////////////////////////////////////////////////////////////////// 

            services.AddSignalR();
            services.Configure<FormOptions>( o=>
            {
                o.ValueLengthLimit = int.MaxValue;            
                o.MultipartBoundaryLengthLimit = int.MaxValue;            
                o.MemoryBufferThreshold = int.MaxValue ;           

            });
           

            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            // });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();               
            }
            // app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider =new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            app.UseCors(policy => {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                policy.AllowCredentials(); // Include this if your client includes credentials.
            });
            app.UseAuthentication();
            

            app.UseAuthorization();

            app.UseMiddleware<TokenBlacklistMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatHub");
            });
        }
    }
}
