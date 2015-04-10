(function () {
    'use strict';
    angular.module('FinancialPortalApp').factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

        var serviceBase = '/';
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            username: "",
            Name: "",
            token: "",
            Household: "",
            UserId: ""
        };

        var _register = function (registration) {

            _logOut();

            return $http.post('/api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _joinregister = function (joinregistration) {

            _logOut();

            return $http.post('/api/account/joinregister', joinregistration).then(function (response) {
                return response;
            });

        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                _authentication.isAuth = true;
                _authentication.username = response.userName;
                _authentication.Name = response.Name;
                _authentication.token = response.access_token;
                _authentication.Household = response.Household;
                _authentication.UserId = response.UserId;
                localStorageService.set('authorizationData', _authentication);

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.Name = "";
            _authentication.claims = null;
            _authentication.token = "";
            _authentication.Household = null;
            _authentication.UserId = null;

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.username = authData.userName;
                _authentication.Name = authData.Name;
                _authentication.token = authData.token;
                _authentication.Household = authData.Household;
                _authentication.UserId = authData.UserId;
            }

        };

        var _changePassword = function (changePassworddata) {
            return $http.post('/api/account/changepassword', changePassworddata)
                .then(function (response) { return response.data; })
        };

        var _getconfirmEmail = function (confirmationEmail) {
            return $http.post('api/account/resendconfirmation', confirmationEmail)
                .then(function (response) { return response.data; })
        };

        var _confirmEmail = function (confirmEmaildata) {
            return $http.post('/api/account/confirmemail', confirmEmaildata)
                .then(function (response) { return response.data; })
        };

        var _forgotEmail = function (forgotEmailData) {
            return $http.post('/api/account/forgotpassword', forgotEmailData)
                .then(function (response) { return response.data; })
        };

        var _resetPassword = function (resetPasswordData) {
            return $http.post('api/account/resetpassword', resetPasswordData)
                .then(function (response) { return response.data; })
        };

        authServiceFactory.register = _register;
        authServiceFactory.joinregister = _joinregister;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.changePassword = _changePassword;
        authServiceFactory.resendConfirmation = _getconfirmEmail;
        authServiceFactory.confirmEmail = _confirmEmail;
        authServiceFactory.forgotPassword = _forgotEmail;
        authServiceFactory.resetPassword = _resetPassword;

        return authServiceFactory;
    }]);


})();