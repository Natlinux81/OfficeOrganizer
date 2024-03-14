using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OfficeOrganizer.Models
{
    public class Amount
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Amounts { get; set; }
        public bool Earning { get; set; }
        public bool Expense { get; set; }
        public bool Monthly { get; set; }
    }
}