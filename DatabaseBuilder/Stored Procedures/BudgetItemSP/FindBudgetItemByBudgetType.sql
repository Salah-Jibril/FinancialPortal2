CREATE PROCEDURE [dbo].[FindBudgetItemsByBudgetType]
	@budgettype [nvarchar] (128),
	@household uniqueidentifier
AS
SELECT * FROM [dbo].[BudgetItems]
WHERE BudgetType = @budgettype AND Household = @household