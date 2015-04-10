angular.module('FinancialPortalApp').factory('dashboardSvc', ['$http', function ($http) {
    var factory = {};

    //gets all accounts that are under the same household
    factory.getChartInfo = function (userHousehold) {
        var options = { params: { household: userHousehold } };
        return $http.get('/api/dashboard/getByHousehold', options)
            .then(function (response) { return response.data; });
    }
    return factory;
}]);