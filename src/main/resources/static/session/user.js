define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('userController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/user.css');
		
		$scope.users = [];

        //TODO 刷新的时候Tab会跑到第一个导致tab和实际的页对不上

		$scope.init = function(){
			//已有用户的查询
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		      // animation: $ctrl.animationsEnabled,
		      // ariaLabelledBy: 'modal-title',
		      // ariaDescribedBy: 'modal-body',
		      templateUrl: 'session/templates/userModal.html',
		      controller: 'userModalController',
		      // controllerAs: '$ctrl',
		      // size: size,
		      // appendTo: parentElem,
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
		      // animation: $ctrl.animationsEnabled,
		      // ariaLabelledBy: 'modal-title',
		      // ariaDescribedBy: 'modal-body',
		      templateUrl: 'session/templates/userModal.html',
		      controller: 'userModalController',
		      // controllerAs: '$ctrl',
		      // size: size,
		      // appendTo: parentElem,
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
			$scope.users.splice(index, 1);
			console.log($scope.users);
		}
		$scope.init();

    }]).controller('userModalController',function ($uibModalInstance, $scope, index, users) {
    	
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
			psssword: '123456'
		};
	
        //TODO 要查出来
        $scope.roles = [{name:'销售员'},{name:'采购员'},{name:'管理员'}];
	
		$scope.init = function(){
			if(index != null){
				$scope.user = users[index];
			}
		}
	
		$scope.add = function(){
			if(index != null){
				users[index].name = $scope.user.name;
				users[index].role = $scope.user.role;
				users[index].phoneNum = $scope.user.phoneNum;
				users[index].address = $scope.user.address;
				users[index].gender = $scope.user.gender;
				$uibModalInstance.close();
				return
			}else{
				$scope.user.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
				console.log(new Date($scope.user.createTime).getTime())
				$scope.user.id = '007';
			}
			users.push($scope.user);
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