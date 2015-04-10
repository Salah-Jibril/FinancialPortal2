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
    [RoutePrefix("api/Dashboard")]
    public class dashboardController : ApiController
    {
        // DO a connection to the database via your dataAccess and 
        // write the implementations here and call them in you angular controller
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private IDashboardAccess db;

        public dashboardController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<IDashboardAccess>();
        }
        //private readonly IAccountDataAccess _accoutData;

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<Category>> FindByHousehold(string household)
        {
            return db.getTandBByCategoryIdAsync(household);
        }
    }
}
