CREATE PROCEDURE [dbo].[FindAccountsWTByHousehold]
	@household uniqueidentifier
AS

SELECT a.Name, Sum(t.Amount) as Amount, Sum(t.ReconciledAmount) as ReconciledAmount FROM [dbo].[Accounts] a JOIN [dbo].[Transactions] t ON t.AccountId = a.Id 
WHERE a.Household = @household
GROUP BY a.Name