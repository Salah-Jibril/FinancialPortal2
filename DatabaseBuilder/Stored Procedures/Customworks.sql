--For inserting transaction and affecting accounts

--If @Type = 'Credit'
--	UPDATE [dbo].[Accounts] SET Balance = Balance + @Amount, ReconciledBalance = ReconciledBalance + @ReconciledAmount WHERE Id = @AccountId
--ELSE 
--	UPDATE [dbo].[Accounts] SET Balance = Balance - @Amount, ReconciledBalance = ReconciledBalance - @ReconciledAmount WHERE Id = @AccountId

--For deleting transactions and affecting accounts

--DECLARE @Amount  money
--SET @Amount = (SELECT TOP 1 Amount FROM Transactions WHERE Id = @Id)
--DECLARE @ReconciledAmount  money
--SET @ReconciledAmount = (SELECT TOP 1 ReconciledAmount FROM Transactions WHERE Id = @Id)
--DECLARE @Type nvarchar(128)
--SET @Type = (SELECT TOP 1 [Type] FROM Transactions WHERE Id = @Id)
--DECLARE @AccountId int
--SET @AccountId = (SELECT TOP 1 AccountId FROM Transactions WHERE Id = @Id)

--IF @Type = 'Credit'
--	UPDATE [dbo].[Accounts] SET Balance = Balance - @Amount, ReconciledBalance = ReconciledBalance - @ReconciledAmount WHERE Id= @AccountId
--ELSE
--	UPDATE [dbo].[Accounts] SET Balance = Balance + @Amount, ReconciledBalance = ReconciledBalance + @ReconciledAmount WHERE Id= @AccountId

--For deleting Category
--DELETE FROM [dbo].[Transactions] WHERE [CategoryId] = @Id
--DELETE FROM [dbo].[BudgetItems] WHERE [CategoryId] = @Id

--For deleting account
--DELETE FROM [dbo].[Transactions] WHERE [AccountId] = @Id

--For transaction name
--SELECT t.*, c.Name as CategoryName FROM [dbo].[Transactions] t JOIN [dbo].[Categories] c ON t.CategoryId = c.Id
--WHERE AccountId = @accountid

--For invitation username
--SELECT i.*, u.Name as UserName FROM [dbo].[Invitations] i JOIN [Security].[Users] u ON i.FromUserId = u.Id
--WHERE i.Household = @household