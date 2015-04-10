angular.module('FinancialPortalApp').controller('transactionsController', ['$timeout', '$scope', '$http', 'authService', 'accountSvc', 'categorySvc', 'transactionSvc', '$state', function ($timeout, $scope, $http, authSvc, accountSvc,categorySvc, transactionSvc, $state) {
    $scope.today = function () {
        $scope.tDate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.tDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.title = {
        transactiontitle: 'Your transactions',
        createtransactiontitle: 'Create a new transaction',
        edittransactiontitle: 'Edit your transaction'
    }
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.userId = authSvc.authentication.UserId;
    $scope.username = authSvc.authentication.Name;
    $scope.ttype = ['Credit', 'Debit']
    $scope.getTransactionsByA = function () {
        transactionSvc.getTransactionsByA($scope.showaccountId).then(function (data) {
            $scope.Transactions = data;
        })
    };
    accountSvc.getAccounts($scope.userHousehold).then(function (data) {
        $scope.accounts = data;
        $scope.showaccountId = $scope.accounts[0].Id;
        $scope.getTransactionsByA();
    })
    $scope.currentTransaction = null;

    
    categorySvc.getCategories($scope.userHousehold).then(function (data) {
        $scope.categories = data;        
    })
    $scope.getTransactionsByC = function () {
        transactionSvc.getTransactionsByC($scope.categoryId).then(function (data) {
            $scope.Transactions = data;
        })
    };
    $scope.getTransactionsByU = function () {
        transactionSvc.getTransactionsByC($scope.userId).then(function (data) {
            $scope.Transactions = data;
        })
    };
    $scope.getTransactionById = function (id) {
        transactionSvc.getTransactionById(id).then(function (data) {
            $scope.showedit = true;
            $scope.editAmount = data.Amount;
            $scope.editRAmount = data.ReconciledAmount;
            console.log($scope.editAmount);
            console.log($scope.editRAmount);
        })
    };
    $scope.deleteTransaction = function (id) {
        transactionSvc.deleteTransaction(id).then
            ($state.reload('Accounts'))
    };
    $scope.geteditTransaction = function (index) {
        $scope.selectedIndex = index;
        $scope.selectedTransaction = angular.copy($scope.Transactions[index]);
        $scope.showedit = true;
    };
    $scope.accountId = '';
    $scope.amount = '';
    $scope.tDate = '';
    $scope.updated = new Date();
    $scope.createTransaction = function () {
        $scope.categoryId = $scope.selectedc.Id;
        $scope.category = $scope.selectedc.Name;
        transactionSvc.createTransaction($scope.accountId, $scope.amount, $scope.tDate, $scope.description, $scope.updated, $scope.userId, $scope.username, $scope.categoryId, $scope.category, $scope.reconciled, $scope.type, $scope.userHousehold).then
            ($state.reload('Accounts'))
    };
    $scope.hideEdit = function () {
        $scope.showedit = false;
    }
    $scope.showCreate = function () {
        $scope.showcreate = true;
    }
    $scope.hideCreate = function () {
        $scope.showcreate = false;
    }
    $scope.editTransaction = function () {

        for (var key in $scope.categories)
        {
            if ($scope.categories[key].Id == $scope.selectedTransaction.CategoryId)
                $scope.selectedTransaction.CategoryName = $scope.categories[key].Name;
        }
        if ($scope.editAmount != $scope.selectedTransaction.Amount) {
            if ($scope.selectedTransaction.Type == 'Credit')
                for (var key in $scope.accounts) {
                    if ($scope.accounts[key].Id == $scope.selectedTransaction.AccountId) {
                        $scope.accounts[key].Balance = Number($scope.accounts[key].Balance) - Number($scope.editAmount) + Number($scope.selectedTransaction.Amount);
                        accountSvc.editAccount($scope.accounts[key].Id, $scope.accounts[key].Name, $scope.accounts[key].Balance, $scope.accounts[key].ReconciledBalance, $scope.userHousehold);
                    }
                }
            else
                for (var key in $scope.accounts) {
                    if ($scope.accounts[key].Id == $scope.selectedTransaction.AccountId) {
                        $scope.accounts[key].Balance = Number($scope.accounts[key].Balance) + Number($scope.editAmount) - Number($scope.selectedTransaction.Amount);
                        accountSvc.editAccount($scope.accounts[key].Id, $scope.accounts[key].Name, $scope.accounts[key].Balance, $scope.accounts[key].ReconciledBalance, $scope.userHousehold);
                    }
                }
        }
        if ($scope.editRAmount != $scope.selectedTransaction.ReconciledAmount) {
            if ($scope.selectedTransaction.Type == 'Credit')
                for (var key in $scope.accounts) {
                    if ($scope.accounts[key].Id == $scope.selectedTransaction.AccountId) {
                        $scope.accounts[key].ReconciledBalance = Number($scope.accounts[key].ReconciledBalance) - Number($scope.editRAmount) + Number($scope.selectedTransaction.ReconciledAmount);
                        accountSvc.editAccount($scope.accounts[key].Id, $scope.accounts[key].Name, $scope.accounts[key].Balance, $scope.accounts[key].ReconciledBalance, $scope.userHousehold);
                    }
                }
            else
                for (var key in $scope.accounts) {
                    if ($scope.accounts[key].Id == $scope.selectedTransaction.AccountId) {
                        $scope.accounts[key].ReconciledBalance = Number($scope.accounts[key].ReconciledBalance) + Number($scope.editRAmount) - Number($scope.selectedTransaction.ReconciledAmount);
                        accountSvc.editAccount($scope.accounts[key].Id, $scope.accounts[key].Name, $scope.accounts[key].Balance, $scope.accounts[key].ReconciledBalance, $scope.userHousehold);
                    }
                }
        }
        $scope.selectedTransaction.Updated = $scope.updated;
        $scope.selectedTransaction.UpdatedByUserId = $scope.userId;
        $scope.selectedTransaction.User = $scope.username;
        transactionSvc.editTransaction($scope.selectedTransaction).then(function () {
            angular.copy($scope.selectedTransaction, $scope.Transactions[$scope.selectedIndex]);
            $scope.hideEdit();
            $state.reload('Accounts');
        })
    };
    
}])