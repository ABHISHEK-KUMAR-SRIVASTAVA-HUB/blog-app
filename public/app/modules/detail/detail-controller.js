blogApp.controller('detailCtrl', function($scope, $stateParams, $http, CONSTANTS) {
   
    if($stateParams.id){
    	$http({
          method: 'GET',
          url: CONSTANTS.baseUrl + 'blog/getDetail/' + $stateParams.id,
        }).then(function successCallback(response) {
            $scope.blog = response.data;
        }, function errorCallback(error) {
            console.log(error);
        });
    }
    
});