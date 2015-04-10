using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Insight.Database;
using FinancialPortal.Models.FinancialDatabase;
using System.Threading.Tasks;

namespace FinancialPortal.Models.Interfaces
{
    [Sql(Schema = "dbo")]
    public interface IDashboardAccess
    {
        Task<IList<Category>> getTandBByCategoryIdAsync(string household);
    }
}
