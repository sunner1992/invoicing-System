define(function (require) {
    var app = require('../app');

    app.controller('goodStaticController', ['$scope', '$ngConfirm', '$css', '$uibModal', 'uuid2', 'Proxy', '$stateParams', '$state',
        function ($scope, $ngConfirm, $css, $uibModal, uuid2, Proxy, $stateParams, $state) {

		$css.bind('session/goodStatic.css', $scope);

		$scope.init = function(){
            $scope.showBySaleCount();
		}

        $scope.mostSale = function(option){
            var myChart = echarts.init(document.getElementById('chart-container'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        var paintMostSale = function(datas){
            option = {
            title : {
                text: '系统商品类别统计',
                // subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
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