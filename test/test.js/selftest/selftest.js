selftest = {
	setup: function () {
		this.contextCreated = true
	},
	
	information: {
		'jazztest version': test.version,
		frontend: test.frontend.name,
		'frontend version': test.frontend.version
	},
	
	'Was the setup applied?': function () {
		return this.contextCreated === true;
	},
	
	nesting: {
		setup: function () {
			this.contextCreated = 'test'
		},
		
		'setup override': function () {
			return this.contextCreated == 'test'
		},
		
		'access overwritten': function() {
			return this.Super.contextCreated === true
		}
	},
	
	'context unharmed?': function () {
		return this.contextCreated === true
	},
	
	failtest: function () {
		return false;
	},
	
	crashtest: function () {
		throw 'Test exeption'
	}
};

// node.js
if (typeof module != 'undefined') module.exports = selftest;
