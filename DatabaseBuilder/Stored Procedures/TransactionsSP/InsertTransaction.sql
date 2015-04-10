CREATE PROCEDURE [dbo].[InsertTransaction]
(
	@Id int,
	@AccountId int,
	@Amount money,
	@Date datetimeoffset,
	@Description nvarchar(128) = NULL,
	@Updated datetimeoffset,
	@UpdatedByUserId int,
	@CategoryId int,
	@User nvarchar(128),
	@Type nvarchar(128),
	@ReconciledAmount int = NULL
)
AS

INSERT INTO [dbo].[Transactions]
(
	[Id],
	[AccountId],
	[Amount],
	[Date],
	[Description],
	[Updated],
	[UpdatedByUserId],
	[CategoryId],
	[User],
	[Type],
	[ReconciledAmount]
)
VALUES
(
	@Id,
	@AccountId,
	@Amount,
	@Date,
	@Description,
	@Updated,
	@UpdatedByUserId,
	@CategoryId,
	@User,
	@Type,
	@ReconciledAmount
)

IF @Type = 'Credit' 
	UPDATE [dbo].[Accounts] SET a.Balance += @Amount, a.ReconciledBalance += @ReconciledAmount FROM [dbo].[Accounts] a WHERE a.Id = @AccountId
Else 
	UPDATE [dbo].[Accounts] SET a.Balance -= @Amount, a.ReconciledBalance -= @ReconciledAmount FROM [dbo].[Accounts] a WHERE a.Id = @AccountId
