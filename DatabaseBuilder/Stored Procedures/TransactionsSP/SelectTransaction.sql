CREATE PROCEDURE [dbo].[SelectTransaction]
(
	@Id int
)
AS
SELECT t.*, c.Name as CategoryName FROM [dbo].[Transactions] t JOIN [dbo].[Categories] c ON t.CategoryId = c.Id WHERE 
	t.[Id]=@Id



--CREATE PROCEDURE UpdateTransaction
--(
--PARAMS
--)
--AS
--BEGIN

--DECLARE @PrevAmount  int
--SET @PrevAmount = (SELECT TOP 1 Balance FROM Transactions WHERE Id = @Id)
--DECLARE @IsDeposit bit
--SET @IsDeposit = (SELECT TOP 1 IsDeposit FROM Transactions WHERE Id = @Id)


--UPDATE TRANSACTION


--IF @IsDeposit = 1 
--BEGIN
--UPDATE ACCOUNT with difference
--END
--ELSE
--BEGIN
--UPDATE ACCOUNT with difference 
--END

--END