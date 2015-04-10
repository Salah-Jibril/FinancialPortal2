CREATE TABLE [dbo].[Accounts]
(
	[Id] [int] IDENTITY NOT NULL,
	[Household] uniqueidentifier NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Balance] money NOT NULL,
	[ReconciledBalance] money NOT NULL
)
GO

ALTER TABLE [dbo].[Accounts]
ADD CONSTRAINT [PK_dbo.Accounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
GO

--ALTER TABLE [dbo].[Accounts]
--ADD CONSTRAINT chk_Accounts 
--CHECK (dbo.IsValidHousehold(Household) = 1)
--GO

AUTOPROC Insert,Select,Update,Delete [dbo].[Accounts]
GO