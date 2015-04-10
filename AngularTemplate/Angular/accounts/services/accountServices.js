angular.module('FinancialPortalApp').factory('accountSvc', ['$http', function ($http) {
    var factory = {};

    //gets all accounts that are under the same household
    factory.getAccounts = function (userHousehold) {
        var options = { params: { household: userHousehold } };
        return $http.get('/api/FinancialAccount/getByHousehold', options)            
            .then(function (response) { return response.data; });
    }

    //Gets your account to edit the properties by using it's id to find it
    factory.getEditAccount = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/FinancialAccount/getedit', options)
            .then(function (response) { return response.data })
    }

    // Gets an account for deletion
    // passes the account id and has that account deleted
    factory.deleteAccount = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/FinancialAccount/delete', options);
    }

    // Posts new account information and passes it to the api controller
    // the response doesn't return anything
    factory.createAccount = function (name, balance, rbalance, userHousehold) {
        return $http.post('/api/FinancialAccount/create', { Name: name, Balance: balance,Household: userHousehold, ReconciledBalance: rbalance  })
            .then(function (response) { return response.data; });
    }

    // Posts edits for an account
    // make changes to the account and pass in the new parameters
    factory.editAccount = function (id, name, balance, rbalance, userHousehold) {
        return $http.post('/api/FinancialAccount/edit', { Id: id, Name: name, Balance: balance, Household: userHousehold, ReconciledBalance: rbalance })
            .then(function (response) { return response.data; });
    }
    return factory;
}]);