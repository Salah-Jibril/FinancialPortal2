angular.module('FinancialPortalApp').factory('invitationSvc', ['$http', function ($http) {
    var factory = {};

    //gets all accounts that are under the same household
    factory.getInvitations = function (userHousehold) {
        var options = { params: { household: userHousehold } };
        return $http.get('/api/Invitation/getByHousehold', options)
            .then(function (response) { return response.data; });
    }

    // Gets an account for deletion
    // passes the account id and has that account deleted
    factory.deleteInvitation = function (id) {
        var options = { params: { id: id } };
        return $http.get('/api/Invitation/delete', options);
    }

    // Posts new account information and passes it to the api controller
    // the response doesn't return anything
    factory.createInvitation = function (invitationItem) {
        return $http.post('/api/Invitation/create', invitationItem)
            .then(function (response) { return response.data; });
    }

    //post to send an email invite to a customer
    factory.sendInvite = function (inviteInfo) {
        return $http.post('/api/account/sendinvite', inviteInfo)
            .then(function (response) { return response.data; });
    }

    factory.leaveHousehold = function (UserId) {
        return $http.get('/api/account/deleteuser', { params: { UserId: UserId } })
            .then(function (response) { return response.data; });
    }
    return factory;
}]);