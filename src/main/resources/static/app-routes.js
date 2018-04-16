define(function (require) {
    var app = require('./app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/systemManager/role');

        $stateProvider
            .state('home', {
            	url: '/home',
                templateUrl: 'session/home.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('home.systemManager', {
                url: '/systemManager',
                templateUrl: 'session/systemManager.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/systemManager',
                controller: 'systemManagerController',
                // support to load more controllers, services, filters, ...
//                dependencies: ['services/usersService']
            })
            .state('home.systemManager.role', {
                url: '/role',
                templateUrl: 'session/role.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/role',
                controller: 'roleController'
            })
            .state('home.systemManager.user', {
                url: '/user',
                templateUrl: 'session/user.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/user',
                controller: 'userController'
            })
            .state('home.systemManager.record', {
                url: '/record',
                templateUrl: 'session/record.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/record',
                controller: 'rrecordController'
            })
    }]);
});