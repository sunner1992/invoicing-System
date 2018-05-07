define(function (require) {
    var app = require('../app');

    app.controller('storageStaticController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'uuid2', 'Proxy', '$stateParams', '$state',
        function ($scope, $ngConfirm, $css, $uibModal, uuid2, Proxy, $stateParams, $state) {

		$css.bind('session/storageStatic.css', $scope);

		$scope.init = function(){
            $scope.showBySaleCount();
		}

        $scope.mostSale = function(option){
            var myChart = echarts.init(document.getElementById('chart-container'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        var paintMostSale = function(datas){
            var option = {
                title: {
                    text: '库存最多的商品TOP10'
                },
                tooltip: {},
                legend: {
                    data:['库存']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '库存',
                    type: 'bar',
                    data: []
                }]
            };
            angular.forEach(datas,function(data, index){
                option.xAxis.data.push(data.showGood.name);
                option.series[0].data.push(data.count)
            })
            $scope.mostSale(option);
        }
        //按采购量多少显示
        $scope.showBySaleCount = function(){
            Proxy.storageStatistic.getMostStorages(function success(resp){
                paintMostSale(resp.data);
            })
        }

		$scope.init();

    }])

});