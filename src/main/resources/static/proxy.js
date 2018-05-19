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
    			},
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
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
    			},
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
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
    			},
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
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
    			},
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		purchase: $resource('./purchase/:action', {}, {
    			'add': {
    				method: 'POST'
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
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		purchaseBack: $resource('./purchaseBack/:action', {}, {
    			'add': {
    				method: 'POST'
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
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		definePrice: $resource('./definePrice/:action', {}, {
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
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		sale: $resource('./sale/:action', {}, {
    			'add': {
    				method: 'POST'
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
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		saleBack: $resource('./saleBack/:action', {}, {
    			'add': {
    				method: 'POST'
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
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		storage: $resource('./storage/:action', {}, {
    			'getAll': {
    				method: 'GET',
    				params: {
    					action: 'getAll'
    				}
    			},
    			'getByPage': {
    				method: 'GET',
    				params: {
    					action: 'getByPage'
    				}
    			}
    		}),
    		login: $resource('./login/:action', {}, {
    			'in': {
    				method: 'GET',
    				params: {
    					action: 'in'
    				}
    			}
    		}),
    		purchaseStatistic: $resource('./purchase_statistic/:action', {}, {
    			'getMostPurchase': {
    				method: 'GET',
    				params: {
    					action: 'getMostPurchase'
    				}
    			}
    		}),
    		saleStatistic: $resource('./sale_statistic/:action', {}, {
    			'getMostSales': {
    				method: 'GET',
    				params: {
    					action: 'getMostSales'
    				}
    			}
    		}),
    		storageStatistic: $resource('./storage_statistic/:action', {}, {
    			'getMostStorages': {
    				method: 'GET',
    				params: {
    					action: 'getMostStorages'
    				}
    			}
    		}),
    		goodStatistic: $resource('./good_statistic/:action', {}, {
    			'getGoodCountsOfCategory': {
    				method: 'GET',
    				params: {
    					action: 'getGoodCountsOfCategory'
    				}
    			}
    		}),
        };
    });
});