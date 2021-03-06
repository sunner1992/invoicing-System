define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('purchaseGoodsController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', '$rootScope', function ($scope, $ngConfirm, $css, $uibModal, Proxy, $rootScope) {
        
        //商品样例
  //       $scope.good = {
		// 	goodId: '',//商品id
		// 	goodName: '',//商品名字
		// 	category: '',//商品类别 ,类别是页面显示，但是不是页面填的
		// 	categoryId: ''//商品类别id
		// 	provider: '',//供应商
		// 	providerId: '',//供应商id
		// 	price: 0,//单价
		// 	count: o,//数量
		//  totalPrice: 0//总价
		// 	time: '',//采购时间
		// 	buyer: '',//采购员
		// 	buyerId: '',//采购员id
		// };
		//上面的商品样例是存的和显示的组合

		$css.bind('session/purchaseGoods.css', $scope);
		
		$scope.purchases = [];
		
		$scope.page = {
				totalCount: 0,
				currentPage: 1,
				limit: 10,
				changed: function(){
					var param = {
						page: this.currentPage,
						limit: this.limit
					}
					Proxy.purchase.getByPage(param, function success(resp){
						$scope.purchases = resp.data.items;
						$scope.page.totalCount = resp.data.totalCount;
					})
				}
			}

		$scope.init = function(){
			$scope.page.changed();
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/purchaseGoodsModal.html',
		        controller: 'purchaseGoodsModalController',
		        resolve: {
			      	index: function(){
			      		return null;
			      	},
			        purchases: function(){
			        		return $scope.purchases;
			        },
			        mainInit: function(){
			        		return $scope.init;
			        }
			    }
		    });
		};

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/purchaseGoodsModal.html',
		     	controller: 'purchaseGoodsModalController',
		      	resolve: {
			      	index: function(){
			      		return index;
			      	},
			        purchases: function(){
		        			return $scope.purchases;
			        },
			        mainInit: function(){
			        		return $scope.init;
			        }
			    }
		    });
		}
		
		$scope.delete = function(index){
			var purchase = $scope.purchases[index];
			Proxy.purchase.del(purchase, function success(resp){
				console.log(resp)
				$scope.purchases.splice(index, 1);
				console.log($scope.purchases);
			})
		}
		$scope.init();

    }]).controller('purchaseGoodsModalController',function ($uibModalInstance, $scope, index, purchases, Proxy, mainInit, $rootScope) {
    	
		$scope.purchase = {
			goodId: '',//商品id
			price: 0,//单价
			count: 0,//数量
			totalPrice: 0,//总价
			time: '',//采购时间
			buyerId: '',//采购员id
		};

		//采购员id就是用户的ID
		$scope.init = function(){
			if(index != null){
				$scope.purchase.id = purchases[index].id;
				$scope.purchase.goodId = purchases[index].goodId;
				$scope.purchase.price = purchases[index].price;
				$scope.purchase.count = purchases[index].count;
				$scope.purchase.time = purchases[index].time;
				$scope.purchase.buyerId = $rootScope.session.username;
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			$scope.purchase.totalPrice = $scope.purchase.price * $scope.purchase.count;
			if(index != null){
				Proxy.purchase.update($scope.purchase,function success(resp){
					mainInit()
				})
			}else{
				$scope.purchase.time = new Date();
				$scope.purchase.buyerId = $rootScope.session.username;
				Proxy.purchase.add($scope.purchase,function success(resp){
					mainInit()
				})
			}
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		$scope.init();
	});

});