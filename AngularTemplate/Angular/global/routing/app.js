(function () {
    
        app.config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider',
            function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
            // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
            // ------------------------------------------------------------------------------------------------------------
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: '/Angular/loginregister/views/Login.html',
                    data: {
                        Authorize: "Anonymous"
                    }
                })

                .state('register', {
                    url: '/register',
                    templateUrl: '/Angular/loginregister/views/Register.html',
                    data: {
                        Authorize: "Anonymous"
                    }
                })

                .state('dashboard', {
                    url: '/',
                    templateUrl: '/Angular/dashboard/views/dashboard.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('Accounts', {
                    url: '/Accounts',
                    templateUrl: '/Angular/accounts/views/accountsView.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('Transactions', {
                    url: '/Transactions',
                    templateUrl: '/Angular/transactions/views/transactionsView.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('Budgets', {
                    url: '/Budgets',
                    templateUrl: '/Angular/budgetitems/views/budgetsView.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('ChangePassword', {
                    url: '/changePassword',
                    templateUrl: '/Angular/loginregister/views/changePassword.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('Invitations', {
                    url: '/Invitations',
                    templateUrl: '/Angular/invitations/views/invitationView.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('sendConfirmEmail', {
                    url: '/sendConfirmEmail',
                    templateUrl: '/Angular/loginregister/views/sendconfirmEmail.html',
                    data: {
                        Authorize: "All"
                    }
                })

                .state('confirmEmail', {
                    url: '/confirmEmail/:UserId/{Code:/?.*}',
                    templateUrl: '/Angular/loginregister/views/confirmEmail.html',
                    data: {
                        Authorize: "Anonymous"
                    },
                    resolve: {
                        confirmation: ['$stateParams', 'authService', function ($stateParams, authService) {
                            console.log('confirming');

                            return authService.confirmEmail({UserId: $stateParams.UserId, Code: $stateParams.Code}).then(function (response) {
                                return "Thank you for confirming your email address";
                            },
                                function (response) {
                                    return "Failed to confirm your email";
                            });
                        }]
                    },

                    controller: ['$scope', '$stateParams', 'confirmation', function ($scope, $stateParams, confirmation) {
                       
                        $scope.message = confirmation;
                       
                    }]

                })

                .state('joinRegister', {
                    url: '/joinRegister/{household:/?.*}',
                    templateUrl: '/Angular/loginregister/views/joinRegister.html',
                    data: {
                        Authorize: "Anonymous"
                    }
                })

                .state('forgotPassword', {
                    url: '/forgotPassword',
                    templateUrl: '/Angular/loginregister/views/forgotPassword.html',
                    data: {
                        Authorize: "Anonymous"
                    }
                })

                .state('resetPassword', {
                    url: '/resetPassword/:UserId/{Code:/?.*}',
                    templateUrl: '/Angular/loginregister/views/resetPassword.html',
                    data: {
                        Authorize: "Anonymous"
                    }
                })

            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

            $httpProvider.interceptors.push('authInterceptorService');

        }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', 'authService' , function ($templateCache, $rootScope, $state, $stateParams, authService) {
        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        authService.fillAuthData();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //For later improved security
            var authorized = false;

            if (toState.data.Authorize.indexOf("Anonymous") > -1)
                authorized = true
            else {
                if (authService.authentication.isAuth) {

                    if (toState.data.Authorize.indexOf("All") > -1)
                        authorized = true;
                    else {
                        angular.forEach(authService.authentication.Roles, function (value, key) {
                            if (toState.Authorize.data.indexOf(value))
                                authorized = true;
                        });
                    }
                }
            }
            if (authorized == false) {
                event.preventDefault();
                authService.logOut();
                $state.go('login');
            }
        });
    }]);
})();