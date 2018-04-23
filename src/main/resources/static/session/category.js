define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('categoryController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        
        //类别
  //       $scope.category = {
		// 	id: '',//公司编号
		// 	name: ''//类别名称
		// };

		$css.add('session/category.css');
		
		$scope.categorys = [];

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
		}

		//打开添加角色页面
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
		//保存不要了，直接的操作修改就是实际的
		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/categoryModal.html',
		     	controller: 'categoryModalController',
		      	resolve: {
		      	index: function(){
                    //TODO 
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
			$scope.categorys.splice(index, 1);
			console.log($scope.categorys);
		}
		$scope.init();

    }]).controller('categoryModalController',function ($uibModalInstance, $scope, index, categorys) {
    	
		$scope.category = {
         	id: '',//类别id
			name: '',//类别名称
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.category = categorys[index];
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				categorys[index].name = $scope.category.name;//TODO
				$uibModalInstance.close();
				return
			}else{
				$scope.category.id = '007';
			}
			categorys.push($scope.category);
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		$scope.init();
	});

});