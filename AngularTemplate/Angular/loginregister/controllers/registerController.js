angular.module('FinancialPortalApp').controller('registerController', ['$scope', '$stateParams', '$location', '$timeout', 'authService', function ($scope, $stateParams, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "Register a new account";
    $scope.isError = false;

    $scope.registerData = {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    };
    $scope.joinRegisterData = {
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Household: $stateParams.household
    };
    $scope.register = function () {

        authService.register($scope.registerData).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 5 seconds.";
            messageDelay(5, redirectCallback);
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
             $scope.isError = true;
             messageDelay(5, registerErrorCallback);
         });
    };
    $scope.joinregister = function () {

        authService.joinregister($scope.joinRegisterData).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 5 seconds.";
            messageDelay(5, redirectCallback);
        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
             $scope.isError = true;
             messageDelay(5, registerErrorCallback);
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

    var registerErrorCallback = function () {
        $scope.message = "Register a new account";
        $scope.isError = false;
    }

    var redirectCallback = function () {
        $scope.message = "Register a new account";
        $scope.isError = false;
        $location.path('/Login');
    }
}]).directive('passwordVerify', function () {
    return {
        templateUrl: '/Angular/loginregister/views/passwordVerifyTemplate.html',
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model
            // watch own value and re-validate on change
            scope.$watch('registerData.Password', function () {
                validate();
            });

            // observe the other value and re-validate on change
            scope.$watch('registerData.ConfirmPassword', function (val) {
                validate();
            });

            var validate = function () {
                var val1 = scope.registerData.Password;
                var val2 = scope.registerData.ConfirmPassword;
                // set validity
                ngModel.$setValidity('passwordVerify', val1 === val2);
            };
        }
    }
}).directive('joinpasswordVerify', function () {
    return {
        templateUrl: '/Angular/loginregister/views/joinpasswordVerifyTemplate.html',
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model
            // watch own value and re-validate on change
            scope.$watch('joinRegisterData.Password', function () {
                validate();
            });

            // observe the other value and re-validate on change
            scope.$watch('joinRegisterData.ConfirmPassword', function (val) {
                validate();
            });

            var validate = function () {
                var val1 = scope.registerData.Password;
                var val2 = scope.registerData.ConfirmPassword;
                // set validity
                ngModel.$setValidity('joinpasswordVerify', val1 === val2);
            };
        }
    }
});