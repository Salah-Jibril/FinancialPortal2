angular.module('FinancialPortalApp').controller('manageController', ['$scope', '$stateParams', '$location', '$timeout', 'authService', function ($scope, $stateParams, $location, $timeout, authService) {
    $scope.confirmemailData = {
        Email: "",
        message: "Confirm your email"
    }
    $scope.sendconfirmemail = function () {
        authService.resendConfirmation($scope.confirmemailData).then(function (response) {
            $scope.confirmemailData.message = "A confirmation code has been sent to your email. Please follow the link in that email to confirm.";
            messageDelay(5, redirectCallback);
        },
        function (response) {
            $scope.confirmemailData.message = "Failed to send confirmation email";
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    }
    $scope.confirmData = {
        Id: $stateParams.userId,
        code: $stateParams.code,
        message: ""
    }
    $scope.confirmemail = function () {
        authService.confirmEmail($scope.confirmData).then(function (response) {
            $scope.confirmData.message = "Thank you for confirming your email address";
            messageDelay(10, redirectCallback);
        },
        function (response) {
            $scope.confirmData.message = "Failed to confirm your email";
            $scope.isError = true;
        });
    }
    $scope.changepassworddata = {
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
    }
    $scope.message = "Change your password"
    $scope.changepassword = function () {
        authService.changePassword($scope.changepassworddata).then(function (response) {
            $scope.message = "Your password has been successfully changed";
            messageDelay(5, redirectCallback);            
        },
        function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "Failed to change your password due to:" + errors.join(' ');
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    }
    $scope.forgotpasswordData = {
        Email: "",
        message:"Forgot your password? Submit the registered email address and wait for an email to reset your password."
    }
    $scope.forgotpassword = function () {
        authService.forgotPassword($scope.forgotpasswordData).then(function (response) {
            $scope.forgotpasswordData.message = "A reset password link has been sent to your email. Reset your password and login"
            messageDelay(10, redirectCallback);
        },
        function (response) {
            $scope.message = "Request failed for some reason";
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    }
    $scope.resetpasswordData = {
        userId : $stateParams.userId,
        Code: $stateParams.code,
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
}]).directive('changepasswordVerify', function () {
    return {
        templateUrl: '/Angular/loginregister/views/changepasswordVerifyTemplate.html',
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model
            // watch own value and re-validate on change
            scope.$watch('changepassworddata.NewPassword', function () {
                validate();
            });

            // observe the other value and re-validate on change
            scope.$watch('changepassworddata.ConfirmPassword', function (val) {
                validate();
            });

            var validate = function () {
                var val1 = scope.changepassworddata.NewPassword;
                var val2 = scope.changepassworddata.ConfirmPassword;
                // set validity
                ngModel.$setValidity('changepasswordVerify', val1 === val2);
            };
        }
    }
});

angular.module('FinancialPortalApp').directive('resetpasswordVerify', function () {
    return {
        templateUrl: '/Angular/loginregister/views/resetPasswordTemplate.html',
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model
            // watch own value and re-validate on change
            scope.$watch('resetpasswordData.Password', function () {
                validate();
            });

            // observe the other value and re-validate on change
            scope.$watch('resetpasswordData.ConfirmPassword', function (val) {
                validate();
            });

            var validate = function () {
                var val1 = scope.resetpasswordData.Password;
                var val2 = scope.resetpasswordData.ConfirmPassword;
                // set validity
                ngModel.$setValidity('resetpasswordVerify', val1 === val2);
            };
        }
    }
});