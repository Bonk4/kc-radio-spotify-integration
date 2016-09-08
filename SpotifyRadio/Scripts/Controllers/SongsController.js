var SongsController = function ($scope, $http) {
    $scope.loading = true;
    $http({
        method: 'GET',
        url: 'api/Alternative'
    })
        .success(function (data, status, headers, config) {
            $scope.songs = data;
        })

        //todo: add better error handling
        .error(function () {
            $scope.songs = {
                'Artist': 'Couldnt load songs from web source.  Try again in a bit.',
                'Track': 'Error...',
                'Art': '',
                'SpotifyId': ''
            }
        })
        .finally(function () {
            // Hide loading spinner whether our call succeeded or failed.
            $scope.loading = false;
        });
};

SongsController.$inject = ['$scope'];