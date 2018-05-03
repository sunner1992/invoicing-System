define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('systemManageController', ['$scope', '$css', '$state', function ($scope, $css, $state) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.bind('session/systemManage.css', $scope);

		$scope.pages = ['角色管理', '用户管理', '记录管理'];

		$scope.init = function(){
			$scope.curIndex = getCurPage();
			console.log($scope.pageCur);
		}

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
		}

		var getCurPage = function(){
			var state = $state.current.name;
			console.log(state)
			switch(state){
				case 'home.systemManage.role':
					$scope.pageCur = '角色管理';
					return 0
				case 'home.systemManage.user':
					$scope.pageCur = '用户管理';
					return 1
				case 'home.systemManage.record':
					$scope.pageCur = '记录管理';
					return 2
			}
		}

		$scope.init();
    }]);

});