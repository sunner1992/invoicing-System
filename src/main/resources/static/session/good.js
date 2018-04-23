define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('goodController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        
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

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
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
		//保存不要了，直接的操作修改就是实际的
		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/goodModal.html',
		     	controller: 'goodModalController',
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

    }]).controller('goodModalController',function ($uibModalInstance, $scope, index, goods) {
    	
		$scope.good = {
  			id: '',//商品id
			name: '',//商品名称
			creater: '',//生产商
			category: '',//类别
			categoryId: '',//商品id
			provider: '',//供应商
			providerId: ''//供应商id
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.good = goods[index];
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				goods[index].id = $scope.good.id;
				goods[index].name = $scope.good.name;
				goods[index].creater = $scope.good.creater;
				goods[index].category = $scope.good.category;
				goods[index].categoryId = '000';
				goods[index].provider = $scope.good.provider;
				goods[index].providerId = '000';
				$uibModalInstance.close();
				return
			}else{
				// $scope.user.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				// console.log(new Date($scope.user.createTime).getTime())
				$scope.good.categoryId = '007';
				$scope.good.providerId = '007';
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