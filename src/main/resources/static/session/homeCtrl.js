define(function (require) {
    var app = require('../app');
    require('proxy.js');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('homeCtrl', ['$scope', '$rootScope', '$ngConfirm', '$css', '$state', function ($scope, $rootScope, $ngConfirm, $css, $state) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
    	$css.bind('session/home.css', $scope);
    	console.log($rootScope.session)
    	if($rootScope.session == null){
    		$state.go('login');
    	}
		
		$rootScope.permissions;
		/**
		例子 $rootScope.permissions = [{name:'系统管理',pages:[{name:'角色管理':state:'home.systemManage.role'},{name:'用户管理':state:'home.systemManage.user'}]}]
		**/

		$scope.modules = $rootScope.permissions;

		$scope.changeModule = function(module){
			$state.go(module.pages[0].state);
		}
		$scope.switchUser = function(){
	    		$state.go('login');
	    	}
		
    }]);
});