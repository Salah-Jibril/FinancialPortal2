CREATE PROCEDURE [dbo].[getTandBByCategoryId]
	@household uniqueidentifier
AS
SELECT c.Name, Sum(t.Amount) as TAmount, Sum(b.Amount) as BAmount
	FROM ([dbo].[Categories] c JOIN [dbo].[Transactions] t ON t.CategoryId = c.Id) 
		JOIN [dbo].[BudgetItems] b ON b.CategoryId = c.Id	
WHERE c.Household = @household
Group By c.Name 