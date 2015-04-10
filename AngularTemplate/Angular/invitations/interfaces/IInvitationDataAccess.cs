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
    public interface IInvitationDataAccess
    {
        Task<IList<Invitation>> FindInvitationsByHouseholdAsync(string household);

        //auto procs
        Task InsertInvitationAsync(Invitation invitation);
        Task<Invitation> SelectInvitationAsync(int id);
        Task UpdateInvitationAsync(Invitation invitation);
        Task DeleteInvitationAsync(int Id);
    }
}
