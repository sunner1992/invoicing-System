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
            console.log(myChart)
            console.log(option)
            myChart.setOption(option);
        }

        var paintMostSale = function(datas){
            var option = {
                title : {
                    text: '系统商品类别统计',
                    //subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[],
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
                option.legend.data.push(data.name);
                option.series[0].data.push({value:data.count,name:data.name})
            })
            $scope.mostSale(option);
        }
        //按采购量多少显示
        $scope.showBySaleCount = function(){
            Proxy.goodStatistic.getGoodCountsOfCategory(function success(resp){
                paintMostSale(resp.data);
                console.log(resp)
            })
        }

		$scope.init();

    }])

});