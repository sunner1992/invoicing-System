define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-css')
    require('angular-confirm')
    require('angular-ui-router');
    require('ui.bootstrap')

    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angularCSS', 'cp.ngConfirm']);

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);

    module.exports = app;
    
});