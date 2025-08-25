using Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Api.Services;
using Api.Interfaces;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddScoped<ITokenBlacklistService, InMemoryTokenBlacklistService>();
            builder.Services.AddScoped<ITokenService, TokenService>();

            // DbContext با SQLite
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .WithOrigins("https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // JWT authentication with cookie support
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            // SignalR token
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chatHub"))
                            {
                                context.Token = accessToken;
                            }

                            // API token from cookie
                            if (string.IsNullOrEmpty(context.Token))
                            {
                                var tokenFromCookie = context.Request.Cookies["access_token"];
                                if (!string.IsNullOrEmpty(tokenFromCookie))
                                {
                                    context.Token = tokenFromCookie;
                                }
                            }

                            return Task.CompletedTask;
                        }
                    };

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            builder.Services.AddAuthorization();

            var app = builder.Build();

            // Migration
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration");
            }

            // Configure the HTTP request pipeline.
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("CorsPolicy"); // حتما قبل از Authentication

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            await app.RunAsync();
        }
    }
}


// using Api.Data;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;


// namespace API
// {
//     public class Program
//     {
//         public static async Task Main(string[] args)
//         {
//             // CreateHostBuilder(args).Build().Run();
//             var host = CreateHostBuilder(args).Build();
//             using var scope = host.Services.CreateScope();
//             var services = scope.ServiceProvider;
//             try
//             {
//                 var context = services.GetRequiredService<DataContext>();
//                 await context.Database.MigrateAsync();
//                 // recreate data base when shoutdown
//             }
//             catch (Exception exception)
//             {
                
//                 var logger = services.GetRequiredService<ILogger<Program>>();
//                 logger.LogError(exception,"An error occurred during migration");
//             }

//             await host.RunAsync();
//         }

//         public static IHostBuilder CreateHostBuilder(string[] args) =>
//             Host.CreateDefaultBuilder(args)
//                 .ConfigureWebHostDefaults(webBuilder =>
//                 {
//                     webBuilder.UseStartup<Startup>();
//                 });
//     }
// }
