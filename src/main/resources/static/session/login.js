define(function (require) {
    var app = require('../app');
    require('proxy.js')

    app.controller('loginController', ['$scope', '$rootScope', '$ngConfirm', '$css', '$state', 'Proxy', 
    	function ($scope, $rootScope, $ngConfirm, $css, $state, Proxy) {
    	$css.bind('session/login.css', $scope);
		

		$scope.user = {
			username: '',
			password: ''
		}

		$scope.info = '';
		$scope.showErrorInfo = false;

		$scope.login = function(){
			$scope.info = ''

			Proxy.login.in($scope.user, function success(resp){//resp.data就是用户名
				if(resp.code == 200){
					setSession(resp.data)
				}else{
					$scope.showErrorInfo = true;
					$scope.info = resp.data;
				}
			}, function error(resp){
				$scope.showErrorInfo = true;
				$scope.info = resp.data;
			})
		}

		var setSession = function(username){
			if(username == 'admin'){
				initPermissions('admin');
				$rootScope.session = {name:'系统默认用户'}
				return;
			}
			Proxy.user.get({username: username}, function success(resp){
				$rootScope.session = resp.data;
				initPermissions($rootScope.session.role);
			})
		}
		/**
		例子 $rootScope.permissions = [{name:'系统管理',pages:[{name:'角色管理':state:'home.systemManage.role'},{name:'用户管理',state:'home.systemManage.user'}]}]
		**/
		var initPermissions = function(roleName){
			console.log(roleName)
			if(roleName == 'admin'){
				$rootScope.permissions = [{
					name:'系统管理',pages:[{name:'角色管理',state:'home.systemManage.role'},{name:'用户管理',state:'home.systemManage.user'}]
				},{
					name:'采购管理',pages:[{name:'供应商管理',state:'home.purchaseManage.provider'},{name:'采购管理',state:'home.purchaseManage.goods'},
					{name:'商品类别管理',state:'home.purchaseManage.category'},{name:'商品管理',state:'home.purchaseManage.good'},{name:'采购退货',state:'home.purchaseManage.back'}]
				},{
					name:'销售管理',pages:[{name:'商品销售管理',state:'home.saleMagage.goods'},{name:'定价管理',state:'home.saleMagage.definePrice'},
					{name:'销售退货',state:'home.saleMagage.back'},{name:'库存管理',state:'home.saleMagage.storage'}]
				},{
					name:'统计分析',pages:[]
				}]
				$state.go($rootScope.permissions[0].pages[0].state);
				return;
			}
			Proxy.role.get({name: roleName},function success(resp){
				console.log(resp);
				$rootScope.permissions = []
				var data = resp.data.permissions;
				var perNames = data.split(",")
				console.log(perNames);
				var systemPer = {name:'系统管理',pages:[]}
				var purchasePer = {name:'采购管理',pages:[]}
				var salePer = {name:'销售管理',pages:[]}
				var statisticPer = {name:'统计分析',pages:[]}
				angular.forEach(perNames,function(name, index){
					console.log(permissionMapping)
					console.log(name)
					console.log(permissionMapping[name])
					if(permissionMapping[name] && permissionMapping[name].indexOf('systemManage') > 0){
						systemPer.pages.push({name:name,state:permissionMapping[name]})
					}else if(permissionMapping[name] && permissionMapping[name].indexOf('purchaseManage') > 0){
						purchasePer.pages.push({name:name,state:permissionMapping[name]})
					}else if(permissionMapping[name] && permissionMapping[name].indexOf('saleMagage') > 0){
						salePer.pages.push({name:name,state:permissionMapping[name]})
					}else if(permissionMapping[name] && permissionMapping[name].indexOf('statisticManage') > 0){
						statisticPer.pages.push({name:name,state:permissionMapping[name]})
					}
				})
				if(systemPer.pages.length > 0){
					$rootScope.permissions.push(systemPer);
				}
				if(purchasePer.pages.length > 0){
					$rootScope.permissions.push(purchasePer);
				}
				if(salePer.pages.length > 0){
					$rootScope.permissions.push(salePer);
				}
				if(statisticPer.pages.length > 0){
					$rootScope.permissions.push(statisticPer);
				}
				console.log($rootScope.permissions);
				//跳转页面
				console.log($rootScope.permissions[0].pages[0].state)
				$state.go($rootScope.permissions[0].pages[0].state);
			})
		}

		var permissionMapping = {
			'角色管理':'home.systemManage.role',
			'用户管理':'home.systemManage.user',
			'供应商管理':'home.purchaseManage.provider',
			'采购管理':'home.purchaseManage.goods',
			'商品类别管理':'home.purchaseManage.category',
			'商品管理':'home.purchaseManage.good',
			'采购退货':'home.purchaseManage.back',
			'商品销售管理':'home.saleMagage.goods',
			'定价管理':'home.saleMagage.definePrice',
			'销售退货':'home.saleMagage.back',
			'库存管理':'home.saleMagage.storage',
			'采购分析':'home.statisticManage.purchase',
			'销售分析':'home.statisticManage.sale',
			'商品分析':'home.statisticManage.good',
			'库存分析':'home.statisticManage.storage'
		}
		
		$scope.$watch('user',function(newValue, oldValue){
			$scope.showErrorInfo = false;
		})
    }]);
});