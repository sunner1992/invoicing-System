define(function (require) {
    var app = require('./app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/systemManage/role');

        $stateProvider
            .state('home', {
            	url: '/home',
                templateUrl: 'session/home.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('home.systemManage', {
                url: '/systemManage',
                templateUrl: 'session/systemManage.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/systemManage',
                controller: 'systemManageController',
                // support to load more controllers, services, filters, ...
//                dependencies: ['services/usersService']
            })
            .state('home.systemManage.role', {
                url: '/role',
                templateUrl: 'session/role.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/role',
                controller: 'roleController'
            })
            .state('home.systemManage.user', {
                url: '/user',
                templateUrl: 'session/user.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/user',
                controller: 'userController'
            })
            .state('home.systemManage.record', {
                url: '/record',
                templateUrl: 'session/systemRecord.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/systemRecord',
                controller: 'systemRecordController'
            })
    }]);
});