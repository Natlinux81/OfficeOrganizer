using System.Text.RegularExpressions;
using System.Text;
using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOrganizer.Data;
using OfficeOrganizer.Models;
using OfficeOrganizer.helper;

namespace OfficeOrganizer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AuthenticationDbContext _authenticationDbContext;

        public UserController(AuthenticationDbContext authenticationDbContext)
        {
            _authenticationDbContext = authenticationDbContext;
        }   

        [HttpPost("authenticate")]
        public async Task<IActionResult>Authenticate([FromBody] User userRequest)
        {
            if (userRequest == null)
                return BadRequest();  
                         
            var user = await _authenticationDbContext.Users
            .FirstOrDefaultAsync(x => x.Username == userRequest.Username);            

            if (user == null)
                return NotFound(new {Message = "User Not Found!"});

            if(!PasswordHasher.VerifyPassword(userRequest.Password, user.Password))
            {
                return BadRequest(new {Message = "Wrong Password"});
            }

            return Ok(new {Message = "Login Success!"});    
        } 

        [HttpPost("register")]    
        public async Task<IActionResult>RegisterUser([FromBody] User userRequest)
        {
            if(userRequest == null)
                return BadRequest();
            // Check Username
            if(await CheckUserNameExistAsync(userRequest.Username))
                return BadRequest(new {Message = "Username Already Exist!"});

            // Check E-Mail
            if(await CheckEmailExistAsync(userRequest.Email))
                return BadRequest(new {Message = "E-Mail Already Exist!"});

            // Check password Strength
            var password = CheckPasswordStrength(userRequest.Password);
            if(!string.IsNullOrEmpty(password))
                return BadRequest(new {Message = password.ToString()});
            

            userRequest.Password = PasswordHasher.HashPassword(userRequest.Password);
            userRequest.Role = "User";
            userRequest.Token = "";                
            await _authenticationDbContext.Users.AddAsync(userRequest);
            await _authenticationDbContext.SaveChangesAsync();

            return Ok( new {Message = "User Registered!"});
        }        

        private Task<bool> CheckUserNameExistAsync(string username)
        => _authenticationDbContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckEmailExistAsync(string email)
        => _authenticationDbContext.Users.AnyAsync(x => x.Email == email);

        private static string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum Password length should be 8"+ Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if(!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contains special chars");
                return sb.ToString();
                
            
        }
    }
}