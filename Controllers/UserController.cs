using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOrganizer.Data;
using OfficeOrganizer.Models;

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
            .FirstOrDefaultAsync(x => x.Username == userRequest.Username && x.Password == userRequest.Password);            

            if (user == null)
                return NotFound(new {Message = "User Not Found!"});

            return Ok(new {Message = "Login Success!"});    
        } 

        [HttpPost("register")]    
        public async Task<IActionResult>RegisterUser([FromBody] User userRequest)
        {
            if(userRequest == null)
                return BadRequest();

            await _authenticationDbContext.Users.AddAsync(userRequest);
            await _authenticationDbContext.SaveChangesAsync();
            return Ok( new {Message = "User Registered!"});
        }
    }
}