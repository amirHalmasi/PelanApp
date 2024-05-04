// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

using Api.Entities;
using Microsoft.EntityFrameworkCore;


namespace Api.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions options) : base(options){}

        
        public DbSet<AppUser> Users{get;set;}
        public DbSet<AppProvince> Provinces{get;set;}
        public DbSet<AppCities> Cities{get;set;}
    }
}