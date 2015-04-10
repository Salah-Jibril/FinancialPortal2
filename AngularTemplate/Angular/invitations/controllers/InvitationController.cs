using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinancialPortal.Models.Interfaces;
using FinancialPortal.Models.FinancialDatabase;
using Insight.Database;
using System.Data.SqlClient;
using System.Configuration;
using System.Threading.Tasks;

namespace AngularTemplate.Angular.invitations.controllers
{
    [RoutePrefix("api/Invitation")]
    public class InvitationController : ApiController
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private SqlConnection c;
        private IInvitationDataAccess db;

        public InvitationController()
        {
            c = new SqlConnection(connectionString);
            db = c.As<IInvitationDataAccess>();
        }
        //private readonly IAccountDataAccess _accoutData;

        [Route("getByHousehold")]
        [HttpGet]
        public Task<IList<Invitation>> FindByHousehold(string household)
        {
            return db.FindInvitationsByHouseholdAsync(household);
        }

        [Route("delete")]
        [HttpGet]
        public Task DeleteAsync(int id)
        {
            return db.DeleteInvitationAsync(id);
        }

        [Route("create")]
        [HttpPost]
        public Task CreateAsync(Invitation invitation)
        {
            return db.InsertInvitationAsync(invitation);
        }
    }
}
