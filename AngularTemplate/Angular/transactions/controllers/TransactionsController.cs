using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinancialPortal.Models.Interfaces;
using FinancialPortal.Models.FinancialDatabase;
using Insight.Database;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace AngularTemplate.Angular.transactions.controllers
{
    [RoutePrefix("api/Transactions")]
    public class TransactionsController : ApiController
    {
        // DO a connection to the database via your dataAccess and 
        // write the implementations here and call them in you angular controller
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private ITransactionDataAccess db;

        public TransactionsController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<ITransactionDataAccess>();
        }
        
        [Route("getByUser")]
        [HttpGet]
        public Task<IList<Transaction>> getUserTransaction(int userId)
        {
            return db.FindTransactionsByUserIdAsync(userId);
        }

        [Route("getedit")]
        [HttpGet]
        public Task<Transaction> getEditTransaction(int transactionId)
        {
            return db.FindTransactionsByIdAsync(transactionId);
        }

        [Route("getByCategory")]
        [HttpGet]
        public Task<IList<Transaction>> FindByCategory(int categoryId)
        {
            return db.FindTransactionsByCategoryIdAsync(categoryId);
        }

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<Transaction>> FindByHousehold(Guid household)
        {
            return db.FindTransactionsByHouseholdAsync(household);
        }

        [Route("getByAccount")]
        [HttpGet]
        public Task<IList<Transaction>> FindByAccount(int accountId)
        {
            return db.FindTransactionsByAccountIdAsync(accountId);
        }

        [Route("delete")]
        [HttpGet]
        public Task DeleteAsync(int id)
        {
            return db.DeleteTransactionAsync(id);
        }

        [Route("create")]
        [HttpPost]
        public Task CreateAsync(Transaction transaction)
        {
            return db.InsertTransactionAsync(transaction);
        }

        [Route("edit")]
        [HttpPost]
        public Task UpdatesAsync(Transaction transaction)
        {
            return db.UpdateTransactionAsync(transaction);
        }
    }
}
