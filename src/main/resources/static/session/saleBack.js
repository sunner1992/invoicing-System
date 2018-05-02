define(function (require) {
    var app = require('../app');

    app.controller('saleBackController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        
    	//基本和售货是一样的，暂时没有大改变

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

		$css.add('session/saleBack.css');
		
		$scope.sales = [];

		$scope.init = function(){
			//已有用户的查询
			Proxy.saleBack.getAll(function success(resp){
				console.log(resp)
				$scope.sales = resp.data;
			})
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/saleBackModal.html',
		        controller: 'saleBackModalController',
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
		      	templateUrl: 'session/templates/saleBackModal.html',
		     	controller: 'saleBackModalController',
		      	resolve: {
			      	index: function(){
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

    }]).controller('saleBackModalController',function ($uibModalInstance, $scope, index, sales, Proxy, init) {
    	
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
				Proxy.saleBack.update($scope.sale,function success(resp){
					init()
				})
			}else{
				$scope.sale.time = new Date();
				//TODO 销售员ID
				$scope.sale.salemanId = 'luliling'
				Proxy.saleBack.add($scope.sale,function success(resp){
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