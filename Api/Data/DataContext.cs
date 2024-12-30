// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;



using Microsoft.EntityFrameworkCore;
using Api.Entities;

namespace Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<AppProvince> Provinces { get; set; }
        public DbSet<AppCities> Cities { get; set; }
        public DbSet<HouseRentAdvertise> HouseRentAdvertise { get; set; }
        public DbSet<HouseSellAdvertise> HouseSellAdvertise { get; set; }
        public DbSet<StoreRentAdvertise> StoreRentAdvertises { get; set; }
        public DbSet<StoreSellAdvertise> StoreSellAdvertises { get; set; }
        public DbSet<storeCommonAdvertise> StoreCommonAdvertises { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // تنظیم رابطه AppUser با Message برای فرستنده
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.MessagesSent)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            // تنظیم رابطه AppUser با Message برای گیرنده
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany(u => u.MessagesReceived)
                .HasForeignKey(m => m.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            // تنظیم ارتباط Message با ChatRoom
            modelBuilder.Entity<Message>()
                .HasOne(m => m.ChatRoom)
                .WithMany(cr => cr.Messages)
                .HasForeignKey(m => m.ChatRoomId)
                .OnDelete(DeleteBehavior.Cascade);

            // تنظیم ارتباط ChatRoom با AppUser برای کاربر شروع‌کننده چت
            modelBuilder.Entity<ChatRoom>()
                .HasOne(cr => cr.User)
                .WithMany()
                .HasForeignKey(cr => cr.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // تنظیم ارتباط ChatRoom با AppUser برای صاحب آگهی
            modelBuilder.Entity<ChatRoom>()
                .HasOne(cr => cr.Owner)
                .WithMany()
                .HasForeignKey(cr => cr.OwnerUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // تنظیم اندیس برای بهبود عملکرد کوئری‌ها روی Message
            modelBuilder.Entity<Message>()
                .HasIndex(m => new { m.SenderId, m.RecipientId });

            base.OnModelCreating(modelBuilder);
        }
    }
}


// namespace Api.Data
// {
//     public class DataContext : DbContext
//     {
//         public DataContext(DbContextOptions options) : base(options) {}

//         public DbSet<AppUser> Users { get; set; }
//         public DbSet<AppProvince> Provinces { get; set; }
//         public DbSet<AppCities> Cities { get; set; }
//         public DbSet<HouseRentAdvertise> HouseRentAdvertise { get; set; }
//         public DbSet<HouseSellAdvertise> HouseSellAdvertise { get; set; }
//         public DbSet<StoreRentAdvertise> StoreRentAdvertises { get; set; }
//         public DbSet<StoreSellAdvertise> StoreSellAdvertises { get; set; }
//         public DbSet<storeCommonAdvertise> StoreCommonAdvertises { get; set; }
//         public DbSet<Message> Messages { get; set; }
//         public DbSet<ChatRoom> ChatRooms { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             // تنظیمات ارتباط AppUser با Message
//             modelBuilder.Entity<Message>()
//                 .HasOne(u => u.Sender)
//                 .WithMany(m => m.MessagesSent)
//                 .HasForeignKey(m => m.SenderId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             modelBuilder.Entity<Message>()
//                 .HasOne(u => u.Recipient)
//                 .WithMany(m => m.MessagesReceived)
//                 .HasForeignKey(m => m.RecipientId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             // اندیس برای بهبود عملکرد کوئری پیام‌ها
//             modelBuilder.Entity<Message>()
//                 .HasIndex(m => new { m.SenderId, m.RecipientId });

//             // تنظیمات ارتباط ChatRoom با AppUser
//             modelBuilder.Entity<ChatRoom>()
//                 .HasOne<AppUser>(cr => cr.User)
//                 .WithMany()
//                 .HasForeignKey(cr => cr.UserId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             modelBuilder.Entity<ChatRoom>()
//                 .HasOne<AppUser>(cr => cr.Owner)
//                 .WithMany()
//                 .HasForeignKey(cr => cr.OwnerUserId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             base.OnModelCreating(modelBuilder);
//         }
//     }
// }







////////////////////
//     before     //
////////////////////



// using Api.Entities;
// using Microsoft.EntityFrameworkCore;


// namespace Api.Data
// {
//     public class DataContext :DbContext
//     {
//         public DataContext(DbContextOptions options) : base(options){}

        
//         public DbSet<AppUser> Users{get;set;}
//         public DbSet<AppProvince> Provinces{get;set;}
//         public DbSet<AppCities> Cities{get;set;}
//         public DbSet<HouseRentAdvertise> HouseRentAdvertise{get;set;}
//         public DbSet<HouseSellAdvertise> HouseSellAdvertise{get;set;}
//         public DbSet<StoreRentAdvertise> StoreRentAdvertises{get;set;}
//         public DbSet<StoreSellAdvertise> StoreSellAdvertises{get;set;}
//         public DbSet<storeCommonAdvertise> StoreCommonAdvertises { get; set; }
//         public DbSet<Message> Messages { get; set; }


//         // this one added latest
//         // public DbSet<ChatRoom> ChatRooms { get; set; } 



//         // Fluent API configuration for relationships and indexes
//          protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             // تنظیمات ارتباط AppUser با Message
//             modelBuilder.Entity<Message>()
//                 .HasOne(u => u.Sender)
//                 .WithMany(m => m.MessagesSent)
//                 .HasForeignKey(m => m.SenderId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             modelBuilder.Entity<Message>()
//                 .HasOne(u => u.Recipient)
//                 .WithMany(m => m.MessagesReceived)
//                 .HasForeignKey(m => m.RecipientId)
//                 .OnDelete(DeleteBehavior.Restrict);

//             // اندیس برای بهبود عملکرد کوئری پیام‌ها
//             modelBuilder.Entity<Message>()
//                 .HasIndex(m => new { m.SenderId, m.RecipientId });

//             base.OnModelCreating(modelBuilder);
//         }
//     }
// }