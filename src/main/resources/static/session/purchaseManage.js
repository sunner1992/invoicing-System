define(function (require) {
    var app = require('../app');

    app.controller('purchaseManageController', ['$scope', '$css', '$state', function ($scope, $css, $state) {
		$css.add('session/purchaseManage.css')

		$scope.pages = ['供应商管理', '采购管理', '商品类别管理', '商品管理', '退货管理'];
		$scope.pageCur = '供应商管理';
		console.log('刷新页面')

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
    }]);

});