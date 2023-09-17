using System.Security.Cryptography;
using System.Security.Claims;
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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using OfficeOrganizer.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using NETCore.MailKit.Core;
using OfficeOrganizer.UtilityServices;

namespace OfficeOrganizer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;
        private readonly IEMailService _emailService;

        public UserController(ApplicationDbContext applicationDbContext, IConfiguration configuration, IEMailService eMailService)
        {
            _applicationDbContext = applicationDbContext;
            _configuration = configuration;
            _emailService = eMailService;
        }  

        [Authorize] 
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers(){
            return Ok(await _applicationDbContext.Users.ToListAsync());
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult>Authenticate([FromBody] User userRequest)
        {
            if (userRequest == null)
                return BadRequest();  
                         
            var user = await _applicationDbContext.Users
            .FirstOrDefaultAsync(x => x.Username == userRequest.Username);            

            if (user == null)
                return NotFound(new {Message = "User Not Found!"});
                

            if(!PasswordHasher.VerifyPassword(userRequest.Password, user.Password))
            {
                return BadRequest(new {Message = "Wrong Password"});
            }

            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(new TokenApiDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });    
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
            await _applicationDbContext.Users.AddAsync(userRequest);
            await _applicationDbContext.SaveChangesAsync();

            return Ok( new {Message = "User Registered!"});
        }        

        private Task<bool> CheckUserNameExistAsync(string username)
        => _applicationDbContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckEmailExistAsync(string email)
        => _applicationDbContext.Users.AnyAsync(x => x.Email == email);

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

        private string CreateJwt(User user){
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.Username}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);        
        } 

         private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _applicationDbContext.Users
                .Any(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }   

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token,tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is Invalid Token");
            return principal;
                
        }  

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody]TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Invalid Client Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid Request");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _applicationDbContext.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(a => a.Email == email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "email Doesn´t Exist"
                });                
            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
            string from = _configuration ["EmailSettings:From"];
            var emailModel = new EmailModel(email, "Reset Password!!", EmailBody.EmailStringBody(email,emailToken));
            _emailService.SendEmail(emailModel);
            _applicationDbContext.Entry(user).State = EntityState.Modified;
            await _applicationDbContext.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent!"
            });
        }  
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _applicationDbContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Doesn´t Exist"
                });
            }
             var tokenCode = user.ResetPasswordToken;
             DateTime emailTokenExpiry = user.ResetPasswordExpiry;
             if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
             {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Invalid Reset link"
                });
             }
             user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
             _applicationDbContext.Entry(user).State = EntityState.Modified;
             await _applicationDbContext.SaveChangesAsync();
             return Ok(new
             {
                StatusCode = 200,
                Message = "Password Reset Successfully"
             });
        }     
    }
}