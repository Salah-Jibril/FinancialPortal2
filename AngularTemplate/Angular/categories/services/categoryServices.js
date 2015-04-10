angular.module('FinancialPortalApp').factory('categorySvc', ['$http', function ($http) {
    var factory = {};

    //Gets your category to edit the properties by using it's id to find it
    factory.getEditCategory = function (categoryId) {
        var options = { params: { categoryId: categoryId } };
        return $http.get('/api/Category/getedit', options)
            .then(function (response) { return response.data })
    }

    //gets all categories that are under the same household
    factory.getCategories = function (userHousehold) {
        var options = { params: { household: userHousehold } };
        return $http.get('/api/Category/getByHousehold', options)
            .then(function (response) { return response.data; });
    }

    // Gets an category for deletion
    // passes the category id and has that category deleted
    factory.deleteCategory = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/Category/delete', options);
    }

    // Posts new category information and passes it to the api controller
    // the response doesn't return anything
    factory.createCategory = function (name, userHousehold) {
        return $http.post('/api/Category/create', { Name: name, Household: userHousehold})
            .then(function (response) { return response.data; });
    }

    // Posts edits for an account
    // make changes to the account and pass in the new parameters
    factory.editCategory = function (id, name, userHousehold) {
        return $http.post('/api/Category/edit', { Id: id, Name: name, Household: userHousehold })
            .then(function (response) { return response.data; });
    }
    return factory;
}]);