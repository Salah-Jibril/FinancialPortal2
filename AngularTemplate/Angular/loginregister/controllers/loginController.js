angular.module('FinancialPortalApp').controller('loginController', ['$scope', '$location', 'authService', '$timeout', function ($scope, $location, authService, $timeout) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "Login to your account";
    $scope.isError = false;

    $scope.guestlogin = function () {
        $scope.loginData = {
            userName: "guest@guestmail.com",
            password: "Password-guest1"
        };
        authService.login($scope.loginData).then(function (response) {
            $location.path('/SalahFinancialPortal');
        },
         function (err) {
             $scope.message = err.error_description;
             $scope.isError = true;
             messageDelay(1, loginErrorCallback);
         });
    };

    $scope.login = function () {
        
        authService.login($scope.loginData).then(function (response) {

            $location.path('/SalahFinancialPortal');

        },
         function (err) {
             $scope.message = err.error_description;
             $scope.isError = true;
             messageDelay(1, loginErrorCallback);
         });
    };

    //Turn this into a directive

    var messageDelay = function (interval, callBack) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            //Anything I need to do
            callBack();
        }, 1000 * interval);
    }

    var loginErrorCallback = function () {
        $scope.message = 'Login to your account';
        $scope.isError = false;
    }

}]);