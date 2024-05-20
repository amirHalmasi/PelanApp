using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface ITokenBlacklistService
    {
        Task AddTokenToBlacklistAsync(string token);
        Task<bool> IsTokenBlacklistedAsync(string token);
    }

}