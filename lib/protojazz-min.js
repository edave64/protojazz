/* Protojazz 0.4
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Prototype web site: http://edave64.github.com/protojazz/
*/
if(typeof $=="undefined")$={};$.proto=function(b,a){if(!a){a=b;b=$.global||
function(){}}var c=function(){(this.init||function(){}).apply(this,arguments)};c
.prototype={};if(typeof a=="function"){var d={};a.call(d);a=d}b.inherited&&b.
inherited(a);if(a.self){$.extend(c,a.self);delete a.self}c.prototype=new b;$.
applyAttr(c.prototype,a);$.extendP(c,a);c.prototype._parent=b.prototype;return c
};$.applyAttr=function(b,a){if(a.getters){for(var c in a.getters)b.
__defineGetter__(c,a.getters[c]);delete a.getters}if(a.setters){for(var d in a.
setters)b.__defineSetter__(d,a.setters[d]);delete a.setters}};$.extend=function(
b,a){if(typeof a=="function")a.call(b);else for(var c in a)if(a.hasOwnProperty(c
))b[c]=a[c]};$.extendP=function(b,a){$.extend(b.prototype,a)};$.global=$.proto({
parent:function(b){if(typeof this._parent[b]=="function")return this._parent[b].
apply(this,[].slice.call(arguments,1));return this._parent[b]}});