angular.module('FinancialPortalApp').factory('transactionSvc', ['$http', function ($http) {
    var factory = {};

    // Gets all transactions that were updated by a user
    factory.getTransactionsByU = function (userId) {
        var options = { params: { userId: userId } };
        return $http.get('/api/Transactions/getByUser', options)
            .then(function (response) { return response.data; });
    }

    // Gets all transactions that are under the same category
    factory.getTransactionsByC = function (categoryId) {
        var options = { params: { categoryId: categoryId } };
        return $http.get('/api/Transactions/getByCategory', options)
            .then(function (response) { return response.data; });
    }

    // Gets all transactions that are under the same account
    factory.getTransactionsByA = function (accountId) {
        var options = { params: { accountId: accountId } };
        return $http.get('/api/Transactions/getByAccount', options)
            .then(function (response) { return response.data; });
    }

    // Gets all transactions that are under the same household
    factory.getTransactionsByH = function (household) {
        var options = { params: { household: household } };
        return $http.get('/api/Transactions/getByHousehold', options)
            .then(function (response) { return response.data; });
    }

    //Gets your account to edit the properties by using it's id to find it
    factory.getTransactionById = function (transactionId) {
        var options = { params: { transactionId: transactionId } };
        return $http.get('/api/Transactions/getedit', options)
            .then(function (response) { return response.data; });
    }

    // Gets a transaction for deletion
    // passes the transaction id and has that transaction deleted
    factory.deleteTransaction = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/Transactions/delete', options);
    }

    // Posts a new transaction and passes it to the api controller
    // the response doesn't return anything
    factory.createTransaction = function (accountId, amount, date, description, updated, updatedByUserId, user, categoryId, category, reconciled, type, household) {
        return $http.post('/api/Transactions/create', {
            AccountId: accountId, Amount: amount, Date: date, Description: description, Updated: updated, UpdatedByUserId: updatedByUserId,
             User: user, CategoryId: categoryId, Category: category, ReconciledAmount: reconciled, Type: type, Household: household
        }).then(function (response) { return response.data; });
    }

    // Posts edits for a transaction
    // make changes to the transaction and pass in the new parameters
    factory.editTransaction = function (transaction) {
        return $http.post('/api/Transactions/edit', transaction );
    }
    return factory;
}]);