angular.module('FinancialPortalApp').controller('budgetItemsController', ['$scope', '$http', 'authService', 'budgetItemSvc', 'categorySvc', '$state', function ($scope, $http, authSvc, budgetItemSvc, categorySvc, $state) {
    $scope.title = {
        budgetitemtitleI: 'Your Income Budgets',
        budgetitemtitleE: 'Your Expense Budgets',
        createbudgetitemtitle: 'Create a new Budget Item',
        editbudgetitemtitle: 'Edit your Budget Item'
    }
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.categoryList = function () {
        categorySvc.getCategories($scope.userHousehold).then(function (data) {
            $scope.categories = data;
        })
    };
    $scope.categoryList();
    $scope.budgettypes = ['Income','Expense'];
    $scope.geteditBudgetItem = function (id) {
        budgetItemSvc.getEditBudgetItem(id).then(function (data) {
            $scope.showedit = true;
            $scope.editId = data.Id;
            $scope.editAmount = data.Amount;
            $scope.editCategory = data.Category;
            $scope.editCategoryId = data.CategoryId;
            $scope.editBudgetType = data.BudgetType;
            $scope.editDescription = data.Description;
            for (var key in $scope.categories) {
                if ($scope.categories[key].Id == data.CategoryId) {
                    $scope.selectedCategory = $scope.categories[key];
                }
            }
        })
    };
    $scope.incomebudgets = [];
    $scope.getBudgetItemsByBTI = function () {
        budgetItemSvc.getBudgetItemsByBT('Income', $scope.userHousehold).then(function (data) {
            $scope.incomebudgets = data;
        })
    };
    $scope.getBudgetItemsByBTI();
    $scope.expensebudgets = [];
    $scope.getBudgetItemsByBTE = function () {
        budgetItemSvc.getBudgetItemsByBT('Expense', $scope.userHousehold).then(function (data) {
            $scope.expensebudgets = data;
        })
    };
    $scope.getBudgetItemsByBTE();
    $scope.budgets = [];
    $scope.getBudgetItemsByH = function () {
        budgetItemSvc.getBudgetItemsByH($scope.userHousehold).then(function (data) {
            $scope.budgets = data;
        })
    };
    $scope.getBudgetItemsByH();
    $scope.deleteBudgetItem = function (id) {
        budgetItemSvc.deleteBudgetItem(id).then
            ($state.reload('Budgets'))
    };
    
    $scope.budgetType = '';
    $scope.amount = '';
    $scope.description = '';
    $scope.period = 1;
    $scope.createBudgetItem = function () {
        console.log($scope.period);
        $scope.budgetCategoryId = $scope.selectedCategory.Id;
        $scope.budgetCategory = $scope.selectedCategory.Name;
        budgetItemSvc.createBudgetItem($scope.userHousehold, $scope.budgetCategory, $scope.budgetCategoryId, $scope.amount*$scope.period, $scope.description, $scope.budgetType ).then
            ($state.reload('Budgets'))
    };
    $scope.editBudgetItem = function () {
        $scope.editCategoryId = $scope.selectedCategory.Id;
        $scope.editCategory = $scope.selectedCategory.Name;
        budgetItemSvc.editBudgetItem($scope.editId, $scope.userHousehold, $scope.editCategory, $scope.editCategoryId, $scope.editAmount * $scope.period, $scope.editDescription, $scope.editBudgetType).then
            ($state.reload('Budgets'))
    };
    $scope.hideEdit = function () {
        $scope.showedit = false;
    }
    $scope.showCreate = function () {
        $scope.showcreate = true;
    }
    $scope.hideCreate = function () {
        $scope.showcreate = false;
    }
}])