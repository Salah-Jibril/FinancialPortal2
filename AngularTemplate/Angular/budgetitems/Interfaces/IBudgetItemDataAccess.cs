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
    public interface IBudgetItemDataAccess
    {
        Task<IList<BudgetItem>> FindBudgetItemsByHouseholdAsync(string household);
        Task<IList<BudgetItem>> FindBudgetItemsByBudgetTypeAsync(string budgettype, string household);
        Task<IList<BudgetItem>> FindBudgetItemsByCategoryIdAsync(int categoryid);
        Task<BudgetItem> FindBudgetItemByIdAsync(int budgetitemid);

        //auto procs
        Task InsertBudgetItemAsync(BudgetItem account);
        Task<BudgetItem> SelectBudgetItemAsync(int id);
        Task UpdateBudgetItemAsync(BudgetItem account);
        Task DeleteBudgetItemAsync(int Id);
    }
}
