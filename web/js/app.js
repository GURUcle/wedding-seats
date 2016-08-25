// Application Module
var weddingseats = angular.module('weddingseats', [
    'ngRoute',
    'ngCookies'
]);

// Configure Application
weddingseats.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            access: { restricted: false }
        });
    $locationProvider.html5Mode(true);
});