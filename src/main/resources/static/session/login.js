define(function (require) {
    var app = require('../app');
    require('proxy.js')

    app.controller('loginController', ['$scope', '$rootScope', '$ngConfirm', '$css', '$state', 'Proxy', 
    	function ($scope, $rootScope, $ngConfirm, $css, $state, Proxy) {
    	$css.bind('session/login.css', $scope);
		

		$scope.user = {
			username: '',
			password: ''
		}

		$scope.info = '';
		$scope.showErrorInfo = false;

		$scope.login = function(){
			$scope.info = ''

			Proxy.login.in($scope.user, function success(resp){
				//TODO 应该是去有权限的第一个页面
				if(resp.code == 200){
					$state.go('home.systemManage.role');
					$rootScope.session = {username:resp.data}
				}else{
					$scope.showErrorInfo = true;
					$scope.info = resp.data;
				}
			}, function error(resp){
				$scope.showErrorInfo = true;
				$scope.info = resp.data;
			})
		}

		$scope.$watch('user',function(newValue, oldValue){
			$scope.showErrorInfo = false;
		})
    }]);
});