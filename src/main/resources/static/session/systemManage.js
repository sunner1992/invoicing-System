define(function (require) {
    var app = require('../app');

    app.controller('systemManageController', ['$scope', '$css', '$state', '$rootScope', function ($scope, $css, $state, $rootScope) {
		$css.bind('session/systemManage.css', $scope);

		/**
		例子 $rootScope.permissions = [{name:'系统管理',pages:[{name:'角色管理':state:'home.systemManage.role'},{name:'用户管理':state:'home.systemManage.user'}]}]
		**/
		$scope.pages = [];

		var initPages = function(){
			angular.forEach($rootScope.permissions,function(data, index){
				if(data.name == '系统管理'){
					$scope.pages = data.pages;
				}
			})
		}

		$scope.init = function(){
			$scope.curIndex = getCurPage();
			initPages();
			console.log($scope.pageCur);
		}

		$scope.changePage = function(page){
			$state.go(page.state);
		}

		var getCurPage = function(){
			var state = $state.current.name;
			console.log(state)
			var currentNum = 0
			angular.forEach($scope.pages,function(page, index){
				if(state == page.state){
					currentNum = index;
				}
			})
			return currentNum;
		}

		$scope.init();
		
		$scope.$watch('$state.current.name',function(newVal, oldVal){
			$scope.init();
		})
    }]);

});