CREATE PROCEDURE [Security].[GetRolesForUser]
@userId int
AS
SELECT *
FROM Security.userroles WHERE userID=@userId