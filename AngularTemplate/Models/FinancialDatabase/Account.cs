using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.Models.FinancialDatabase
{
    public class Account
    {
        public int Id { get; set; }
        public Guid Household { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public decimal? ReconciledBalance { get; set; }
    }
}