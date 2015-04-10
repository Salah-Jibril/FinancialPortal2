CREATE PROCEDURE [dbo].[FindTransactionsByAccountId]
	@accountid int
AS
SELECT t.*, c.Name as CategoryName FROM [dbo].[Transactions] t JOIN [dbo].[Categories] c ON t.CategoryId = c.Id
WHERE AccountId = @accountid