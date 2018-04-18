define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('systemManageController', ['$scope', '$css', '$state', function ($scope, $css, $state) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/systemManage.css')

		$scope.pages = ['角色管理', '用户管理', '记录管理'];
		$scope.pageCur = '角色管理';
		console.log('刷新页面')

		$scope.changePage = function(page){
			if($scope.pageCur == page){
				return
			}else{
				$scope.pageCur = page;
			}
			console.log($scope.pageCur);
			switch(page){
				case '角色管理':
					$state.go('home.systemManage.role');
					break;
				case '用户管理':
					$state.go('home.systemManage.user');
					break;
				case '记录管理':
					$state.go('home.systemManage.record');
					break;
			}
			// if($scope.pageCur == '角色管理'){
			// 	$state.go('home.systemManage.role');
			// }
			// if($scope.pageCur == '用户管理'){
			// 	$state.go('home.systemManage.user')
			// }
			// if($scope.pageCur == '记录管理'){
			// 	$state.go('home.systemManage.record')
			// }
		}
    }]);

});