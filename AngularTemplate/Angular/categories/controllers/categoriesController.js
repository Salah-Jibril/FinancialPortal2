angular.module('FinancialPortalApp').controller('categoriesController', ['$scope', '$http', 'authService', 'categorySvc', '$state', function ($scope, $http, authSvc, categorySvc, $state) {
    $scope.title = {
        categorytitle: 'Categories',
        createcategorytitle: 'Create a new category',
        editcategorytitle: 'Edit your category'
    }
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.hideEdit = function () {
        $scope.showedit = false;
    }
    $scope.showCreate = function () {
        $scope.showcreate = true;
    }
    $scope.hideCreate = function () {
        $scope.showcreate = false;
    }
    $scope.geteditCategory = function (id) {
        categorySvc.getEditCategory(id).then(function (data) {
            $scope.showedit = true;
            $scope.editId = data.Id;
            $scope.editName = data.Name;
        })
    };
    $scope.categories = [];
    $scope.getCategories = function () {
        categorySvc.getCategories($scope.userHousehold).then(function (data) {
            console.log(data);
            $scope.categories = data;
            $scope.showcat = true;
            $scope.showcreate = false;
            if ($scope.categories.length == 0) {
                $scope.showcat = false;
                $scope.showcreate = true;
            }
        })
    };
    $scope.getCategories();
    $scope.deleteCategory = function (id) {
        categorySvc.deleteCategory(id).then
            ($state.reload('Transactions'))
    };
    $scope.categoryName = '';
    $scope.createCategory = function () {
        categorySvc.createCategory($scope.categoryName, $scope.userHousehold).then
            ($state.reload('Transactions'))
    };
    $scope.editCategory = function () {
        categorySvc.editCategory($scope.editId, $scope.editName, $scope.userHousehold).then
            ($state.reload('Transactions'))
    };
}])