angular.module('FinancialPortalApp').controller('resetPasswordController', ['$scope', '$stateParams', '$location', '$timeout', 'authService', function ($scope, $stateParams, $location, $timeout, authService) {
    $scope.resetpasswordData = {
        userId: $stateParams.UserId,
        Code: $stateParams.Code,
        Password: "",
        ConfirmPassword: "",
        message: "Reset your password"
    }
    $scope.resetpassword = function () {
        authService.resetPassword($scope.resetpasswordData).then(function (response) {
            $scope.resetpasswordData.message = "Your password has been successfully reset"
            messageDelay(10, redirectCallback);
        },
        function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "Failed to reset your password due to:" + errors.join(' ');
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