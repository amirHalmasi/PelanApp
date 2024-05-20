using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Interfaces;

namespace Api.Services
{
    public class InMemoryTokenBlacklistService : ITokenBlacklistService
    {
        private readonly HashSet<string> _blacklist = new HashSet<string>();

        public Task AddTokenToBlacklistAsync(string token)
        {
            _blacklist.Add(token);
            return Task.CompletedTask;
        }

        public Task<bool> IsTokenBlacklistedAsync(string token)
        {
            return Task.FromResult(_blacklist.Contains(token));
        }
    }
}