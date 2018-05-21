define(function (require) {
    var app = require('../app');

    app.controller('providerController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', 'uuid2', function ($scope, $ngConfirm, $css, $uibModal, Proxy, uuid2) {
        
        //采购商
  //       $scope.provider = {
  		//  id: '',//公司编号
		// 	contact: '',//，联系人名称
		// 	phoneNum: '',//联系电话
		//  companyPhone: ''//公司电话
		// 	company: '',//公司名称
		// 	address: '',//公司地址
		// };

		$css.bind('session/provider.css', $scope);
		
		$scope.providers = [];
		
		$scope.page = {
			totalCount: 0,
			currentPage: 1,
			limit: 10,
			changed: function(){
				var param = {
					page: this.currentPage,
					limit: this.limit
				}
				Proxy.provider.getByPage(param, function success(resp){
					$scope.providers = resp.data.items;
					$scope.page.totalCount = resp.data.totalCount;
				})
			}
		}

		$scope.init = function(){
			//已有用户的查询
			$scope.page.changed();
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
		        },
		        mainInit: function(){
		        		return $scope.init;
		        }
		      }
		    });
		};

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
		        },
		        mainInit: function(){
		        		return $scope.init;
		        }
		      }
		    });
		}
		
		$scope.delete = function(index){
			var p = $scope.providers[index]
			Proxy.provider.del({id: p.id}, function success(resp){
				console.log(resp)
				$scope.providers.splice(index, 1);
			})
		}
		$scope.init();

    }]).controller('providerModalController',function ($uibModalInstance, $scope, index, providers, uuid2, Proxy, mainInit) {
    	
		$scope.provider = {
         	id: '',//公司编号
			contact: '',//采购商名称，联系人名称
			phoneNum: '',//联系电话
		 	companyPhone: '',//公司联系电话
			company: '',//公司名称
			address: '',//地址，公司地址
		};
	
		$scope.init = function(){
			if(index != null){
				$scope.provider = angular.copy(providers[index]);
			}
		}
		//修改和添加为两个方法，修改的时候页面只是数据变
		$scope.add = function(){
			if(index != null){
				Proxy.provider.update($scope.provider, function success(){
					mainInit();
				})
			}else{
				$scope.provider.id = uuid2.newuuid();
				Proxy.provider.add($scope.provider, function success(resp){
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