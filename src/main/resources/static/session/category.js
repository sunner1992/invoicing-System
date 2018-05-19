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

		$css.bind('session/category.css', $scope);
		
		$scope.categorys = [];
		
		$scope.page = {
			totalCount: 0,
			currentPage: 1,
			limit: 10,
			changed: function(){
				var param = {
					page: this.currentPage,
					limit: this.limit
				}
				Proxy.category.getByPage(param, function success(resp){
					$scope.categorys = resp.data.items;
					$scope.page.totalCount = resp.data.totalCount;
				})
			}
		}

		$scope.init = function(){
			$scope.page.changed();
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
		        },
		        mainInit: function(){
		        		return $scope.init;
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
		        },
		        mainInit: function(){
		        		return $scope.init;
		        }
		      }
		    });
		}
		
		$scope.delete = function(index){
			var category = $scope.categorys[index];
			Proxy.category.del(category, function success(resp){
				$scope.categorys.splice(index, 1);
				console.log(resp)
			})
		}
		$scope.init();

    }]).controller('categoryModalController',function ($uibModalInstance, $scope, index, categorys, uuid2, Proxy, mainInit) {
    	
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
					mainInit()
				})
			}else{
				$scope.category.id = uuid2.newuuid();
				Proxy.category.add($scope.category, function success(resp){
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