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
    public interface ICategoryDataAccess
    {
        Task<IList<Category>> FindCategoriesByHouseholdAsync(string household);
        Task<Category> FindCategoryByIdAsync(int categoryid);

        //auto procs
        Task InsertCategoryAsync(Category category);
        Task<Account> SelectCategoryAsync(int id);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int Id);
    }
}
