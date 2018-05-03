define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('saleGoodsController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        
    	// $scope.sale = {
    	// 	goodId: '',
    	// 	count: '',
    	// 	time: ''
    	// }

    	// $scope.showSale = {
    	//	id：'',
    	// 	goodId: '', 
    	// 	goodName: '',
    	// 	definePrice: 0,
    	// 	count: 0,
    	// 	creater: '',
    	// 	provider: ''
    	// 	time: '',
    	//  saleman: '',
    	// }

//		$css.add('session/saleGoods.css');
		$css.bind('session/saleGoods.css', $scope);
		
		$scope.sales = [];

		$scope.init = function(){
			//已有用户的查询
			Proxy.sale.getAll(function success(resp){
				console.log(resp)
				$scope.sales = resp.data;
			})
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/saleGoodsModal.html',
		        controller: 'saleGoodsModalController',
		        resolve: {
			      	index: function(){
			      		return null;
			      	},
			        sales: function(){
			        	return $scope.sales;
			        },
			        init: function(){
			        	return $scope.init;
			        }
			    }
		    });
		};

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/saleGoodsModal.html',
		     	controller: 'saleGoodsModalController',
		      	resolve: {
			      	index: function(){
	                    //TODO 
			      		return index;
			      	},
			        sales: function(){
		        		return $scope.sales;
			        },
			        init: function(){
			        	return $scope.init;
			        }
			    }
		    });
		}
		
		$scope.init();

    }]).controller('saleGoodsModalController',function ($uibModalInstance, $scope, index, sales, Proxy, init) {
    	
		$scope.sale = {
    		goodId: '',
    		count: '',
    		time: '',
    		salemanId: ''
    	}

		//采购员id就是用户的ID
		$scope.init = function(){
			if(index != null){
				$scope.sale.id = sales[index].id;
				$scope.sale.goodId = sales[index].goodId;
				$scope.sale.count = sales[index].count;
				$scope.sale.time = sales[index].time;
				$scope.sale.salemanId = sales[index].salemanId;
			}
		}

		$scope.add = function(){
			if(index != null){
				Proxy.sale.update($scope.sale,function success(resp){
					init()
				})
			}else{
				$scope.sale.time = new Date();
				//TODO 销售员ID
				$scope.sale.salemanId = 'luliling'
				Proxy.sale.add($scope.sale,function success(resp){
					init()
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