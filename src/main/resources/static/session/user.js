define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('userController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'Proxy', function ($scope, $ngConfirm, $css, $uibModal, Proxy) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/user.css');
		$css.remove(['session/role.css']);
		
		$scope.users = [];

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
			Proxy.user.getAll(function success(resp){
				console.log(resp);
				$scope.users = resp.data;
			})
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

    }]).controller('userModalController',function ($uibModalInstance, $scope, index, users, Proxy) {
    	
    	//TODO 我增加了一个用户名,username为主键，id不要了，应为username唯一
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
	
        //TODO 要查出来
        $scope.roles = [{name:'销售员'},{name:'采购员'},{name:'管理员'}];
	
		$scope.init = function(){
			if(index != null){
				$scope.user = angular.copy(users[index]);
			}
		}
	
		$scope.add = function(){
			if(index != null){
				users[index].name = $scope.user.name;
				users[index].role = $scope.user.role;
				users[index].phoneNum = $scope.user.phoneNum;
				users[index].address = $scope.user.address;
				users[index].gender = $scope.user.gender;
				users[index].username = $scope.user.username;
				users[index].password = $scope.user.password;
				Proxy.user.update({username:users[index].username}, $scope.user, function success(resp){
					console.log(resp)
				})
			}else{
				$scope.user.createTime = new Date();
				Proxy.user.add($scope.user, function success(resp){
					console.log(resp);
					users.push($scope.user);
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