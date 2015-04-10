CREATE PROCEDURE [dbo].[FindBudgetItemById]
	@budgetitemid int
AS
SELECT * FROM [dbo].[BudgetItems]
WHERE Id = @budgetitemid