CREATE PROCEDURE [dbo].[FindTransactionsByUserId]
	@userid int
AS
SELECT t.*, c.Name as CategoryName FROM [dbo].[Transactions] t JOIN [dbo].[Categories] c ON t.CategoryId = c.Id
WHERE UpdatedByUserId = @userid