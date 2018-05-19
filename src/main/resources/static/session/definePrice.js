define(function (require) {
    var app = require('../app');

    app.controller('definePriceController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        
        //存的
        // $scope.define = {
        // 	goodId: '',
        // 	salePrice: 0
        // }

        //显示的
        // $scope.showDefine = {
        // 	goodId: '',
        // 	goodName: '',
        // 	salePrice: 0,
        // 	creater: '',
        // 	provider: '',
        // }


//		$css.add('session/definePrice.css');
		$css.bind('session/definePrice.css', $scope);
		
		$scope.showDefines = [];
		
		$scope.page = {
				totalCount: 0,
				currentPage: 1,
				limit: 10,
				changed: function(){
					var param = {
						page: this.currentPage,
						limit: this.limit
					}
					Proxy.definePrice.getByPage(param, function success(resp){
						$scope.showDefines = resp.data.items;
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
		        templateUrl: 'session/templates/definePriceModal.html',
		        controller: 'definePriceModalController',
		        resolve: {
			      	index: function(){
			      		return null;
			      	},
			        showDefines: function(){
			        		return $scope.showDefines;
			        },
			        mainInit: function(){
			        		return $scope.init;
			        }
			    }
		    });
		};

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/definePriceModal.html',
		     	controller: 'definePriceModalController',
		      	resolve: {
			      	index: function(){
			      		return index;
			      	},
			        showDefines: function(){
		        			return $scope.showDefines;
			        },
			        mainInit: function(){
			        		return $scope.init;
			        }
			    }
		    });
		}
		
		$scope.delete = function(index){
			var showDefine = $scope.showDefines[index];
			Proxy.definePrice.del({id:showDefine.goodId}, function success(resp){
				$scope.showDefines.splice(index, 1);
			})
		}

		$scope.init();

    }]).controller('definePriceModalController',function ($uibModalInstance, $scope, index, showDefines, Proxy, mainInit) {
    	
		$scope.define = {
	        	goodId: '',
	        	salePrice: 0
        }

        $scope.isModify = false;

		//采购员id就是用户的ID
		$scope.init = function(){
			if(index != null){
				$scope.isModify = true
				$scope.define.goodId = showDefines[index].goodId;
				$scope.define.salePrice = showDefines[index].salePrice;
			}
		}
		
		$scope.add = function(){
			if(index != null){
				Proxy.definePrice.update($scope.define,function success(resp){
					mainInit()
				})
			}else{
				Proxy.definePrice.add($scope.define,function success(resp){
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