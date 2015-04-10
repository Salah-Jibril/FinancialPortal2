using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.Models.FinancialDatabase
{
    public class Transaction
    {   
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Description { get; set; }
        public DateTimeOffset Updated { get; set; }
        public string UpdatedByUserId { get; set; }
        public string User { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal ReconciledAmount { get; set; }
        public string Type { get; set; }
        public Guid Household { get; set; }

    }
}