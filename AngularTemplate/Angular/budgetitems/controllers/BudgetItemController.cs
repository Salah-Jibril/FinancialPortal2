using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinancialPortal.Models.Interfaces;
using FinancialPortal.Models.FinancialDatabase;
using Insight.Database;

namespace FinancialPortal.Controllers
{
    [RoutePrefix("api/BudgetItem")]
    public class BudgetItemController : ApiController
    {
        // DO a connection to the database via your dataAccess and 
        // write the implementations here and call them in you angular controller
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private IBudgetItemDataAccess db;

        public BudgetItemController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<IBudgetItemDataAccess>();
        }

        [Route("getByType")]
        [HttpGet]
        public Task<IList<BudgetItem>> FindByType(string budgetType, string houseHold)
        {
            return db.FindBudgetItemsByBudgetTypeAsync(budgetType, houseHold);
        }

        [Route("getByCategory")]
        [HttpGet]
        public Task<IList<BudgetItem>> FindByCategory(int CategoryId)
        {
            return db.FindBudgetItemsByCategoryIdAsync(CategoryId);
        }

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<BudgetItem>> FindByHousehold(string household)
        {
            return db.FindBudgetItemsByHouseholdAsync(household);
        }

        [Route("getedit")]
        [HttpGet]
        public Task<BudgetItem> getEditAccount(int budgetitemId)
        {
            return db.FindBudgetItemByIdAsync(budgetitemId);
        }

        [Route("delete")]
        [HttpGet]
        public Task DeleteAsync(int id)
        {
            return db.DeleteBudgetItemAsync(id);
        }

        [Route("create")]
        [HttpPost]
        public Task CreateAsync(BudgetItem budgetItem)
        {
            return db.InsertBudgetItemAsync(budgetItem);
        }

        [Route("edit")]
        [HttpPost]
        public Task UpdatesAsync(BudgetItem budgetItem)
        {
            return db.UpdateBudgetItemAsync(budgetItem);
        }
    }
}
