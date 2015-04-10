angular.module('FinancialPortalApp').directive('transactiontable', ['$timeout', 'transactionSvc', 'accountSvc', 'authService', function ($timeout, transactionSvc, accountSvc, authSvc) {
    return {
        restrict: 'E',
        templateUrl: '/Angular/transactions/views/TableTemplate.html',
        link: function ($scope, element, attrs, ctrl) {
            $scope.userHousehold = authSvc.authentication.Household;
            console.log($scope.userHousehold);
            $scope.getTransactionsByH = function () {
                transactionSvc.getTransactionsByH($scope.userHousehold).then(function (data) {
                    console.log(data);
                    $scope.Transactions = data;
                }).then(function () {
                    $timeout(function () {
                        $('.transactiontable').dataTable({
                            "aoColumnDefs": [
                              { "asSorting": ["desc"], "aTargets": [3] }
                            ]
                        });
                    }, 0)
                })
            };
            $scope.getTransactionsByH();
        }
    }
}]);