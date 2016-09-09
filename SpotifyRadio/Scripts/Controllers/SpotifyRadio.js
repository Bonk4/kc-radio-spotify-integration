var SpotifyRadio = angular.module('SpotifyRadio', ['ngRoute', 'ngAnimate']);

SpotifyRadio.controller('SongsController', function ($scope, $http) {
    $scope.pageTitle = "KC Radio Spotify Integration";
    $scope.loading = true;

    $http({
            method: 'GET',
            url: 'api/Stations'
        })
        .success(function (data, status, headers, config) {
            $scope.stations = data;
            $scope.errorMessage = false;

            $scope.switchSongs($scope.stations[0].Name, $scope.stations[0].Id)
        })
        
        //todo: add better error handling
        .error(function () {
            $scope.songs = {
                'Artist': 'Couldnt find local stations.  Try again in a bit.',
                'Track': 'Error...',
                'Art': '',
                'SpotifyId': ''
            };
            $scope.errorMessage = true;
        })
        .finally(function () {
            //$scope.loading = false;
        });

    $scope.switchSongs = function (stationName, stationId) {
        $scope.loading = true;
        $scope.currentStation = stationName;

        $http({
            method: 'GET',
            url: 'api/Songs?id=' + stationId
        })
            .success(function (data, status, headers, config) {
                $scope.songs = data;
                $scope.errorMessage = false;
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
                $scope.loading = false;
            });
    };

    if($scope.stations != null) {
        $scope.switchSongs($scope.stations[0].Name, $scope.stations[0].Id);
    }
});

//SpotifyRadio.controller('MenuController', function MyCtrl($scope) {
//    $scope.name = 'Spider-Man';
//});

/* configure routing */
var configFunction = function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Home/Songs'
        })
        .when('/test', {
            controller: 'MenuController',
            templateUrl: 'Home/Menu'
        });
        
    $routeProvider.otherwise({ redirectTo: "/" });
}

configFunction.$inject = ['$routeProvider'];

SpotifyRadio.config(configFunction);
