define(function (require) {
    var app = require('../app');
    require('proxy.js');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('homeCtrl', ['$scope', '$rootScope', '$ngConfirm', '$css', '$state', function ($scope, $rootScope, $ngConfirm, $css, $state) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/home.css');
		
		$scope.modules = [{
				name: '系统管理'
			},
			{
				name: '采购管理'
			},
			{
				name: '销售管理'
			},
			{
				name: '统计分析'
			}
		]

		$scope.changeModule = function(module){
			switch(module.name){
				case '系统管理':
					$state.go('home.systemManage.role');
					break;
				case '采购管理':
					$state.go('home.purchaseManage.provider');
					break;
				case '销售管理':
					$state.go('')
			}
		}
		
		$rootScope.permissions = [{name:'角色管理', value:'systemManage.role'}, {name:'用户管理', value:'systemManage.user'},
	    	 {name:'记录管理', value:'systemManage.record'}, {name:'供应商管理', value:'purchaseManage.provider'}, 
	    	 {name:'采购商品管理', value:'purchaseManage.goods'}, {name:'商品类别管理', value:'purchaseManage.category'}, 
	    	 {name:'退货管理', value:'purchaseManage.back'}, {name:'采购记录管理', value:'purchaseManage.record'}, 
	    	 {name:'销售管理', value:'saleMagage.goods'}, {name:'退货管理', value:'saleMagage.back'}, {name:'库存管理', value:'saleMagage.storage'},
	    	 {name:'销售记录', value:'saleMagage.record'}, {name:'采购分析', value:'statisticManage.purchase'}, {name:'销售分析', value:'statisticManage.sale'},
	    	 {name:'盈利分析', value:'statisticManage.profit'}, {name:'库存分析', value:'statisticManage.storage'}]
    }]);

});