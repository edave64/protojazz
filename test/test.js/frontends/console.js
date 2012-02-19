var colors = require('colors');

// no browser support needed
module.exports = {
	name: 'console',
	version: '0.1',

	rootContainer: function () { return '' },

	test: (function () {
		function test (name, container) {
			if (!(this instanceof test))
				return new test (name, container);
			else {
				this.name = name;
				this.container = container;
			}
		};

		test.prototype.print = function (state) {
			console.log(this.container + this.name + (state != '' ? ' ' + state : ' '));
		};

		test.prototype.ok = function () {
			this.print('[ ok ]'.green);
		};

		test.prototype.fail = function () {
			this.print('[fail]'.red);
		};

		test.prototype.crash = function (error) {
			this.print('[crash]'.red.bold);
			console.log(this.container + error.toString());
		};

		return test;
	})(),

	container: function (name, container) {
		console.log(container + name + ':');
		return container + '  ';
	},

	printStatistics: function (statistics) {
		var count = function (section) { return statistics[section].length },
		    tests = count('tests'),
		    oks = count('oks'),
		    fails = count('fails'),
		    crashes = count('crashes');

		console.log();
		console.log('Results:');
		console.log('Test count: ' + tests)
		
	    if(oks)     console.log('Test count: '    + oks     + '/' + tests);
	    if(fails)   console.log('Tests failed: '  + fails   + '/' + tests);
	    if(crashes) console.log('Tests crashed: ' + crashes + '/' + tests);
	},

	information: function (name, value, container) {
		console.log(container + name + ': ' + value.toString());
	}
};
