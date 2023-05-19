using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OfficeOrganizer.Data;
using OfficeOrganizer.Models;

namespace OfficeOrganizer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskItemController : Controller
    {    
        private readonly ApplicationDbContext _applicationDbContext;
        public TaskItemController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }  

        [HttpGet] 
        public async Task<IActionResult> GetAllTasks()
        {
            var taskItems = await _applicationDbContext.TaskItems.ToListAsync();
            return Ok(taskItems);
        }       
        
        [HttpPost]
        public async Task<IActionResult> AddTasks([FromBody] TaskItem taskItemRequest)
        {
            taskItemRequest.Id = Guid.NewGuid();
            await _applicationDbContext.TaskItems.AddAsync(taskItemRequest);
            await _applicationDbContext.SaveChangesAsync();
            return Ok(taskItemRequest);
        }
    }
}