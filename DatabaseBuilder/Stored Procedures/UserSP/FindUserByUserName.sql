CREATE PROCEDURE [Security].[FindUserByUserName]
	@username nvarchar(128)
AS
SELECT * FROM [Security].[Users]
WHERE UserName = @username