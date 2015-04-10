(function () {
    angular.module('FinancialPortalApp')
        // Path: /
        .controller('menuController', ['$scope', '$state', '$stateParams', 'authService', function ($scope, $state, $stateParams, authSvc) {            
            $scope.authentication = authSvc.authentication;
            $scope.logout = function () {
                authSvc.logOut();
                $state.go('login');
            }
        }])
})();