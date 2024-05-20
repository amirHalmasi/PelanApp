using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Api.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Services
{
    public class TokenBlacklistMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenBlacklistMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                if (!string.IsNullOrEmpty(token))
                {
                    using (var scope = context.RequestServices.CreateScope())
                    {
                        var tokenBlacklistService = scope.ServiceProvider.GetRequiredService<ITokenBlacklistService>();

                        var isBlacklisted = await tokenBlacklistService.IsTokenBlacklistedAsync(token);

                        if (isBlacklisted)
                        {
                            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            await context.Response.WriteAsync("Token is blacklisted");
                            return;
                        }
                    }
                }
            }

            await _next(context);
        }
    }
}
