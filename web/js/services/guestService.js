angular.module('weddingseats').factory('GuestService', [
    '$q', '$timeout', '$http',
    function ($q, $timeout, $http) {
        return {
            createGuest: function (data) {
                return $http.post('/api/guest', data);
            },
            findGuests: function (skip, take, username) {
                return $http.get('/api/guest/' + username + '?skip=' + skip + '&take=' + take);
            },
            findGuest: function (id) {
                return $http.get('/api/guest/' + id);
            },
            updateGuest: function (data) {
                return $http.put('/api/guest/', data);
            }
        };
    }]);