/* Protojazz 0.4
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Prototype web site: http://edave64.github.com/protojazz/
*/
if (typeof $ == 'undefined') $={};

$.proto = function (mother, obj) {
    if (!obj) {
        obj = mother;
        mother = $.global||function(){};
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
    if (!!mother.inherited) mother.inherited(obj);
    if (obj.self) {
        $.extend(o, obj.self);
        delete obj.self;
    }
    o.prototype = new mother();
    $.applyAttr(o.prototype, obj);
    $.extendP(o, obj);
    o.prototype._parent = mother.prototype;
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
    else for (var key in src)
        if (src.hasOwnProperty(key)) dest[key] = src[key];
};

$.extendP = function (dest,src) {
    $.extend(dest.prototype,src);
};

$.global = $.proto({
    parent: function (key) {
        if(typeof this._parent[key]=='function')
            return this._parent[key].apply(this,[].slice.call(arguments, 1));
        return this._parent[key];
    }
});