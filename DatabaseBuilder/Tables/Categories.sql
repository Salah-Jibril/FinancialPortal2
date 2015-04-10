CREATE TABLE [dbo].[Categories]
(
	[Id] [int] IDENTITY NOT NULL,
	[Household] uniqueidentifier NOT NULL,
	[Name] [nvarchar](128) NOT NULL
)
GO

ALTER TABLE [dbo].[Categories]
ADD CONSTRAINT [PK_dbo.Categories] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)
GO


--ALTER TABLE [dbo].[Categories]
--ADD CONSTRAINT chk_Categories 
--CHECK (dbo.IsValidHousehold(Household) = 1)
--GO

AUTOPROC Insert,Select,Update,Delete [dbo].[Categories]
GO