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
if (typeof $ == 'undefined') $={};

$.proto = function (mother, obj) {
    if (typeof obj == 'undefined') {
        obj = mother;
        mother = {};
    }
    var o = function(){
        (this.init||function(){}).apply(this,arguments);
    };
    o.prototype = {};
    if (typeof obj == 'function') {
        var _obj = {};
        obj.call(_obj);
        obj = _obj;
    }
    if (obj.self) {
        $.extend(o, obj.self);
        delete obj.self;
    }
    $.applyAttr(o.prototype, obj);
    $.extendP(o, obj);
    o.prototype.__proto__ = mother.prototype;
    o.prototype.parent = mother.prototype;
    return o;
};

$.applyAttr = function (dest,src) {
    if (src.getters) {
        for (var getter in src.getters)
            dest.__defineGetter__(getter,src.getters[getter]);
        delete src.getters;
    }
    if (src.setters) {
        for (var setter in src.setters)
            dest.__defineSetter__(setter,src.setters[setter]);
        delete src.setters;
    }
}

$.extend = function (dest,src) {
    if (typeof src == "function") src.call(dest);
    else for (var key in src) if (src.hasOwnProperty(key)) dest[key] = src[key];
};

$.extendP = function (dest,src) {
    $.extend(dest.prototype, src);
};