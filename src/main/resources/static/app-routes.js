define(function (require) {
    var app = require('./app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/systemManage/role');
//        $urlRouterProvider.otherwise('/login');

        $stateProvider
	        .state('login', {
	        	url: '/login',
	            templateUrl: 'session/login.html',
	            // new attribute for ajax load controller
	            controllerUrl: 'session/login',
	            controller: 'loginController'
	        })
            .state('home', {
            	url: '/home',
                templateUrl: 'session/home.html',
                // new attribute for ajax load controller
                controllerUrl: 'session/homeCtrl',
                controller: 'homeCtrl'
            })
            //系统管理部分
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
                controllerUrl: 'session/role',
                controller: 'roleController'
            })
            .state('home.systemManage.user', {
                url: '/user',
                templateUrl: 'session/user.html',
                controllerUrl: 'session/user',
                controller: 'userController'
            })
            .state('home.systemManage.record', {
                url: '/record',
                templateUrl: 'session/systemRecord.html',
                controllerUrl: 'session/systemRecord',
                controller: 'systemRecordController'
            })
            //采购管理部分
            .state('home.purchaseManage', {
                url: '/purchaseManage',
                templateUrl: 'session/purchaseManage.html',
                controllerUrl: 'session/purchaseManage',
                controller: 'purchaseManageController'
            })
            .state('home.purchaseManage.provider', {
                url: '/provider',
                templateUrl: 'session/provider.html',
                controllerUrl: 'session/provider',
                controller: 'providerController'
            })
            .state('home.purchaseManage.goods', {
                url: '/goods',
                templateUrl: 'session/purchaseGoods.html',
                controllerUrl: 'session/purchaseGoods',
                controller: 'purchaseGoodsController'
            })
            .state('home.purchaseManage.category', {
                url: '/category',
                templateUrl: 'session/category.html',
                controllerUrl: 'session/category',
                controller: 'categoryController'
            })
            .state('home.purchaseManage.good', {
                url: '/good',
                templateUrl: 'session/good.html',
                controllerUrl: 'session/good',
                controller: 'goodController'
            })
            .state('home.purchaseManage.back', {
                url: '/back',
                templateUrl: 'session/purchaseBack.html',
                controllerUrl: 'session/purchaseBack',
                controller: 'purchaseBackController'
            })
            //销售管理部分
            .state('home.saleMagage', {
                url: '/saleMagage',
                templateUrl: 'session/saleMagage.html',
                controllerUrl: 'session/saleMagage',
                controller: 'saleMagageController'
            })
            .state('home.saleMagage.goods', {
                url: '/goods',
                templateUrl: 'session/saleGoods.html',
                controllerUrl: 'session/saleGoods',
                controller: 'saleGoodsController'
            })
            .state('home.saleMagage.definePrice', {
                url: '/definePrice',
                templateUrl: 'session/definePrice.html',
                controllerUrl: 'session/definePrice',
                controller: 'definePriceController'
            })
            .state('home.saleMagage.back', {
                url: '/back',
                templateUrl: 'session/saleBack.html',
                controllerUrl: 'session/saleBack',
                controller: 'saleBackController'
            })
            .state('home.saleMagage.storage', {
                url: '/storage',
                templateUrl: 'session/storage.html',
                controllerUrl: 'session/storage',
                controller: 'storageController'
            })
            //统计分析部分
            .state('home.statisticManage', {
                url: '/statisticManage',
                templateUrl: 'session/statisticManage.html',
                controllerUrl: 'session/statisticManage',
                controller: 'statisticManageController'
            })
            .state('home.statisticManage.purchase', {
                url: '/purchase',
                templateUrl: 'session/purchaseStatic.html',
                controllerUrl: 'session/purchaseStatic',
                controller: 'purchaseStaticController'
            })
            .state('home.statisticManage.sale', {
                url: '/sale',
                templateUrl: 'session/saleStatic.html',
                controllerUrl: 'session/saleStatic',
                controller: 'saleStaticController'
            })
            .state('home.statisticManage.profit', {
                url: '/profit',
                templateUrl: 'session/profitStatic.html',
                controllerUrl: 'session/profitStatic',
                controller: 'profitStaticController'
            })
            .state('home.statisticManage.storage', {
                url: '/storage',
                templateUrl: 'session/storageStatic.html',
                controllerUrl: 'session/storageStatic',
                controller: 'storageStaticController'
            })
    }]);
});