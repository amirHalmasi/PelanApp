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
using Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

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

            
            services.AddDbContext<DataContext>(options=>{
                
                options.UseSqlite(_config.GetConnectionString("DefaultConnection"));
                //Shorthand for _config.GetSection("ConnectionStrings")["DefaultConnection"]
            });
            services.AddControllers();
            services.AddCors();
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

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy => {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                policy.AllowCredentials(); // Include this if your client includes credentials.
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
