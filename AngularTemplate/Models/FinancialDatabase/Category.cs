using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.Models.FinancialDatabase
{
    public class Category
    {
        public int Id { get; set; }
        public Guid Household { get; set; }
        public string Name { get; set; }
        public decimal TAmount { get; set; }
        public decimal BAmount { get; set; }
        public int TCount { get; set; }
        public int BCount { get; set; }
    }
}