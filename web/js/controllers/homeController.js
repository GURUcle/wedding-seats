angular.module('weddingseats').controller('HomeController', [
    '$scope', '$location', '$filter', 'GuestService',
    function ($scope, $location, $filter, GuestService) {

        $scope.guests = [];

        $scope.findGuests = function () {
            $scope.error = false;
            $scope.disabled = true;
            GuestService.findGuests(0, 1000)
                .then(function (response) {
                    if (response.data) {
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.guests.push(response.data[i]);
                        }
                    }
                }, function (data) {

                });
        };

    }]);