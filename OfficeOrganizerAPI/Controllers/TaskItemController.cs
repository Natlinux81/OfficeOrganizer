using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
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

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTaskById([FromRoute] Guid id)
        {
          var taskItem = await _applicationDbContext.TaskItems.FirstOrDefaultAsync(x => x.Id == id);

          if(taskItem == null)
          {
            return NotFound();
          }         
          return Ok(taskItem);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTask([FromRoute] Guid id, TaskItem updateTaskItem)
        {
            var taskItem = await _applicationDbContext.TaskItems.FindAsync(id);

            if(taskItem == null)
          {
            return NotFound();
          }
          taskItem.Title = updateTaskItem.Title;
          taskItem.IsDone = updateTaskItem.IsDone;

          await _applicationDbContext.SaveChangesAsync();
          return Ok(taskItem);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTask([FromRoute] Guid id)
        {
          var taskItem = await _applicationDbContext.TaskItems.FindAsync(id);

          if(taskItem == null)
          {
            return NotFound();
          }
          _applicationDbContext.TaskItems.Remove(taskItem);
          await _applicationDbContext.SaveChangesAsync();
          return Ok(taskItem);
        }
    }
}