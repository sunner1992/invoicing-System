define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('providerController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        
        //采购商
  //       $scope.provider = {
  		//  id: '',//公司编号
		// 	name: '',//，联系人名称
		// 	phoneNum: '',//联系电话
		//  companyPhone: ''//公司电话
		// 	company: '',//公司名称
		// 	address: '',//公司地址
		// };

		$css.add('session/provider.css');
		
		$scope.providers = [];

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		        templateUrl: 'session/templates/providerModal.html',
		        controller: 'providerModalController',
		        resolve: {
		      	index: function(){
		      		return null;
		      	},
		        providers: function(){
		        	return $scope.providers;
		        }
		      }
		    });
		};
		//保存不要了，直接的操作修改就是实际的
		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      	templateUrl: 'session/templates/providerModal.html',
		     	controller: 'providerModalController',
		      	resolve: {
		      	index: function(){
                    //TODO 
		      		return index;
		      	},
		        providers: function(){
		        		return $scope.providers;
		        }
		      }
		    });
		}
		//TODO 实际删除+页面删除
		$scope.delete = function(index){
			$scope.providers.splice(index, 1);
			console.log($scope.providers);
		}
		$scope.init();

    }]).controller('providerModalController',function ($uibModalInstance, $scope, index, providers) {
    	
		$scope.provider = {
         	id: '',//公司编号
			name: '',//采购商名称，联系人名称
			phoneNum: '',//联系电话
		 	companyPhone: '',//公司联系电话
			company: '',//公司名称
			address: '',//地址，公司地址
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.provider = providers[index];
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				providers[index].name = $scope.provider.name;//TODO
				providers[index].phoneNum = $scope.provider.phoneNum;
				providers[index].companyPhone = $scope.provider.companyPhone;
				providers[index].company = $scope.provider.company;
				providers[index].address = $scope.provider.address;
				$uibModalInstance.close();
				return
			}else{
				// $scope.user.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				// console.log(new Date($scope.user.createTime).getTime())
				$scope.provider.id = '007';
			}
			providers.push($scope.provider);
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		$scope.init();
	});

});