define(function (require) {
    var app = require('../app');

    app.controller('purchaseStaticController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'uuid2', 'Proxy', '$stateParams', '$state',
        function ($scope, $ngConfirm, $css, $uibModal, uuid2, Proxy, $stateParams, $state) {

		$css.bind('session/purchaseStatic.css', $scope);

		$scope.init = function(){
            $scope.showByPurchaseCount();
		}

        $scope.mostPurchase = function(option){
            var myChart = echarts.init(document.getElementById('chart-container'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        var paintMostPurchase = function(datas){
            var option = {
                title: {
                    text: '采购量最多的商品TOP10'
                },
                tooltip: {},
                legend: {
                    data:['采购量']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '采购量',
                    type: 'bar',
                    data: []
                }]
            };
            angular.forEach(datas,function(data, index){
                option.xAxis.data.push(data.showGood.name);
                option.series[0].data.push(data.count)
            })
            $scope.mostPurchase(option);
        }
        //按采购量多少显示
        $scope.showByPurchaseCount = function(){
            Proxy.purchaseStatistic.getMostPurchase(function success(resp){
                paintMostPurchase(resp.data);
            })
        }

		$scope.init();

    }])

});