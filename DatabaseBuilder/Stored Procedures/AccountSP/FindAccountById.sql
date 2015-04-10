CREATE PROCEDURE [dbo].[FindAccountById]
	@id int
AS
SELECT * FROM [dbo].[Accounts]
WHERE Id = @id