CREATE TABLE [dbo].[Invitations]
(
	[Id] [int] IDENTITY NOT NULL,
	[FromUserId] [int] NOT NULL,
	[ToEmail] [nvarchar](128) NOT NULL,
	[Household] uniqueidentifier NOT NULL
)
GO

ALTER TABLE [dbo].[Invitations]
ADD CONSTRAINT [PK_dbo.Invitations] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)
GO

ALTER TABLE [dbo].[Invitations]  
WITH CHECK ADD  CONSTRAINT [FK_dbo.Invitations_Security.Users_FromUserId] 
FOREIGN KEY([FromUserId])
REFERENCES [Security].[Users] ([Id])
GO

AUTOPROC Insert,Select,Update,Delete [dbo].[Invitations]
GO