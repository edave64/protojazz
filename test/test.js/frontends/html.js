(function (test) {
	// Implement short jquery-like abstraction for style and compression
	var string = 'string',
	    div    = 'div',
	    span   = 'span',
	    ok     = 'ok',
	    create = function (tagname) {
			if (this instanceof create)
				if (typeof tagname == string)
					this.element = document.createElement(tagname);
				else
					this.element = tagname;
			else
				return new create (tagname);
		};

	create.prototype = {
		klass: function (value) {
			this.element.className = value;
			return this;
		},
		html: function (value) {
			this.element.innerHTML = value;
			return this;
		},
		append: function (other) {
			if (typeof other == string)
				this.element.appendChild(document.createTextNode(other));
			else
				this.element.appendChild(other.element);
			return this;
		},
		appendTo: function (other) {
			other.element.appendChild(this.element);
			return this;
		}
	};

	test.frontend = {
		name: 'html',
		version: '0.1',

		rootContainer: function () {
		    return create(document.body)
		},

		test: (function () {
			function test (name, container) {
				if (!(this instanceof test))
					return new test (name, container);
				else {
					this.name = name;
					this.container = container;
				}
			};

			test.prototype.putIntoDOM = function (state) {
				var testName = create(span).html(this.name),

				    testState = create(span)
				      .html('['+((state == ok) ? ' ok ' : state)+']')
				      .klass(state),

				    testWrapper = create(div)
				      .klass('test')
				      .append(testName)
				      .append(testState)
				      .appendTo(this.container);
			};

			test.prototype.ok = function () {
				this.putIntoDOM(ok);
			};

			test.prototype.fail = function () {
				this.putIntoDOM('fail');
			};

			test.prototype.crash = function (error) {
				this.putIntoDOM('crash');

				var errorWrapper = create(div)
				      .klass('error')
				      .html(error.toString())
				      .appendTo(this.container);
			};

			return test
		})(),

		container: function (name, container) {
			var containerName = create(span)
			      .html(name + ':'),

			    subcontainer = create(div)
			      .klass('subsection'),

		        containerWrapper = create(div)
		          .klass(container)
		          .append(containerName)
		          .append(subcontainer)
		          .appendTo(container);

			return subcontainer;
		},

		printStatistics: function (statistics) {
			var count = function (section) {
					return statistics[section].length
			    },
			    tests = count('tests'),
			    oks = count('oks'),
			    fails = count('fails'),
			    crashes = count('crashes');

			this.rootContainer()
				.append(create('br'))
				.append('Result:');

			this.information('Test count', tests, this.rootContainer())
			
		    if(oks) 
		    	this.information('Tests passed', oks+'/'+tests, this.rootContainer());
		    if(fails) 
		    	this.information('Tests failed', fails+'/'+tests, this.rootContainer());
		    if(crashes) 
		    	this.information('Tests crashed', crashes+'/'+tests, this.rootContainer());
		},

		information: function (name, value, container) {
			var informationName = create(span)
			      .html(name),

		        valueWrapper = create(span)
			      .html(value.toString()),

			    informationWrapper = create(div)
		          .klass('test')
		          .append(informationName)
		          .append(valueWrapper)
		          .appendTo(container);

			return informationWrapper;
		}
	};
// no node.js support needed
})(this.test)
