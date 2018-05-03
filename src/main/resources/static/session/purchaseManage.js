define(function (require) {
    var app = require('../app');

    app.controller('purchaseManageController', ['$scope', '$css', '$state', function ($scope, $css, $state) {
    	
    	$css.bind('session/saleMagage.css', $scope);

		$scope.pages = ['供应商管理', '采购管理', '商品类别管理', '商品管理', '退货管理'];
		$scope.pageCur = '供应商管理';
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
				case '供应商管理':
					$state.go('home.purchaseManage.provider');
					break;
				case '采购管理':
					$state.go('home.purchaseManage.goods');
					break;
				case '商品类别管理':
					$state.go('home.purchaseManage.category');
					break;
				case '商品管理':
					$state.go('home.purchaseManage.good');
					break;
				case '退货管理':
					$state.go('home.purchaseManage.back');
					break;
			}
		}
		
		var getCurIndex = function(){
			var state = $state.current.name;
			switch(state){
				case 'home.purchaseManage.provider':
					$scope.pageCur = '供应商管理';
					return 0;
				case 'home.purchaseManage.goods':
					$scope.pageCur = '采购管理';
					return 1;
				case 'home.purchaseManage.category':
					$scope.pageCur = '商品类别管理';
					return 2;
				case 'home.purchaseManage.good':
					$scope.pageCur = '商品管理';
					return 3
				case 'home.purchaseManage.back':
					$scope.pageCur = '退货管理';
					return 4;
			}
		}
		
		$scope.init();
    }]);

});