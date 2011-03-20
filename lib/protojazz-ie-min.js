/* Protojazz 0.4
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Prototype web site: http://edave64.github.com/protojazz/
*/
$.applyAttr=function(e,a){var b={};if(a.getters){for(var d in a.getters)b[d]={
get:a.getters[d]};delete a.getters}if(a.setters){for(var c in a.setters)if(b[c])
b[c].set=a.setters[c];else b[c]={set:a.setters[c]};delete a.setters}for(var f in
b)Object.defineProperty(e,f,b[f])};