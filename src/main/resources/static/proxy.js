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
    			}
    		}),
    		storage: $resource('./storage/:action', {}, {
    			'getAll': {
    				method: 'GET',
    				params: {
    					action: 'getAll'
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