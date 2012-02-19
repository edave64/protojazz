// protojazz 0.8 (c) 2011 EDave
// protojazz is freely distributable under the terms of an MIT-style license.
// For details, see the protojazz project page: http://edave64.github.com/protojazz/
(function ($) {
    $.protojazzVersion = "0.8";
    
    var func = 'function'; // used for compression
    
    // $.extend
    //
    // Usage:
    // a) $.extend({ destination object }, { source object })
    // b) $.extend({ destination object }, function () { source function })
    // 
    // Explanation:
    // a) Pushes every key-value-pair from ''source'' to ''destination''
    // b) Calles the ''source'' function with the ''destination'' object as
	//    this object
    // 
    // Examples:
    // a) var example = {};
    //    $.extend(example, { a: 32 });
    //    example.a; //=> 32
    // 
    // b) var example = {};
    //    $.extend(example, function () { this.a = 32 });
    //    example.a; //=> 32
    //
    $.extend = function(destination, source) {
        if (typeof source == func)
            source.call(destination);
        else
            for(var key in source)
                if (source.hasOwnProperty(key))
                    destination[key] = source[key];
        return destination;
    };
    
    // $.get
    // 
    // Usage:
    //  $.getP(obj);
    // 
    // Explanation:
    //  Returns the prototype object of ''obj''
    // 
    // Warning: This doesn't work for primitives, such as Number or String
    $.getP = Object.getPrototypeOf ||
        // Opera does not support ''Object.getPrototypeOf'', but
		// ''obj.__proto__''
        function(obj) {
            return obj.__proto__;
        };

    // $.proto
    // 
    // Usage:
    // a) $.proto({ template object })
    // b) $.proto(function() { template function })
    // c) $.proto(function() { parent }, templateLikeInAOrB)
    //
    // Explanation:
    // a) Creates a new constructor function. Every key-value-pair from the
    //    ''template object'' will be pushed into the prototype.
    // b) Same as in case a, but the template function will be called with the
    //    prototype as ''thisObj'', so it can add key-value-pairs to it.
    // c) In that case, the prototype will inherit from the given ''parent''.
    //    If no parent is given, like in a and b, it will default to $.global.
    //    Note that constructor attributes won't be inherited.
    // 
    // Additional:
    // * the ''init'' method will be called on every instanciated object, as
    //   long this is not suppressed by $.noInit.
    // * the ''self'' attribute can contain an object, which will be used to
    //   extend the constructor itself.
    // * The created constructor can be instantitated by simply call it as a
    //   method, but you should do it with the ''new'' statement, except you
    //   want to use ''.apply'' or ''.call''
    // 
    // Example:
    // a) protoTest = $.proto({
    //         testAttribute: 'this is a test',
    //      initialized: false,
    // 
    //      init: function () {
    //           this.initialized = true
    //      },
    //      
    //      self: {
    //           static: 'example'
    //         }
    //    })
    //    
    //    testing = new protoTest ();
    //    testing.testAttribute; //=> 'this is a test'
    //    testing.initialized;   //=> true
    //    protoTest.static       //=> 'example'
    // 
    // b) // same as above, but with other syntax:
    //    protoTest = $.proto(function () {
    //         this.testAttribute = 'this is a test';
    //      this.initialized = false,
    // 
    //      this.init = function () {
    //           this.initialized = true
    //      }
    // 
    //      this.self = {};
    //      this.self.static = 'example';
    //    })
    // 
    // c) secoundTest = $.proto(protoTest, {
    //         testAttribute: 'this was overwritten'
    //    })
    //    testing2 = new secoundTest ();
    //    testing2.testAttribute; //=> 'this was overwritten'
    //    testing2.initialized;   //=> true
    //    secoundTest.static      //=> undefined
    // 
    $.proto = function(parent, template) {
        // create the constructor we will work on
        var constructor = $.construct();
        
        // handle case a and b, were the template is the only argument
        if (!template)
            template = parent, parent = $.global;
          
        // inherit and alias the prototype (for readablility and compression)
        var prototype = constructor.prototype = new parent($.noInit);
        
        // recreate broken constructor reference
        prototype.constructor = constructor;
        $.extend(prototype, template);
        
        // apply the ''self'' attribute and cleanup
        if (prototype.self)
            $.extend(constructor, prototype.self);
        delete prototype.self;
        
        // handle the ''inherited'' parameter of the parent
        if (parent.inherited) parent.inherited(constructor);
        return constructor;
    };
    
    // $.noInit
    // 
    // Usage:
    //  * new protojazzGeneratedConstructor ($.noInit)
    //  * protojazzGeneratedConstructor ($.noInit)
    // 
    // Explanation:
    //  This creates a new instance of the ''protojazzGeneratedConstructor'',
    //  without calling the ''init'' method.
    // 
    // Example:
    //  noInitTesting = new protoTest ($.noInit);
    //  noInitTesting.initialized //=> false
    $.noInit = {};
    
    // $.construct
    // 
    // Usage:
    //  $.construct()
    //
    // Explanation:
    //  Creates a barebone protojazz constructor. This is basicly for not
	//  having nested ''function'' statement inside $.proto and for addons to
	//  extend or modify its behavior.
    //
    // Additional:
    //  This constructor allows you to create new instances without the ''new''
    //  statement.
    $.construct = function() {
        return (function proto () {
        	// compression shortcuts
        	var args = arguments,
        	    init = args[0] != $.noInit;
        	
        	// Handle the call without ''new''
            if(!(this instanceof proto)) {
                var obj = new proto($.noInit);
                if (init) obj.init.apply(obj, args);
                return obj;
            }
            
            if (init) this.init.apply(this, args);
        });
    };

    // default parent prototype for every constructor created by protojazz
    $.global = $.proto(function() { /* prevents self reference */ },{
        // obj.Super
        // 
        // Usage:
        // a) obj.Super()
        // b) obj.Super(key)
        // c) obj.Super(method_key, *args)
        // 
        // Explanation:
        // a) Returns parent prototype of ''obj'''s prototype
        // b) Returns an overwritten value from the prototype descriped in a
        // c) If that value is method, it will automaticly be called with *args
        //    as arguments.
        //    If you want to prevent this behavior, use ''obj.Super()[key]''
        // 
        // Example:
        // a) testing2.Super()                 //=> protoTest.prototype
        // b) testing2.testAttribute;          //=> 'this was overwritten'
        //    testing2.Super('testAttribute'); //=> 'this is a test'
        Super : function(key) {
            var value = $.getP($.getP(this));
            
            // Handle case a
            if(!key) return value;
            
            value = value[key];
            
            return typeof value == func ?
			    value.apply(this, [].slice.call(arguments, 1)) : value;
        },
        
        // init
        //
        // Actually the initialization method of protojazz object, but this is
        // a simple stub to prevent that the constructor runs into a undefined.
        init : function() {},
        
        // object.isA
        // 
        // Usage:
        //  obj.isA(constructor)
        //
        // Explanation:
        //  abbriviation for ''obj instanceof constructor''
        //
        // Example:
        //  testing2.isA(protoTest) //=> true
        isA : function(constructor) {
            return this instanceof constructor;
        }
    });
// Browser or Node.js?
})(typeof module == 'undefined' ? this.$ || (this.$ = {}) : exports);