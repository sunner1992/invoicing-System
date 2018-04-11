define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('homeCtrl', ['$scope', '$ngConfirm', '$css', function ($scope, $ngConfirm, $css) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/home.css');

    }]);

});