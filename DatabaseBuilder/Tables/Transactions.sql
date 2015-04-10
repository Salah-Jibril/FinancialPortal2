CREATE TABLE [dbo].[Transactions] (
	[Id] [int] IDENTITY NOT NULL,
	[AccountId] [int] NOT NULL,
	[Amount] money NOT NULL,
	[Date] datetimeoffset(7) NOT NULL,
	[Description] [nvarchar](128) NULL,
	[Updated] datetimeoffset(7) NOT NULL,
	[UpdatedByUserId] [int] NOT NULL,
	[User] [nvarchar](128) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[ReconciledAmount] money NOT Null,
	[Type] [nvarchar](128) NOT NULL,
	[Household] uniqueidentifier NOT NULL
)
GO

ALTER TABLE [dbo].[Transactions]
ADD CONSTRAINT [PK_dbo.Transactions] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)
GO

ALTER TABLE [dbo].[Transactions]  
WITH CHECK ADD  CONSTRAINT [FK_dbo.Transactions_Security.Users_UpdatedByUserId] 
FOREIGN KEY([UpdatedByUserId])
REFERENCES [Security].[Users] ([Id])
GO

ALTER TABLE [dbo].[Transactions]  
WITH CHECK ADD  CONSTRAINT [FK_dbo.Transactions_Security.Users_AcountId] 
FOREIGN KEY([AccountId])
REFERENCES [dbo].[Accounts] ([Id])
GO


AUTOPROC Insert [dbo].[Transactions]
GO
AUTOPROC Update [dbo].[Transactions]
GO
AUTOPROC Delete [dbo].[Transactions]
GO