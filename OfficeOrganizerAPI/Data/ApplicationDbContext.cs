using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OfficeOrganizer.helper;
using OfficeOrganizer.Models;

namespace OfficeOrganizer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
        {
            
        }
        public DbSet<User> Users {get; set;}
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Amount> Amounts {get; set;}

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var defaultAdmin = new User{
                    Id = Guid.NewGuid(),
                    Username = "NatlinuxAdmin",
                    Password = PasswordHasher.HashPassword("Admin@123"),
                    Email = "admin@admin.de",
                    Role = "Admin"                              
                };

            var defaultUser = new User{
                    Id = Guid.NewGuid(),
                    Username = "NatlinuxUser",
                    Password = PasswordHasher.HashPassword("User@123"),
                    Email = "nathaliewenske790@hotmail.com",
                    Role = "User"     
                };
                
            modelBuilder.Entity<User>().ToTable("Users").HasData(defaultUser, defaultAdmin);
        }
    }
}