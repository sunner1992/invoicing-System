define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('storageController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        
        //商品样例
  //       $scope.good = {
		// 	goodId: '',//商品id
		// 	goodName: '',//商品名字
		// 	category: '',//商品类别 ,类别是页面显示，但是不是页面填的
		// 	categoryId: ''//商品类别id
		// 	provider: '',//供应商
		// 	providerId: '',//供应商id
		// 	count: o,//数量
		// };
		//上面的商品样例是存的和显示的组合

		$css.bind('session/storage.css', $scope);
		
		$scope.storages = [];
		
		$scope.page = {
				totalCount: 0,
				currentPage: 1,
				limit: 10,
				changed: function(){
					var param = {
						page: this.currentPage,
						limit: this.limit
					}
					Proxy.storage.getByPage(param, function success(resp){
						$scope.storages = resp.data.items;
						$scope.page.totalCount = resp.data.totalCount;
					})
				}
			}

		$scope.init = function(){
			$scope.page.changed();
		}

		$scope.init();

    }])

});