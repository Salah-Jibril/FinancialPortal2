CREATE PROCEDURE [Security].[GetLoginsForUser]
@userId int
AS
SELECT *
FROM Security.userlogins WHERE userID=@userId