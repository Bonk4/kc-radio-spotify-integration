var app = angular.module('SongApp');

app.controller('SongsController', function ($scope, $http, $cookies, $cookieStore, $location, $window, $routeParams) {
    $scope.pageTitle = "KC Radio Spotify Integration";

    var hash = $location.url().replace('/', '');

    if (hash) {
        $scope.access_token = hash.split('&').filter(function (arg) {
            return arg.includes("access_token");
        })[0].split('=')[1];

        $scope.message = $scope.access_token;
        if ($scope.access_token) {
            $scope.headers = { 'Authorization': 'Bearer ' + $scope.access_token };
            $http({
                method: 'GET',
                url: 'https://api.spotify.com/v1/me',
                headers: $scope.headers
            })
            .success(function (data, status, headers, config) {
                $scope.username = data.display_name;
                $scope.loggedin = true;

                //get playlists
                $http({
                    method: 'GET',
                    url: 'https://api.spotify.com/v1/me/playlists',
                    headers: $scope.headers
                })
                .success(function (data, status, headers, config) {
                    $scope.playlists = data.items;
                })
                .error(function () {
                    alert("Able to log in, but was not able to get user playlists.");
                });
            })
            .error(function () {
                alert("There was an error authenticating with Spotify.  Try reloading and logging in again.");
                $scope.loggedin = false;
            })
            .finally(function () {
                $window.location.href = '/#/';
            });
        }
        else {
            $scope.loggedin = false;
        }
    }

    $scope.isLoading = function (bool) {
        if (bool) {
            $scope.loading = true;

            $scope.containerStyle = { "opacity": "0.5" };
        }
        else {
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
            //$scope.isLoading(false);
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

    $scope.saveFavorite = function (favorite) {
        //save favorite to cookies
    };
});