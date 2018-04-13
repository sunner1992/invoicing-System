define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('usersCtrl', ['$scope', '$css', function ($scope, $css) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/users.css')

		$scope.pages = ['角色管理', '用户管理', '记录管理'];
		$scope.pageCur = '角色管理';

		$scope.changePage = function(page){
			$scope.pageCur = page;
			console.log($scope.pageCur);
		}
    }]);

});