define(function (require) {
    var app = require('../app');

    app.controller('saleMagageController', ['$scope', '$css', '$state', function ($scope, $css, $state) {

		$css.add('session/saleMagage.css')

		$scope.pages = ['商品销售管理', '定价管理', '退货管理', '库存管理'];
		$scope.pageCur = '商品销售管理';
		$scope.curIndex = 0;
		
		$scope.init = function(){
			$scope.curIndex = getCurIndex();
		}
		
		$scope.changePage = function(page){
			if($scope.pageCur == page){
				return
			}else{
				$scope.pageCur = page;
			}
			console.log($scope.pageCur);
			switch(page){
				case '商品销售管理':
					$state.go('home.saleMagage.goods');
					break;
				case '定价管理':
					$state.go('home.saleMagage.definePrice');
					break;
				case '退货管理':
					$state.go('home.saleMagage.back');
					break;
				case '库存管理':
					$state.go('home.saleMagage.storage');
					break;
			}
		}
		
		var getCurIndex = function(){
			var state = $state.current.name;
			switch(state){
				case 'home.saleMagage.goods':
					$scope.pageCur = '商品销售管理';
					return 0;
				case 'home.saleMagage.definePrice':
					$scope.pageCur = '定价管理';
					return 1;
				case 'home.saleMagage.back':
					$scope.pageCur = '退货管理';
					return 2;
				case 'home.saleMagage.storage':
					$scope.pageCur = '库存管理';
					return 3
			}
		}
		
		$scope.init();
    }]);

});