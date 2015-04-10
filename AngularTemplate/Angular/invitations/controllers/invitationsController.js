angular.module('FinancialPortalApp').controller('invitationsController', ['$scope', '$http', '$timeout','authService', 'invitationSvc', '$state', function ($scope, $http,$timeout, authSvc, invitationSvc, $state) {
    $scope.title = {
        invitationtitle: 'Your Previous Invites',
        createinvitationtitle: "Send an Invite for others to join your household"
    }
    $scope.userHousehold = authSvc.authentication.Household;
    $scope.leave = true;
    $scope.userId = authSvc.authentication.UserId;
    $scope.invites = [];
    $scope.getInvitations = function () {
        invitationSvc.getInvitations($scope.userHousehold).then(function (data) {
            $scope.invites = data;
        })
    };
    $scope.getInvitations();
    $scope.hideEdit = function () {
        $scope.showedit = false;
    }
    $scope.showCreate = function () {
        $scope.showcreate = true;
    }
    $scope.hideCreate = function () {
        $scope.showcreate = false;
    }
    $scope.showLeave = function () {
        $scope.leave = false;
        $scope.showleave = true;
    }
    $scope.hideLeave = function () {
        $scope.showleave = false;
        $scope.leave = true;
    }
    $scope.deleteInvitation = function (id) {
        invitationSvc.deleteInvitation(id).then
            ($state.reload('Invitations'))
    };
    $scope.invitationItem = {
        FromUserId : $scope.userId,
        ToEmail : "",
        Household : $scope.userHousehold
    }
    $scope.createInvitation = function () {
        invitationSvc.createInvitation($scope.invitationItem);
        invitationSvc.sendInvite($scope.invitationItem).then(function (response) {
            $scope.message = "Your invitation has been sent";
            messageDelay(5, redirectCallback);
        },
        function (response) {
            $scope.message = "Failed to send invitation email";
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    };
    $scope.leaveHousehold = function () {
        invitationSvc.leaveHousehold($scope.userId).then(function (response) {
            authSvc.logOut();
        },
        function (response) {
            $scope.messageL = "Failed to leave your Household";
            $scope.isError = true;
            messageDelay(5, ErrorCallback);
        });
    };
    var ErrorCallback = function () {
        $scope.isError = false;
        $state.reload('Invitations');
    }

    var redirectCallback = function () {
        $scope.isError = false;
        $state.reload('Invitations');
    }

    var messageDelay = function (interval, callBack) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            //Anything I need to do
            callBack();
        }, 1000 * interval);
    }
}])