define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('purchaseGoodsController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        
        //添加的时候会填一些商品信息，根据商品查到是现有的就加数量没有的话就是

        //商品样例
  //       $scope.good = {
		// 	id: '',//商品id
		// 	name: '',//商品名字
		// 	category: '',//商品类别 ,类别是页面显示，但是不是页面填的
		// 	categoryId: ''//商品类别id
		// 	provider: '',//供应商
		// 	providerId: '',//供应商id
		// 	price: 0,//单价
		// 	count: o,//数量
		// 	time: '',//采购时间
		// 	buyer: '',//采购员
		// 	buyerId: '',//采购员id
		// };

		$css.add('session/purchaseGoods.css');
		
		$scope.goods = [];

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
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
			        goods: function(){
			        	return $scope.goods;
			        }
			    }
		    });
		};
		//保存不要了，直接的操作修改就是实际的
		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/purchaseGoodsModal.html',
		     	controller: 'purchaseGoodsModalController',
		      	resolve: {
			      	index: function(){
	                    //TODO 
			      		return index;
			      	},
			        goods: function(){
		        		return $scope.goods;
			        }
			    }
		    });
		}
		//TODO 实际删除+页面删除
		$scope.delete = function(index){
			$scope.goods.splice(index, 1);
			console.log($scope.goods);
		}
		$scope.init();

    }]).controller('purchaseGoodsModalController',function ($uibModalInstance, $scope, index, goods) {
    	
		$scope.good = {
			id: '',//商品id
			name: '',//商品名字
			category: '',//商品类别
			categoryId: '',//商品类别id
			provider: '',//供应商
			providerId: '',//供应商id
			price: 0,//单价
			count: 0,//数量
			money: 0,//总价
			time: '',//采购时间
			buyer: '',//采购员
			buyerId: '',//采购员id
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.good = goods[index];
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				//TODO
				goods[index].name = $scope.good.name;
				goods[index].price = $scope.good.price;
				goods[index].count = $scope.good.count;
				goods[index].money = $scope.good.price * $scope.good.count;
				$uibModalInstance.close();
				return
			}else{
				$scope.good.name = '康师傅冰红茶';
				$scope.good.category = '水饮';
				$scope.good.provider = '供应商';
				$scope.good.providerId = '供应商ID';
				$scope.good.money = $scope.good.price * $scope.good.count;
				$scope.good.providerId = '供应商ID';
				$scope.good.categoryId = '007';
				$scope.good.time = new Date().format("yyyy-MM-dd hh:mm:ss");
				$scope.good.buyer = '孙家民';
				$scope.good.buyerId = '007';
			}
			goods.push($scope.good);
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		$scope.init();
	});

});