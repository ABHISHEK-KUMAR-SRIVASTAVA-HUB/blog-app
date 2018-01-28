blogApp.controller('mainCtrl', function($scope, ngDialog, $http, $rootScope, $state, CONSTANTS) {
  	
  	console.log("parent");  
  	$scope.loggedInUser = '';
    $scope.otpSent = false;
  	$scope.submitted = false;
    $scope.sendOtpText = 'Send OTP';
  	if(localStorage.user){
  		$scope.isUserLoggedIn = true;
  		$scope.loggedInUser = JSON.parse(localStorage.user).user.split('.')[0];
  	}else{
  		$scope.isUserLoggedIn = false;
  	}
  	$scope.user = {
  	 	"username" : null,
  	 	"password" : null
  	}
  	$scope.authFailed = false;
  	$scope.ngDialog = ngDialog;

    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams, fromState, fromParams) {
        if(!localStorage.user && toState.name=='post'){
            e.preventDefault(); 
            $scope.message = "login Required !";
            $state.go('home');
            $('#success').fadeIn(500).fadeOut(3000);
            return;
        }
        
    });
  	
  	$scope.login = function(){
  		$scope.submitted = false;
  	 	$scope.authFailed = false;
  	 	ngDialog.open({
		    template: 'modules/modals/loginModal.html',
		    className: 'ngdialog-theme-plain',
		    showClose: false ,
		    scope: $scope,
        preCloseCallback: function(value) {
          $scope.otpSent = false;
          $scope.sendOtpText = 'Send OTP';
          $scope.submitted = false;
          return true;
        }
		  });
  	 }

  	$scope.closeModal = function(){
      $scope.otpSent = false;
  		$scope.submitted = false;
  		$scope.ngDialog.close();
  	}

  	$scope.auth = function(form){
  		$scope.submitted = true;
  		$scope.authFailed = false;
  		if(!form.$valid){
  			return;
  		}
  		$http({
		  method: 'POST',
		  url: CONSTANTS.baseUrl + 'user/auth',
      data : $scope.user
		}).then(function successCallback(response) {
			$scope.authFailed = false;
			localStorage.user = JSON.stringify(response.data);
			$scope.message = "Hi " + response.data.user.split('.')[0] + " Welcome to Suvichaar";
			$scope.loggedInUser = response.data.user.split('.')[0];
			$scope.ngDialog.close();
			$scope.isUserLoggedIn = true;
		  $('#success').fadeIn(500).fadeOut(3000);
		}, function errorCallback(error) {
			$scope.submitted = false;
			$scope.authFailed = true;
			$scope.isUserLoggedIn = false;
		    console.log('error');
		});
  	}

  	$scope.logout = function(){
    		$http({
  		  method: 'GET',
  		  url: CONSTANTS.baseUrl + 'user/auth',
  		}).then(function successCallback(response) {
  			localStorage.clear('user');
  			$scope.loggedInUser = '';
  			$scope.isUserLoggedIn = false;
  			$scope.message = "Successfully logged out";
  			$('#success').fadeIn(500).fadeOut(3000);
  		    console.log('success logged out');
  		}, function errorCallback(error) {
  		    console.log('error');
  		});
  	}

    $scope.sendOtp = function(form){
      $scope.sendOtpText = 'Sending OTP';
      $http({
        method: 'POST',
        url: 'http://localhost:3000/OTP/sendOTP',
        data : { "username": $scope.user.username}
      }).then(function successCallback(response) {
          $scope.otpSent = true;
          $scope.sendOtpText = 'Send OTP';
          console.log("successCallback")
      }, function errorCallback(error) {
          console.log(error);
      });
    }
});