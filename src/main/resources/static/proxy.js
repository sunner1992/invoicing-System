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
    			},
    			'get': {
    				method: 'GET',
    			}
    		}),
    		provider: $resource('./provider/:action', {}, {
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
    			},
    			'get': {
    				method: 'GET',
    			}
    		}),
    		good: $resource('./good/:action', {}, {
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
    		}),
    		category: $resource('./category/:action', {}, {
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