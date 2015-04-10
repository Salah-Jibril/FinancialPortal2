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

namespace AngularTemplate.Angular.categories.controllers
{
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        // DO a connection to the database via your dataAccess and 
        // write the implementations here and call them in you angular controller
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private ICategoryDataAccess db;

        public CategoryController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<ICategoryDataAccess>();
        }
        //private readonly IAccountDataAccess _accoutData;

        [Route("getedit")]
        [HttpGet]
        public Task<Category> getEditCategory(int categoryId)
        {
            return db.FindCategoryByIdAsync(categoryId);
        }

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<Category>> FindByHousehold(string household)
        {
            return db.FindCategoriesByHouseholdAsync(household);
        }

        [Route("delete")]
        [HttpGet]
        public Task DeleteAsync(int id)
        {
            return db.DeleteCategoryAsync(id);
        }

        [Route("create")]
        [HttpPost]
        public Task CreateAsync(Category category)
        {
            return db.InsertCategoryAsync(category);
        }

        [Route("edit")]
        [HttpPost]
        public Task UpdatesAsync(Category category)
        {
            return db.UpdateCategoryAsync(category);
        }
    }
}
