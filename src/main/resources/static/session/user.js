define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('userController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.bind('session/user.css', $scope);
		
		$scope.users = [];

		$scope.page = {
			totalCount: 0,
			limit: 10,
			currentPage: 1,
			pageChanged:function(){
				var param = {
					page: this.currentPage,
					limit: this.limit
				}
				//已有用户的查询
				Proxy.user.getByPage(param, function success(resp){
					console.log(resp);
					$scope.users = resp.data.items;
					$scope.page.totalCount = resp.data.totalCount;
				})
			}
		}

		$scope.init = function(){
			$scope.page.pageChanged();
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		      templateUrl: 'session/templates/userModal.html',
		      controller: 'userModalController',
		      resolve: {
		      	index: function(){
		      		return null;
		      	},
		        users: function(){
		        		return $scope.users;
		        },
		        mainInit: function(){
		        		return $scope.mainInit;
		        }
		      }
		    });
		};

		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      templateUrl: 'session/templates/userModal.html',
		      controller: 'userModalController',
		      resolve: {
		      	index: function(){
                    //TODO 
		      		return index;
		      	},
		        users: function(){
		        		return $scope.users;
		        },
		        mainInit: function(){
		        		return $scope.mainInit;
		        }
		      }
		    });
		}

		$scope.delete = function(index){
			Proxy.user.del({username: $scope.users[index].username}, function success(resp){
				console.log(resp)
				$scope.users.splice(index, 1);
			})
		}
		$scope.init();

    }]).controller('userModalController',function ($uibModalInstance, $scope, index, users, Proxy, mainInit) {
    	
    		//我增加了一个用户名,username为主键，id不要了，应为username唯一
		$scope.user = {
			name: '',
			role: '',
			phoneNum: '',
			createTime: '',
			address: '',
			id: '',
			gender: '',
			username:'',
			password: ''
		};
	
        $scope.roles = [];
	
		var initRoles = function(){
			Proxy.role.getAll(function success(resp){
				$scope.roles = resp.data;
			})
		}
		$scope.init = function(){
			initRoles();
			if(index != null){
				$scope.user = angular.copy(users[index]);
			}
		}
	
		$scope.add = function(){
			if(index != null){
				Proxy.user.update({username:users[index].username}, $scope.user, function success(resp){
					mainInit();
				})
			}else{
				$scope.user.createTime = new Date();
				Proxy.user.add($scope.user, function success(resp){
					mainInit();
				})
			}
			$uibModalInstance.close();
		}
	
		$scope.cancel = function(){
			$uibModalInstance.close();
		}

		$scope.isCurGender = function(gender){
			if($scope.user.gender == gender){
				return 'checked';
			}else{
				return '';
			}
		}

		$scope.init();
	});

});