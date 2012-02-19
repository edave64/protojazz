// test.js 0.1 (c) 2011 EDave
// test.js is freely distributable under the terms of an MIT-style license.
// For details, see the test.js project page: http://edave64.github.com/test.js/

// TODO: lots of cleanup

(function () {
	test = function (testListing) {
		var statistics = new test.statistic ();
		var result = test.runSection(testListing, statistics);
		test.frontend.printStatistics(statistics);
		return result;
	};

	test.version = '0.1';

	test.runSection = function (testListing, statistics, superContext, container) {
		if (!superContext) superContext = {};
		if (!container)    container    = test.frontend.rootContainer();

		// Handle context inheritance
	    var tempConstructor = function () {};
	    tempConstructor.prototype = superContext;
	    var context = new tempConstructor();
	    context.Super = superContext;

	    if (testListing.setup)
	      testListing.setup.call(context);
	    delete testListing.setup;

	    for (activeTest in testListing) {
	    	var value = testListing[activeTest];

	    	// Allows functions or other tests
	    	if (value.call) {
	    		test.runTest(activeTest, value, statistics, context, container);
	    	} else if (typeof value == 'object') {
	    		// A new test subset
	    		var newContainer = test.frontend.container(activeTest, container);
	    		test.runSection(value, statistics, context, newContainer);
	    	} else {
	    		test.frontend.information(activeTest, value, container);
	    	}
	    }
	    
	    return container;
	};

	test.runTest = function (name, testFunction, statistics, context, container) {
		var testOutput = test.frontend.test(name, container);
		statistics.tests.push(name);

		try {
			if (testFunction.call(context)) {
			  testOutput.ok();
			  statistics.oks.push(name);
			} else {
			  testOutput.fail();
			  statistics.fails.push(name);
			}
		} catch (e) {
			testOutput.crash(e);
		    statistics.crashes.push(name);
		}
	};

	test.frontend = {};

	test.statistic = function () {
		this.oks     = [];
		this.fails   = [];
		this.crashes = [];
	    this.tests   = [];
	};

	//node or browser?
	if (typeof module == 'undefined')
	    this.test = test;
	else
	    module.exports = test;
})()
