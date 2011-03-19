/*
Copyright (c) 2011 EDave

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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