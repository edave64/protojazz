// Protojazz 0.8 (c) 2011 EDave
// Protojazz is freely distributable under the terms of an MIT-style license.
// For details, see the Protojazz web site: http://edave64.github.com/protojazz/
(function($){var z='function';$.protojazzVersion="0.8";$.extend=function(a,b){if(typeof b==z)b.call(a);else for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};$.getP=Object.getPrototypeOf||function(a){return a.__proto__};$.proto=function(d,b){var c=$.construct();if(!b)b=d,d=$.global;var e=c.prototype=new d($.noInit);e.constructor=c;$.extend(e,b);e.self&&$.extend(c,e.self);delete e.self;d.inherited&&d.inherited(c);return c};$.noInit={};$.construct=function(){return function b(){var c=arguments,e=c[0]!=$.noInit;if(!(this instanceof b)){var f=new b($.noInit);e&&f.init.apply(f,c);return f}e&&this.init.apply(this,c)}};$.global=$.proto(function(){},{Super:function(d){var b=$.getP($.getP(this));if(!d)return b;b=b[d];return typeof b==z?b.apply(this,[].slice.call(arguments,1)):b},init:function(){},isA:function(a){return this instanceof a}})})(this.$||(this.$={}));