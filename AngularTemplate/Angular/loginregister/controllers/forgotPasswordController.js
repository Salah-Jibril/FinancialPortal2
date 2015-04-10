angular.module('FinancialPortalApp').controller('forgotPasswordController', ['$scope', '$stateParams', '$location', '$timeout', 'authService', function ($scope, $stateParams, $location, $timeout, authService) {
    $scope.forgotpasswordData = {
        Email: ""
    }
    $scope.message = "Forgot your password? Submit the registered email address and wait for an email to reset your password."
    $scope.forgotpassword = function () {
        authService.forgotPassword($scope.forgotpasswordData).then(function (response) {
            $scope.message = "A reset password link has been sent to your email. Reset your password and login"
            messageDelay(10, redirectCallback);
        },
        function (response) {
            $scope.message = "Request failed for some reason";
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    }

    var ErrorCallback = function () {
        $scope.isError = false;
    }

    var redirectCallback = function () {
        $scope.isError = false;
        $location.path('/dashboard');
    }

    var messageDelay = function (interval, callBack) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            //Anything I need to do
            callBack();
        }, 1000 * interval);
    }
}]);