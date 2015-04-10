CREATE PROCEDURE [dbo].[FindTransactionsByCategoryId]
	@categoryid int
AS
SELECT t.*, c.Name as CategoryName FROM [dbo].[Transactions] t JOIN [dbo].[Categories] c ON t.CategoryId = c.Id 
WHERE CategoryId = @categoryid