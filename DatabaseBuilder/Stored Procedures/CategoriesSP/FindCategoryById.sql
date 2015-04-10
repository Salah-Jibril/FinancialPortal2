CREATE PROCEDURE [dbo].[FindCategoryById]
	@categoryid int
AS
SELECT * FROM [dbo].[Categories]
WHERE Id = @categoryid