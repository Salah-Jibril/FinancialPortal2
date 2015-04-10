CREATE PROCEDURE [dbo].[FindBudgetItemsByCategoryId]
	@categoryid int
AS
SELECT * FROM [dbo].[BudgetItems]
WHERE CategoryId = @categoryid