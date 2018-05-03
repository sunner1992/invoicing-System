define(function (require) {
    var app = require('../app');

    app.controller('purchaseBackController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        
        //商品,分两种，这个是页面显示的，添加页面的只有id和数量
  //       $scope.purchase = {
  //		id:'',//后台会有不用主动赋值
  // 		goodId: '',//商品id
		// 	goodName: '',//商品名称
		// 	creater: '',//生产商
		// 	category: '',//类别
		// 	provider: '',//供应商
		// 	count: ''//退货数量
		// };

		$css.bind('session/purchaseBack.css', $scope);
		
		$scope.purchaseBacks = [];

		$scope.init = function(){
			//已有用户的查询
			Proxy.purchaseBack.getAll(function success(resp){
				$scope.purchaseBacks = resp.data;
			})
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/purchaseBackModal.html',
		        controller: 'purchaseBackModalController',
		        resolve: {
		      	index: function(){
		      		return null;
		      	},
		        purchaseBacks: function(){
		        	return $scope.purchaseBacks;
		        },
		        mainInit: function(){
		        	return $scope.init;
		        }
		      }
		    });
		};

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/purchaseBackModal.html',
		     	controller: 'purchaseBackModalController',
		      	resolve: {
		      	index: function(){
                    //TODO 
		      		return index;
		      	},
		        purchaseBacks: function(){
		        		return $scope.purchaseBacks;
		        },
		        mainInit: function(){
		        	return $scope.init;
		        }
		      }
		    });
		}
		
		$scope.delete = function(index){
			var purchaseBack = $scope.purchaseBacks[index];
			Proxy.purchaseBack.del(purchaseBack, function success(resp){
				$scope.purchaseBacks.splice(index, 1);
				console.log($scope.purchaseBacks);
			})
		}

		$scope.init();

    }]).controller('purchaseBackModalController',function ($uibModalInstance, $scope, index, purchaseBacks, mainInit, Proxy) {
    	
		$scope.purchaseBack = {
  			goodId: '',//商品id
			count: 0,//退货数量
			time: '',//退货时间
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.purchaseBack = purchaseBacks[index];
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				Proxy.purchaseBack.update($scope.purchaseBack, function success(resp){
					mainInit();
				})
			}else{
				$scope.purchaseBack.time = new Date();
				Proxy.purchaseBack.add($scope.purchaseBack, function success(resp){
					mainInit();
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