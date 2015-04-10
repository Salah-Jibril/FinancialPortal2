CREATE PROCEDURE [dbo].[FindInvitationsByHousehold]
	@household uniqueidentifier
AS
SELECT i.*, u.Name as UserName FROM [dbo].[Invitations] i JOIN [Security].[Users] u ON i.FromUserId = u.Id
WHERE i.Household = @household