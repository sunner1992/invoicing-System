define(function (require) {
    var app = require('../app');

    app.controller('purchaseManageController', ['$scope', '$css', '$state', '$rootScope', function ($scope, $css, $state, $rootScope) {
    	
    	$css.bind('session/saleMagage.css', $scope);

    	/**
		例子 $rootScope.permissions = [{name:'系统管理',pages:[{name:'角色管理':state:'home.systemManage.role'},{name:'用户管理':state:'home.systemManage.user'}]}]
		**/
		$scope.pages = [];
		$scope.curIndex = 0;
		
		var initPages = function(){
			angular.forEach($rootScope.permissions, function(data, index){
				if(data.name == '采购管理'){
					$scope.pages = data.pages;
				}
			})
		}
		$scope.init = function(){
			initPages();
			$scope.curIndex = getCurIndex();
		}
		
		$scope.changePage = function(page){
			$state.go(page.state);
		}
		
		var getCurIndex = function(){
			var state = $state.current.name;
			var num = 0;
			angular.forEach($scope.pages,function(page, index){
				if(state == page.state){
					num = index;
				}
			})
			return num;
		}
		
		$scope.init();

		$scope.$watch('$state.current.name',function(newVal, oldVal){
			$scope.init();
		})
    }]);

});