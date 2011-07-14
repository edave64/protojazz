/* Protojazz 0.7
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Protojazz web site: http://edave64.github.com/protojazz/
*/

$.applyAttr = function (dest,src) {
    var attrs = {}
    if (src.getters) {
        for (var getter in src.getters)
            attrs[getter] = {get:src.getters[getter]};
        delete src.getters;
    }
    if (src.setters) {
        for (var setter in src.setters)
            if (!attrs[setter]) attrs[setter] = {}
            attrs[setter].set = src.setters[setter];
        delete src.setters;
    }
    for (var attr in attrs) Object.defineProperty(dest, attr, attrs[attr]);
}