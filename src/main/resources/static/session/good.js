define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('goodController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', 'uuid2', function ($scope, $ngConfirm, $css, $uibModal, Proxy, uuid2) {
        
        //商品
  //       $scope.good = {
  // 			id: '',//商品id
		// 	name: '',//商品名称
		// 	creater: '',//生产商
		// 	category: '',//类别
		// 	categoryId: '',//商品id
		// 	provider: '',//供应商
		// 	providerId: ''//供应商id
		// };

		$css.add('session/good.css');
		
		$scope.goods = [];

		$scope.init = function(){
			Proxy.good.getAll(function success(resp){
				$scope.goods = resp.data;
			})
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/goodModal.html',
		        controller: 'goodModalController',
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

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/goodModal.html',
		     	controller: 'goodModalController',
		      	resolve: {
		      	index: function(){
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
			var good = $scope.goods[index];
			Proxy.good.del(good,function success(resp){
				$scope.goods.splice(index, 1);
			})
		}
		$scope.init();

    }]).controller('goodModalController',function ($uibModalInstance, $scope, index, goods, Proxy, uuid2) {
    	
		$scope.good = {
  			id: '',//商品id
			name: '',//商品名称
			creater: '',//生产商
			category: '',//类别
			categoryId: '',//商品id
			provider: '',//供应商
			providerId: ''//供应商id
		};

		$scope.categorys = [];
		$scope.providers = [];
		//类别应该是选出来的
		//供应商名字也应该是查出来的

		$scope.init = function(){
			if(index != null){
				$scope.good = goods[index];
				$scope.isModify = true;
			}else{
				$scope.isModify = false;
			}
			Proxy.provider.getAll(function success(resp){
				$scope.providers = resp.data;
				console.log($scope.providers);
			})
			Proxy.category.getAll(function success(resp){
				$scope.categorys = resp.data;
				console.log($scope.categorys);
			})
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			updateCategoryId();
			updateProviderId();

			if(index != null){
				Proxy.good.update($scope.good,function success(resp){
					goods[index].name = $scope.good.name;
					goods[index].creater = $scope.good.creater;
					goods[index].category = $scope.good.category;
					goods[index].categoryId = $scope.good.categoryId;
					goods[index].provider = $scope.good.provider;
					goods[index].providerId = $scope.good.providerId;
				})
			}else{
				$scope.good.id = uuid2.newuuid();
				Proxy.good.add($scope.good, function success(resp){
					goods.push($scope.good);
				})
			}
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		var updateCategoryId = function(){
			for(var category of $scope.categorys){
				if(category.name == $scope.good.category){
					$scope.good.categoryId = category.id;
				}
			}
		}

		var updateProviderId = function(){
			for(var provider of $scope.providers){
				if($scope.good.provider == provider.contact){
					$scope.good.providerId = provider.id;
				}
			}
		}
		$scope.init();
	});

});