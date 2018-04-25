define(function (require) {
    var app = require('app');

    app.factory('Proxy', function($resource){
        return {
        	role: $resource('./role/:action', {}, {
    			'get': {
    				method: 'GET',
    			},
    			'getAll': {
    				method: 'GET',
    				params: {
    					action: 'getAll'
    				}
    			},
    			'add': {
    				method: 'POST'
    			},
    			'del': {
    				method: 'DELETE'
    			},
    			'update': {
    				method: 'PUT'
    			}
    		}),
    		user: $resource('./user/:action', {}, {
    			'add': {
    				method: 'POST'
    			},
    			'del': {
    				method: 'DELETE'
    			},
    			'update': {
    				method: 'PUT'
    			},
    			'getAll': {
    				method: 'GET',
    				params: {
    					action: 'getAll'
    				}
    			}
    		})
        };
    });
});