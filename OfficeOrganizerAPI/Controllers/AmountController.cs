using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOrganizer.Data;
using OfficeOrganizer.Models;

namespace OfficeOrganizer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AmountController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public AmountController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }  

        [Authorize]
        [HttpGet] 
        public async Task<IActionResult> GetAllTasks()
        {
            var amounts = await _applicationDbContext.Amounts.ToListAsync();
            return Ok(amounts);
        }       
        
        [HttpPost]
        public async Task<IActionResult> AddTasks([FromBody] Amount amountRequest)
        {
            amountRequest.Id = Guid.NewGuid();
            await _applicationDbContext.Amounts.AddAsync(amountRequest);
            await _applicationDbContext.SaveChangesAsync();
            
            return Ok(amountRequest);
            
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTaskById([FromRoute] Guid id)
        {
          var amount = await _applicationDbContext.Amounts.FirstOrDefaultAsync(x => x.Id == id);

          if(amount == null)
          {
            return NotFound();
          }         
          return Ok(amount);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTask([FromRoute] Guid id, Amount updateAmount)
        {
            var amount = await _applicationDbContext.Amounts.FindAsync(id);

            if(amount == null)
          {
            return NotFound();
          }
          amount.Title = updateAmount.Title;
          amount.Earning = updateAmount.Earning;
          amount.Expense = updateAmount.Expense;
          amount.Monthly = updateAmount.Monthly;

          await _applicationDbContext.SaveChangesAsync();
          return Ok(amount);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTask([FromRoute] Guid id)
        {
          var amount = await _applicationDbContext.Amounts.FindAsync(id);

          if(amount == null)
          {
            return NotFound();
          }
          _applicationDbContext.Amounts.Remove(amount);
          await _applicationDbContext.SaveChangesAsync();
          return Ok(amount);
        }
    }
}