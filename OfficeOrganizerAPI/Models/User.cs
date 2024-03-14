using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OfficeOrganizer.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Terms { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }   
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; } 

        #nullable enable        
        public string? ResetPasswordToken { get; set; }
        #nullable restore
        
        public DateTime ResetPasswordExpiry { get; set; }
    }
}