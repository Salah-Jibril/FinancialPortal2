angular.module('FinancialPortalApp').controller('dashboardController', ['$scope', '$state', 'authService', 'accountSvc', '$stateParams', function ($scope, $state, authSvc, accountSvc, $stateParams) {
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.accounts = [];
    $scope.getAccounts = function () {
        accountSvc.getAccounts($scope.userHousehold).then(function (data) {
            $scope.accounts = data;
        })
    };
    $scope.getAccounts();
}]);
