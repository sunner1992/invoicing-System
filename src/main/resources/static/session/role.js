define(function (require) {
    var app = require('../app');

    app.controller('roleController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'uuid2', 'Proxy', '$stateParams', '$state',
        function ($scope, $ngConfirm, $css, $uibModal, uuid2, Proxy, $stateParams, $state) {
		$css.bind('session/role.css', $scope);
		
		$scope.roles = [];
        console.log($stateParams)

		$scope.init = function(){
			//已有角色的查询
            Proxy.role.getAll({},function success(resp){
                console.log(resp)
                $scope.roles = resp.data;
            })
		}

		//打开添加角色页面
		$scope.openAddModal = function () {
		    var modalInstance = $uibModal.open({
		      templateUrl: 'session/templates/roleModal.html',
		      controller: 'roleModalController',
		      resolve: {
		      	index: function(){
		      		return null;
		      	},
		        roles: function(){
		        	return $scope.roles;
		        }
		      }
		    });
		};

		$scope.save = function(){

		}

		$scope.modify = function(index){
			var modalInstance = $uibModal.open({
		      templateUrl: 'session/templates/roleModal.html',
		      controller: 'roleModalController',
		      resolve: {
		      	index: function(){
		      		return index;
		      	},
		        roles: function(){
		        	return $scope.roles;
		        }
		      }
		    });
		}

		$scope.deleteRole = function(index){
            var role = $scope.roles[index]
            console.log(index)
            console.log(role)
            Proxy.role.del({name: role.name}, function success(resp){
                console.log(resp)
                $scope.roles.splice(index, 1);
            })
		}
		$scope.init();

    }]).controller('roleModalController',function ($uibModalInstance, $scope, index, roles, uuid2, Proxy) {
    	//添加user的Modal控制器
    	$scope.permissions = [{name:'角色管理', value:'systemManage.role'}, {name:'用户管理', value:'systemManage.user'},
    	 {name:'供应商管理', value:'purchaseManage.provider'}, 
    	 {name:'采购管理', value:'purchaseManage.goods'}, {name:'商品类别管理', value:'purchaseManage.actegory'}, 
    	 {name:'商品管理', value:'purchaseManage.back'}, {name:'采购退货', value:'purchaseManage.record'}, 
    	 {name:'商品销售管理', value:'home.saleMagage.goods'}, {name:'定价管理', value:'home.saleMagage.definePrice'}, {name:'库存管理', value:'home.saleMagage.storage'},
    	 {name:'销售退货', value:'home.saleMagage.back'},{name:'采购分析'},{name:'销售分析'},{name:'商品分析'},{name:'库存分析'}]
    	$scope.role = {
    		id:'',
            name: '',
    		createTime: null,//实际添加时赋值
    		permissions: ''
    	};
    	
    	// console.log(uuid2.newuuid())
    	$scope.init = function(){
    		if(index != null){
    			$scope.role = angular.copy(roles[index]);
    			sychronizePermission();
    		}
    	}

    	$scope.add = function(){
            $scope.role.permissions = '';
    		angular.forEach($scope.permissions, function(data, index){
    			if(data.checked == true && $scope.role.permissions.indexOf(data.name) < 0){
    				$scope.role.permissions = $scope.role.permissions + data.name + ',';
    			}
    		})
    		if($scope.role.permissions.length > 0){
    			$scope.role.permissions = $scope.role.permissions.slice(0, $scope.role.permissions.length-1);
    		}
    		
    		if(index != null){
                Proxy.role.update({name: roles[index].name},$scope.role, function success(resp){
                    console.log(resp)
                    roles[index].name = $scope.role.name;
                    roles[index].permissions = $scope.role.permissions;
                })
    		}else{
                $scope.role.createTime = new Date().format('yyyy-MM-dd');
                Proxy.role.add($scope.role, function success(resp){
                    roles.push($scope.role);
                })
            }
    		$uibModalInstance.close();
    	}

    	$scope.cancel = function(){
    		$uibModalInstance.close();
    	}

    	$scope.selectPermission = function(per){
    		per.checked = !per.checked;
    	}

    	var sychronizePermission = function(){
    		var perArr = roles[index].permissions.split(',');
    		for(var i = 0; i < perArr.length; i++){
    			for(var j = 0; j < $scope.permissions.length; j++){
    				if($scope.permissions[j].name == perArr[i]){
    					$scope.permissions[j].checked = true;
    				}
    			}
    		}
    	}

    	$scope.init();
    });

});