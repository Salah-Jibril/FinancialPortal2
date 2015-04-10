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
    [RoutePrefix("api/FinancialAccount")]
    public class FinancialAccountController : ApiController
    {
        // DO a connection to the database via your dataAccess and 
        // write the implementations here and call them in you angular controller
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private IAccountDataAccess db;

        public FinancialAccountController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<IAccountDataAccess>();
        }
        //private readonly IAccountDataAccess _accoutData;

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<Account>> FindByHousehold(string household)
        {
            return db.FindAccountsByHouseholdAsync(household);
        }

        [Route("getedit")]
        [HttpGet]
        public Task<Account> getEditAccount(int id)
        {
            return db.FindAccountByIdAsync(id);
        }

        [Route("delete")]
        [HttpGet]
        public Task DeleteAsync(int id)
        {
            return db.DeleteAccountAsync(id);
        }

        [Route("create")]
        [HttpPost]
        public Task CreateAsync(Account account)
        {
            return db.InsertAccountAsync(account);
        }

        [Route("edit")]
        [HttpPost]
        public Task UpdatesAsync(Account account)
        {
            return db.UpdateAccountAsync(account);
        }
    }
}
