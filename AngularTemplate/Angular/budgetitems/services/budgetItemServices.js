angular.module('FinancialPortalApp').factory('budgetItemSvc', ['$http', function ($http) {
    var factory = {};

    //gets all accounts that are under the same household
    factory.getBudgetItemsByH = function (userHousehold) {
        var options = { params: { household: userHousehold } };
        return $http.get('/api/BudgetItem/getByHousehold', options)
            .then(function (response) { return response.data; });
    }

    //gets all accounts that are under the same household
    factory.getBudgetItemsByC = function (CategoryId) {
        var options = { params: { CategoryId: CategoryId } };
        return $http.get('/api/BudgetItem/getByCategory', options)
            .then(function (response) { return response.data; });
    }

    //gets all accounts that are the same type
    factory.getBudgetItemsByBT = function (budgetType, household) {
        var options = { params: { budgetType: budgetType, houseHold: household } };
        return $http.get('/api/BudgetItem/getByType', options)
            .then(function (response) { return response.data; });
    }

    //Gets your account to edit the properties by using it's id to find it
    factory.getEditBudgetItem = function (budgetitemId) {
        var options = { params: { budgetitemId: budgetitemId } };
        return $http.get('/api/BudgetItem/getedit', options)
            .then(function (response) { return response.data })
    }

    // Gets an account for deletion
    // passes the account id and has that account deleted
    factory.deleteBudgetItem = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/BudgetItem/delete', options);
    }

    // Posts new account information and passes it to the api controller
    // the response doesn't return anything
    factory.createBudgetItem = function (userHousehold, category, catagoryId, amount, description, budgetType) {
        return $http.post('/api/BudgetItem/create', { Household: userHousehold, Category: category, CategoryId: catagoryId, Amount: amount, Description: description, BudgetType: budgetType })
            .then(function (response) { return response.data; });
    }

    // Posts edits for an account
    // make changes to the account and pass in the new parameters
    factory.editBudgetItem = function (id, userHousehold, category, catagoryId, amount, description, budgetType) {
        return $http.post('/api/BudgetItem/edit', { Id: id, Household: userHousehold, Category: category, CategoryId: catagoryId, Amount: amount, Description: description, BudgetType: budgetType })
            .then(function (response) { return response.data; });
    }
    return factory;
}]);