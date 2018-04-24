require.config({
    baseUrl: '/invoice',
    paths: {
        'jquery': '3rd/jquery/jquery.min',
		'angular': '3rd/angular/angular.min',
        'angular-ui-router': '3rd/angular/angular-ui-router.min',
        'angular-async-loader': '3rd/angular/angular-async-loader.min',
        'angular-css': '3rd/angular/angular-css.min',
        'angular-confirm': '3rd/angular/angular-confirm.min',
        'angular-uuid2': '3rd/angular/angular-uuid2.min',
//        'angular-ui-mask': 'angular/mask.min',
//        'ng-tags-input': 'angular/ng-tags-input.min'
        
        'bootstrap': '3rd/bootstrap/bootstrap.min',
        'ui.bootstrap': '3rd/ui-bootstrap-tpls.min'
    },
    shim: {
        'jquery': {exports: ['$','jQuery']},
		'angular': {exports: 'angular', deps: ['jquery']},
        'angular-ui-router': {deps: ['angular']},
        'angular-css': {deps: ['angular']},
        'angular-uuid2': {deps: ['angular']},
        'angular-confirm': {deps: ['angular','jquery']},
        'bootstrap': {deps:['jquery']},
        'ui.bootstrap': { deps: ['angular', 'bootstrap'] }
    }
});

require(['angular', './app-routes'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});