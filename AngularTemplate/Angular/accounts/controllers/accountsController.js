angular.module('FinancialPortalApp').controller('accountsController', ['$scope', '$http', 'authService', 'accountSvc', '$state', function ($scope, $http, authSvc, accountSvc, $state) {
    $scope.title = {
        accounttitle: 'Your accounts',
        createaccounttitle: 'Create a new account',
        editaccounttitle: 'Edit your account'
    }
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.accounts = [];
    $scope.getAccounts = function () {
        accountSvc.getAccounts($scope.userHousehold).then(function (data) {
            $scope.accounts = data;
        })
    };
    $scope.myData = [
   {
       "firstName": "Cox",
       "lastName": "Carney",
       "company": "Enormo",
       "employed": true
   },
   {
       "firstName": "Lorraine",
       "lastName": "Wise",
       "company": "Comveyer",
       "employed": false
   },
   {
       "firstName": "Nancy",
       "lastName": "Waters",
       "company": "Fuelton",
       "employed": false
   }
    ];
    $scope.getAccounts();
    $scope.geteditAccount = function (id) {
        accountSvc.getEditAccount(id).then(function (data) {
            $scope.showedit = true;
            $scope.editId = data.Id;
            $scope.editName = data.Name;
            $scope.editBalance = data.Balance;
            $scope.editRBalance = data.ReconciledBalance;
        })
    };
    $scope.hideEdit = function () {
        $scope.showedit = false;
    }
    $scope.showCreateA = function () {
        $scope.showcreateA = true;
    }
    $scope.hideCreateA = function () {
        $scope.showcreateA = false;
    }
    $scope.deleteAccount = function (id) {
        accountSvc.deleteAccount(id).then
            ($state.reload('Accounts'))
    };
    $scope.accountName = '';
    $scope.accountBalance = 0;
    $scope.accountRBalance = 0;    
    $scope.createAccount = function () {
        accountSvc.createAccount($scope.accountName, $scope.accountBalance, $scope.accountRBalance, $scope.userHousehold).then
            ($state.reload('Accounts'))
    };
    $scope.editAccount = function () {
        accountSvc.editAccount($scope.editId, $scope.editName, $scope.editBalance, $scope.editRBalance, $scope.userHousehold).then
            ($state.reload('Accounts'))
    };
}])