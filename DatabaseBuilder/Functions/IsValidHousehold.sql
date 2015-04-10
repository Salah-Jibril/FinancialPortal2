CREATE FUNCTION [dbo].[IsValidHousehold] (@Household UNIQUEIDENTIFIER) RETURNS bit 
AS
BEGIN
	RETURN 
		CASE WHEN (EXISTS( SELECT Household FROM [Security].[Users] where Household = @Household)) 
			 THEN 1 
			 ELSE 0
			 END;
END
GO