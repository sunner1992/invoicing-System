define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-css')
    require('angular-confirm')
    require('angular-ui-router')
    require('ui.bootstrap')
    require('angular-uuid2')
    require('angular-resource')
//    require('proxy.js')

    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angularCSS', 'cp.ngConfirm', 'angularUUID2', 'ngResource']);
    
    Date.prototype.format = function(fmt) { 
        var o = { 
           "M+" : this.getMonth()+1,                 //月份 
           "d+" : this.getDate(),                    //日 
           "h+" : this.getHours(),                   //小时 
           "m+" : this.getMinutes(),                 //分 
           "s+" : this.getSeconds(),                 //秒 
           "q+" : Math.floor((this.getMonth()+3)/3), //季度 
           "S"  : this.getMilliseconds()             //毫秒 
       }; 
       if(/(y+)/.test(fmt)) {
               fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
       }
        for(var k in o) {
           if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
       return fmt; 
   }

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);

    module.exports = app;
    
});