﻿CREATE PROCEDURE [Security].[IsUserInRole]
@userId int, @role nvarchar(50)
AS

SELECT cast(
	(CASE 
		WHEN EXISTS(
			SELECT NULL
			FROM [Security].[UserRoles] ur
			INNER JOIN [Security].[Roles] r ON r.[Id] = ur.[RoleId]
			WHERE (ur.[UserId] = @userId) AND (r.[Name] = @role)
			) THEN 1
		ELSE 0
	END) as bit)