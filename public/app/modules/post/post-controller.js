blogApp.controller('postCtrl', function($scope, $http, $state, CONSTANTS) {
     console.log("postCtrl");

     $scope.postBlog = function(form){
     	if(!form.$valid){
     		return;
     	}
     	else{
     		var file = $scope.myFile;
     		var dataObj =	{
				"title": $scope.blog.title,
				"description": $scope.blog.description,
				"postedBy": "tutorials point",
				"url": "http://www.tutorialspoint.com",
				"tags": [
					"mongodb",
					"database",
					"NoSQL"
				],
				"likes": 100,
				"rating": 5
			}
	        $http({
	            method: 'POST',
	            url: CONSTANTS.baseUrl + 'blog/post',
	            headers: {
	                'Content-Type': 'multipart/form-data'
	            },
	            data: {
	                info: JSON.stringify(dataObj),
	                upload: $scope.myFile
	            },
	            transformRequest: function (data, headersGetter) {
	                var formData = new FormData();
	                angular.forEach(data, function (value, key) {
	                    formData.append(key, value);
	                });

	                var headers = headersGetter();
	                delete headers['Content-Type'];

	                return formData;
	            }
	        })
	        .success(function (data) {
	        	$state.go('home');
	        })
	        .error(function (data, status) {

	        });
 	}
     }
});

