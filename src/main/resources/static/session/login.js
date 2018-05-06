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

			Proxy.login.in($scope.user, function success(resp){//resp.data就是用户名
				//TODO 应该是去有权限的第一个页面
				if(resp.code == 200){
					$state.go('home.systemManage.role');
					setSession(resp.data)
				}else{
					$scope.showErrorInfo = true;
					$scope.info = resp.data;
				}
			}, function error(resp){
				$scope.showErrorInfo = true;
				$scope.info = resp.data;
			})
		}

		var setSession = function(username){
			Proxy.user.get({username: username}, function success(resp){
				$rootScope.session = resp.data;
			})
		}

		$scope.$watch('user',function(newValue, oldValue){
			$scope.showErrorInfo = false;
		})
    }]);
});