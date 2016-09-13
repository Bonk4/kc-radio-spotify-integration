﻿var SpotifyRadio = angular.module('SpotifyRadio', ['ngRoute', 'ngAnimate']);

SpotifyRadio.controller('SongsController', function ($scope, $http) {
    $scope.pageTitle = "KC Radio Spotify Integration";

    $scope.loggedin = false;

    $scope.isLoading = function (bool) {
        if (bool) {
            $scope.loading = true;

            $scope.containerStyle = { "opacity": "0.5" };
        }
        if (!bool) {
            $scope.loading = false;

            $scope.containerStyle = { "opacity": "1" };
        }
    };

    $scope.isLoading(true);

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
            $scope.isLoading(false);
        });

    $scope.switchSongs = function (stationName, stationId) {
        $scope.isLoading(true);
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
                $scope.songs = [{
                    'Artist': 'Couldnt load songs from web source.  Try again in a bit.',
                    'Track': 'Error...',
                    'Art': '',
                    'SpotifyId': ''
                }];
                $scope.errorMessage = true;
            })
            .finally(function () {
                $scope.isLoading(false);
            });
    };

    if ($scope.stations != null) {
        $scope.switchSongs($scope.stations[0].Name, $scope.stations[0].Id);
    };

    // login authentication
    openDialog = function (uri, name, options, cb) {
        var win = window.open(uri, name, options);
        var interval = window.setInterval(function () {
            try {
                if (!win || win.closed) {
                    window.clearInterval(interval);
                    cb(win);
                }
            } catch (e) { }
        }, 1000);
        return win;
    };

    toQueryString = function (obj) {
        var parts = [];
        angular.forEach(obj, function (value, key) {
            this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }, parts);
        return parts.join('&');
    };

    $scope.login = function () {
        var deferred = $q.defer();
        var that = this;

        var clientId = '23f299b83b5e45c0ad209144ac4e9c5c'; // Your client id
        var client_secret = '6efc18a526c942d8af4e3ebcdb658957'; // Your secret
        var redirectUri = 'http://localhost:27784/callback/'; // Your redirect uri

        var w = 400,
            h = 500,
            left = (screen.width / 2) - (w / 2),
            top = (screen.height / 2) - (h / 2);

        var params = {
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: '', // update this for playlist access
            response_type: 'token'
        };

        var authCompleted = false;
        var authWindow = openDialog(
          'https://accounts.spotify.com/authorize?' + toQueryString(params),
          'Spotify',
          'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left,
          function () {
              if (!authCompleted) {
                  deferred.reject();
              }
          })
    };

    $scope.login2 = function () {
        var clientId = '23f299b83b5e45c0ad209144ac4e9c5c'; // Your client id
        var client_secret = '6efc18a526c942d8af4e3ebcdb658957'; // Your secret
        var redirectUri = 'http://localhost:27784/callback/'; // Your redirect uri

        var params = {
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: '', // update this for playlist access
            response_type: 'token'
        };

        $http({
            method: 'GET',
            url: 'https://accounts.spotify.com/authorize?' + toQueryString(params)
        });
    };
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
        .when('/callback/', {
            templateUrl: 'Home/Callback'
        })
    ;
        
    $routeProvider.otherwise({ redirectTo: "/" });
}

configFunction.$inject = ['$routeProvider'];

SpotifyRadio.config(configFunction);
