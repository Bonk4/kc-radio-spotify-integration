var app = angular.module('SongApp', ['ngRoute', 'ngAnimate', 'ngCookies']);

/* configure routing */
var configFunction = function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/songApp/Views/Songs.html'
        })
    ;
        
    $routeProvider.otherwise({ redirectTo: "/" });
}

configFunction.$inject = ['$routeProvider'];

app.config(configFunction);
