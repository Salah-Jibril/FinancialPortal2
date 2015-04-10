using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using Insight.Database.Schema;

namespace CoderFoundry.InsightUserStore.DB
{
    public static class Program
    {
        static void Main()
        {
            var schema = new SchemaObjectCollection();
            schema.Load(Assembly.GetExecutingAssembly());

            // automatically create the database
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            var databaseName = "jibrils-FinancialPortal";
            SchemaInstaller.CreateDatabase(connectionString);

            // automatically install it, or upgrade it
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var installer = new SchemaInstaller(connection);
                new SchemaEventConsoleLogger().Attach(installer);
                installer.Install(databaseName, schema);
            }
        }

        private static string GetConnectionString()
        {
            var cs = Environment.GetCommandLineArgs().ElementAtOrDefault(1);

            if (cs != null && !string.IsNullOrWhiteSpace(cs))
                return cs;

            try
            {
                cs = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
                if (!string.IsNullOrWhiteSpace(cs))
                    return cs;
            }
            catch
            {
            }

            var csb = new SqlConnectionStringBuilder();

            csb.DataSource = Prompt("Database server: ");
            csb.InitialCatalog = Prompt("Database name: ");
            csb.IntegratedSecurity = Prompt("Integrated security (true/false)? ").Parse(bool.Parse);

            if (!csb.IntegratedSecurity)
            {
                csb.UserID = Prompt("User ID: ");
                csb.Password = Prompt("Password: ");
            }

            return csb.ConnectionString;
        }

        private static string Prompt(string prompt)
        {
            Console.Write(prompt);
            return Console.ReadLine();
        }

        static T Parse<T>(this string s, Func<string, T> parser)
        {
            return parser(s);
        }
    
    }

    
}
