define(function (require) {
    var app = require('../app');

    app.controller('saleBackController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', '$rootScope', function ($scope, $ngConfirm, $css, $uibModal, Proxy, $rootScope) {
        
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

//		$css.add('session/saleBack.css');
		$css.bind('session/saleBack.css', $scope);
		
		$scope.sales = [];
		
		$scope.page = {
				totalCount: 0,
				currentPage: 1,
				limit: 10,
				changed: function(){
					var param = {
						page: this.currentPage,
						limit: this.limit
					}
					Proxy.saleBack.getByPage(param, function success(resp){
						$scope.sales = resp.data.items;
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

    }]).controller('saleBackModalController',function ($uibModalInstance, $scope, index, sales, Proxy, init, $rootScope) {
    	
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
				$scope.sale.salemanId = $rootScope.session.username;
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