CREATE TABLE [dbo].[BudgetItems]
(
	[Id] [int] IDENTITY NOT NULL,
	[Household] uniqueidentifier NOT NULL,
	[CategoryId] [int] NOT NULL,
	[Amount] money NOT NULL,
	[Description] [nvarchar] (128) NOT NULL,
	[BudgetType] [nvarchar] (128) NOT NULL,
	[Category] [nvarchar] (128) NOT NULL
)
GO

ALTER TABLE [dbo].[BudgetItems]
ADD CONSTRAINT [PK_dbo.BudgetItems] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)
GO

ALTER TABLE [dbo].[BudgetItems]  
WITH CHECK ADD  CONSTRAINT [FK_dbo.Invitations_Security.Users_CategoryId] 
FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO

ALTER TABLE [dbo].[BudgetItems]
ADD CONSTRAINT chk_BudgetItems 
CHECK (dbo.IsValidHousehold(Household) = 1)
GO

AUTOPROC Insert,Select,Update,Delete [dbo].[BudgetItems]
GO