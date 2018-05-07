define(function (require) {
    var app = require('../app');

    app.controller('statisticManageController', ['$scope', '$css', '$state', '$rootScope', function ($scope, $css, $state, $rootScope) {

		$css.bind('session/statisticManage.css', $scope);

		$scope.pages = [];

		var initPages = function(){
			angular.forEach($rootScope.permissions,function(data, index){
				if(data.name == '统计分析'){
					$scope.pages = data.pages;
				}
			})
		}

		$scope.init = function(){
			initPages();
			$scope.curIndex = getCurPage();
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