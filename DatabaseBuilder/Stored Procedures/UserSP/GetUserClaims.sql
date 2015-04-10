CREATE PROCEDURE [Security].[GetUserClaims]
@userId int
AS
SELECT *
FROM Security.userclaims WHERE userID=@userId