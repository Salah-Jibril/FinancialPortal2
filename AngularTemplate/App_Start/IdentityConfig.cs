using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using FinancialPortal.Models;
using FinancialPortal.Models.UserDatabase;
using FinancialPortal.Models.Interfaces;
using System.Data.SqlClient;
using Insight.Database;
using FinancialPortal.Models.Stores;
using System;
using System.Net;
using SendGrid;
using System.Configuration;

namespace FinancialPortal
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            try
            {
                var mail = new SendGridMessage()
                {
                    From = new System.Net.Mail.MailAddress("salmohjib@gmail.com"),
                    Subject = message.Subject,
                    Html = message.Body
                };
                mail.AddTo(message.Destination);

                var credentials = new NetworkCredential(
                    ConfigurationManager.AppSettings["mailUser"],
                    ConfigurationManager.AppSettings["mailPassword"]
                    );
                var transport = new Web(credentials);
                transport.Deliver(mail);
            }
            catch (Exception e) { }
            // Plug in your email service here to send an email.
            return Task.FromResult(0);
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser, int>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser, int> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var connection = context.Get<SqlConnection>().As<IUserDataAccess>();
            IUserDataAccess userDataAccess = connection;
            var manager = new ApplicationUserManager(new InsightUserStore(userDataAccess));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser,int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<ApplicationUser,int>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });
            manager.EmailService = new EmailService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
