CREATE PROCEDURE [dbo].[FindCategoriesByHousehold]
	@household uniqueidentifier
AS
SELECT * FROM [dbo].[Categories]
WHERE Household = @household