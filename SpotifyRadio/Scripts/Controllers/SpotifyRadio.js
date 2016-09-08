var SpotifyRadio = angular.module('SpotifyRadio', ['ngRoute', 'ngAnimate']);

SpotifyRadio.controller('SongsController', function ($scope, $http) {
    $scope.pageTitle = "KC Radio Spotify Integration";

    $scope.switchSongs = function (genre) {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: 'api/' + genre
        })
            .success(function (data, status, headers, config) {
                $scope.songs = data;
                $scope.errorMessage = false;
                
                switch (genre.toLowerCase()) {
                    case "alternative":
                        $scope.station = '96.5 - The Buzz';
                        break;
                    case "rock":
                        $scope.station = '98.9 - The Rock!';
                        break;
                    default:
                        $scope.station = genre;
                }
            })

            //todo: add better error handling
            .error(function () {
                $scope.songs = {
                    'Artist': 'Couldnt load songs from web source.  Try again in a bit.',
                    'Track': 'Error...',
                    'Art': '',
                    'SpotifyId': ''
                };
                $scope.errorMessage = true;
            })
            .finally(function () {
                // Hide loading spinner whether our call succeeded or failed.
                $scope.loading = false;
            });
    };

    if ($scope.songs == null) {
        $scope.switchSongs('Rock');
    }
});

//SpotifyRadio.controller('MenuController', function MyCtrl($scope) {
//    $scope.name = 'Spider-Man';
//});

/* configure routing */
var configFunction = function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'SongsController',
            templateUrl: 'Home/Songs'
        })
        .when('/test', {
            controller: 'MenuController',
            templateUrl: 'Home/Menu'
        })
    ;
        
    $routeProvider.otherwise({ redirectTo: "/" });
}

configFunction.$inject = ['$routeProvider'];

SpotifyRadio.config(configFunction);
