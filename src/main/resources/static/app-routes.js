define(function (require) {
    var app = require('./app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/users');

        $stateProvider
            .state('home', {
            	url: '/home',
                templateUrl: 'session/home.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('home.users', {
                url: '/users',
                templateUrl: 'session/users.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/usersCtrl',
                controller: 'usersCtrl',
                // support to load more controllers, services, filters, ...
//                dependencies: ['services/usersService']
            })
//            .state('components', {
//                url: '/components',
//                templateUrl: 'components/components.html',
//                // new attribute for ajax load controller
//                controllerUrl: 'components/componentsCtrl',
//                controller: 'componentsCtrl'
//            });
    }]);
});