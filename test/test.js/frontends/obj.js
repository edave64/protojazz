(function(test) {
    var frontend = {
        name : 'json',
        version : '0.1',

        rootContainer : function() {
            return {}
        },
        test : (function() {
            function test(name, container) {
                if(!(this instanceof test))
                    return new test(name, container);
                else {
                    this.name = name;
                    this.container = container;
                }
            };


            test.prototype.ok = function() {
                this.container[this.name] = true
            };

            test.prototype.fail = function() {
                this.container[this.name] = false;
            };

            test.prototype.crash = function(error) {
                this.container[this.name] = 'crash'
            };
            return test;
        })(),

        container : function(name, container) {
            return container[name] = {}
        },
        printStatistics : function(statistics) {
        },
        information : function(name, value, container) {
            container[name] = value
        }
    };

    if( typeof module == 'undefined')
        test.frontend = frontend;
    else
        module.exports = frontend;
})(this.test)