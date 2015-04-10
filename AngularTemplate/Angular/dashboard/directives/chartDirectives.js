angular.module('FinancialPortalApp').directive('chartdirective', ['authService', 'dashboardSvc', function (authSvc, dashboardSvc) {
    return {
        restrict: 'E',
        templateUrl: '/Angular/dashboard/views/chartTemplate.html',
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.userHousehold = authSvc.authentication.Household;
            $scope.getChart = function () {
                var zdata = [];
                for (var key in $scope.chart) {
                    if ($scope.chart[key].Name == '')
                    {
                        if ($scope.chart[key].BAmount == '') { $scope.chart[key].BAmount = 0; }
                        if ($scope.chart[key].TAmount == '') { $scope.chart[key].TAmount = 0; }
                    }
                    zdata.push({ Categories: $scope.chart[key].Name, Budgets: $scope.chart[key].BAmount, Transactions: $scope.chart[key].TAmount })
                };
                var zxkey = 'Categories',
                    zykey = ['Budgets', 'Transactions'],
                    zlabels = ['Budgets', 'Transactions'];
                Morris.Bar({
                    element: element,
                    data: zdata,
                    xkey: zxkey,
                    ykeys: zykey,
                    labels: zlabels
                });
            };
            $scope.zcategory = function () {
                dashboardSvc.getChartInfo($scope.userHousehold).then(function (data) {
                    console.log(data);
                    $scope.chart = data;
                    $scope.getChart();
                })
            };
            $scope.zcategory()
        }
    }
}])