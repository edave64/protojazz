tests = {
	'protojazz version': $.protojazzVersion,
	
	'old $ unharmed': test.frontend.name == 'html' ?
	                    function () { return $.old$ } :
	                    // not testable on node
	                    function () { return true },
	
	'$.extend': {
		'with object' : function () {
			var a = {};
			$.extend(a, { testValue : 'test1' });
			return a.testValue === 'test1';
		},
		
		'with function' : function () {
			var a = {};
			$.extend(a, function () {
				this.testValue = 'test1';
		    });
			return a.testValue === 'test1';
		}
	},
	
	'$.getP': function () {
		return $.getP(function(){}) === Function.prototype;
	},
	
	'$.proto': {
		'create Basic constructor': function () {
			this.protoTest = $.proto({
				testAttribute: 'this is a test',
			    initialized: false,
			    inheritanceTest: 'test',
				
			    init: function () {
			        this.initialized = true
			    },
			    
			    supertest: function () {
			    	return true;
			    },
			    
			    self: {
			        Static: 'example',
			        inherited: function () {
			    		this.inheritest = true;
			    	}
			    }
			});
			return typeof this.protoTest == 'function'
		},
		
		'self attribute': function () {
			return this.protoTest.Static == 'example'
		},
		
		instanciation: function () {
			this.testObj1 = new this.protoTest ();
			return this.testObj1 instanceof this.protoTest;
		},
		
		'access attributes': function () {
			return this.testObj1.testAttribute === 'this is a test';
		},
		
		'initialized?': function () {
			return this.testObj1.initialized
		},
		
		inheritance: {
			'create inherited constructor': function () {
				this.protoTest2 = $.proto(this.protoTest, {
					inheritanceTest: 'test2',
					
				    init: function (value) {
				    	this.Super('init');
				        this.initialized2 = value
				    },
				    
				    supertest: function () {
				    	return false;
				    }
				});
				return typeof this.protoTest2 == 'function'
			},
			
			instantiation: function () {
				this.testObj2 = new this.protoTest2 (true);
				return this.testObj2 instanceof this.protoTest2;
			},
			
			'initialized?': function () {
				return this.testObj2.initialized2
			},
			
			'super initialized?': function () {
				return this.testObj2.initialized
			},
			
			'attributes shadowed': function () {
				return this.testObj2.inheritanceTest === 'test2';
			},
			
			'inherited attribute': function () {
				return this.protoTest.inheritest;
			},
			
			globals: {
				'isA': function () {
					return this.testObj2.isA(this.protoTest2) &&
					       this.testObj2.isA(this.protoTest);
				},
				
				'Super()': function () {
					return this.testObj2.Super() == this.protoTest.prototype;
				},
				
				'Super(key)': function () {
					return this.testObj2.Super('inheritanceTest') === 'test';
				},
				
				'Super(method)': function () {
					return this.testObj2.Super('supertest');
				}
			},
			
			'instantiate without "new"': function () {
				this.testObj3 = this.protoTest2(true);
				return this.testObj3.initialized2;
			},
			
			'$.noInit': function () {
				this.testObj4 = new this.protoTest2($.noInit);
				return !this.testObj4.initialized && !this.testObj4.initialized2;
			},
			
			'$.noInit without new': function () {
				this.testObj5 = this.protoTest2($.noInit);
				return !this.testObj5.initialized && !this.testObj5.initialized2;
			}
		}
	}
}