angular.module('weddingseats').controller('HomeController', [
    '$scope', '$location', '$filter', 'GuestService',
    function ($scope, $location, $filter, GuestService) {

        $scope.guests = [];

        $scope.findGuests = function () {
            $scope.error = false;
            $scope.disabled = true;
            GuestService.findGuests(0, 100, 'info@optiflex.co.za')
                .then(function (response) {
                    if (response.data) {
                        $scope.guests.push(response.data[i]);
                    }
                }, function (data) {

                });
        };

    }]);