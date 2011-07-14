/* Protojazz 0.7
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Protojazz web site: http://edave64.github.com/protojazz/
*/
if(!$)var $={};$.noInit={};$.proto=function(b,a){if(!a)a=b,b=$.global;var c=function(){if(this==window){var a=new c($.noInit);a.init.apply(a,arguments);return a}else arguments[0]!=$.noInit&&this.init.apply(this,arguments)};c.prototype={};if(typeof a=="function"){var d={};a.call(d);a=d}a.self&&($.extend(c,a.self),delete a.self);c.prototype=new b($.noInit);$.extendP(c,a);b.inherited&&b.inherited(c);return c};
$.applyAttr=function(b,a){if(a.getters)for(var c in a.getters)b.__defineGetter__(c,a.getters[c]);if(a.setters)for(var d in a.setters)b.__defineSetter__(d,a.setters[d]);delete a.getters;delete a.setters};$.extend=function(b,a){if(typeof a=="function")a.call(b);else for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);$.applyAttr(b,b)};$.extendP=function(b,a){$.extend(b.prototype,a)};
$.global=$.proto(function(){},{super:function(b){var a=Object.getPrototypeOf,c=a(a(this))[b];if(!b)return a(a(this));if(typeof c=="function")return c.apply(this,[].slice.call(arguments,1));return c},init:function(){}});