define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('categoryController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'uuid2', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, uuid2, Proxy) {
        
        //类别
  //       $scope.category = {
		// 	id: '',//类别id
		// 	name: ''//类别名称
		// };

		$css.add('session/category.css');
		
		$scope.categorys = [];

		$scope.init = function(){
			//已有类别的查询
			Proxy.category.getAll(function success(resp){
				$scope.categorys = resp.data;
				console.log(resp)
			})
		}

		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/categoryModal.html',
		        controller: 'categoryModalController',
		        resolve: {
		      	index: function(){
		      		return null;
		      	},
		        categorys: function(){
		        	return $scope.categorys;
		        }
		      }
		    });
		};

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/categoryModal.html',
		     	controller: 'categoryModalController',
		      	resolve: {
		      	index: function(){
		      		return index;
		      	},
		        categorys: function(){
	        		return $scope.categorys;
		        }
		      }
		    });
		}
		//TODO 实际删除+页面删除
		$scope.delete = function(index){
			var category = $scope.categorys[index];
			Proxy.category.del(category, function success(resp){
				$scope.categorys.splice(index, 1);
				console.log(resp)
			})
		}
		$scope.init();

    }]).controller('categoryModalController',function ($uibModalInstance, $scope, index, categorys, uuid2, Proxy) {
    	
		$scope.category = {
         	id: '',//类别id
			name: '',//类别名称
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.category = angular.copy(categorys[index]);
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				Proxy.category.update($scope.category,function success(resp){
					categorys[index].name = $scope.category.name;
				})
			}else{
				$scope.category.id = uuid2.newuuid();
				console.log(typeof($scope.category.id))
				console.log($scope.category)
				Proxy.category.add($scope.category, function success(resp){
					categorys.push($scope.category);
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