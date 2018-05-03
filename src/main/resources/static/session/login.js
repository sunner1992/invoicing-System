define(function (require) {
    var app = require('../app');
    require('proxy.js');

    app.controller('loginController', ['$scope', '$rootScope', '$ngConfirm', '$css', '$state', function ($scope, $rootScope, $ngConfirm, $css, $state) {
    	$css.bind('session/login.css', $scope);
		
    }]);

});