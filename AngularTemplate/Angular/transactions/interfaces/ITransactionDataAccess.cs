using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Insight.Database;
using FinancialPortal.Models.FinancialDatabase;

namespace FinancialPortal.Models.Interfaces
{
    [Sql(Schema = "dbo")]
    public interface ITransactionDataAccess
    {
        Task<IList<Transaction>> FindTransactionsByCategoryIdAsync(int categoryid);
        Task<IList<Transaction>> FindTransactionsByAccountIdAsync(int accountid);
        Task<IList<Transaction>> FindTransactionsByUserIdAsync(int userid);
        Task<IList<Transaction>> FindTransactionsByHouseholdAsync(Guid household);
        Task<Transaction> FindTransactionsByIdAsync(int transactionid);

        //auto procs
        Task InsertTransactionAsync(Transaction t);
        Task<Transaction> SelectTransactionAsync(int id);
        Task UpdateTransactionAsync(Transaction t);
        Task DeleteTransactionAsync(int Id);
    }
}
