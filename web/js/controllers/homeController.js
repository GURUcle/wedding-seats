angular.module('weddingseats').controller('HomeController', [
    '$scope', '$location', '$filter', 'GuestService',
    function ($scope, $location, $filter, GuestService) {

        $scope.guests = [
            {
                name: "Mazi",
                surname: "Muhlari",
                contact: "0726422105",
                table: "20",
                seat: "5"
            },
            {
                name: "Vutlhari",
                surname: "Ndlovhu",
                contact: "0815362633",
                table: "20",
                seat: "3"
            }
        ];

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