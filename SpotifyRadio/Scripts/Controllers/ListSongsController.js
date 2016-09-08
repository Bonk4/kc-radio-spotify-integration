var ListSongsController = function ($scope, $http) {
    $http({
        url: 'api/Alternative',
        method: 'GET'
    })
        .success(
            function (data, status) {
                $scope.songs = data;
            })
        //.error(
        //    function (data, status) {
        //        alert("Error");
        //    })
    ;
};

ListSongsController.$inject = ['$scope'];