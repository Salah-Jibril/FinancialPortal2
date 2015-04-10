angular.module('FinancialPortalApp').controller('sendConfirmationController', ['$scope', '$stateParams', '$location', '$timeout', 'authService', function ($scope, $stateParams, $location, $timeout, authService) {
    $scope.confirmemailData = {
        Email: "",
    }
    $scope.message = "Confirm your email"
    $scope.sendconfirmemail = function () {
        authService.resendConfirmation($scope.confirmemailData).then(function (response) {
            $scope.message = "A confirmation code has been sent to your email. Please follow the link in that email to confirm.";
            messageDelay(5, redirectCallback);
        },
        function (response) {
            $scope.message = "Failed to send confirmation email";
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