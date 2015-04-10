﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.Models.FinancialDatabase
{
    public class Invitation
    {
        public int Id { get; set; }
        public int FromUserId { get; set; }
        public string ToEmail { get; set; }
        public Guid Household { get; set; }
        public string UserName { get; set; }
    }
}