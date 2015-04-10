CREATE PROCEDURE [Security].[RemveUserFromRole]
@userId int, @role nvarchar(50)
AS


DELETE ur FROM [Security].[UserRoles] ur
JOIN [Security].[Roles] r on r.Id = ur.RoleId 
WHERE r.[Name] = @role AND ur.UserId = @UserId

/*this is a comment*/

SELECT convert(BIT, CASE @@ROWCOUNT
			WHEN 0 THEN 0
			ELSE 1
			END)