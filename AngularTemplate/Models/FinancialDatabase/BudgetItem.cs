using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.Models.FinancialDatabase
{
    public class BudgetItem
    {
        public int Id { get; set; }
        public Guid Household { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string BudgetType { get; set; }
        public string Category { get; set; }
    }
}