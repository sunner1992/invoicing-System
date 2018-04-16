define(function (require) {
    var app = require('../app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('roleController', ['$scope', '$ngConfirm', '$css', '$uibModal', function ($scope, $ngConfirm, $css, $uibModal) {
        // shortcut to get angular injected service.
//        var userServices = app.get('usersService');
//        $scope.userList = usersService.list();
		$css.add('session/role.css');
		
		$scope.roles = [{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		},{
			name: '张三'
		}]

		//打开添加角色页面
		$scope.open = function (size, parentSelector) {
		    var modalInstance = $uibModal.open({
		      // animation: $ctrl.animationsEnabled,
		      // ariaLabelledBy: 'modal-title',
		      // ariaDescribedBy: 'modal-body',
		      templateUrl: 'templates/userModal.html',
		      controller: 'userModalController',
		      // controllerAs: '$ctrl',
		      // size: size,
		      // appendTo: parentElem,
		      resolve: {
		        // items: function () {
		        //   return $ctrl.items;
		        // }
		      }
		    });

		    // modalInstance.result.then(function (selectedItem) {
		    //   $ctrl.selected = selectedItem;
		    // }, function () {
		    //   $log.info('Modal dismissed at: ' + new Date());
		    // });
		};


    }]).controller('userModalController',function ($uibModalInstance) {
    	//添加user的Modal控制器
    });

});