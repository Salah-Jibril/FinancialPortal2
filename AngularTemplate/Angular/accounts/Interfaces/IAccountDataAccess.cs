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
    public interface IAccountDataAccess
    {
        Task<IList<Account>> FindAccountsByHouseholdAsync(string household);
        Task<Account> FindAccountByIdAsync(int id);

        //auto procs
        Task InsertAccountAsync(Account account);
        Task<Account> SelectAccountAsync(int id);
        Task UpdateAccountAsync(Account account);
        Task DeleteAccountAsync(int Id);
    }
}

