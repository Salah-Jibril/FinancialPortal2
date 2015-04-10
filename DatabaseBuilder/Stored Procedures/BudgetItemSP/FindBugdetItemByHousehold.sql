CREATE PROCEDURE [dbo].[FindBudgetItemsByHousehold]
	@household uniqueidentifier
AS
SELECT * FROM [dbo].[BudgetItems]
WHERE Household = @household