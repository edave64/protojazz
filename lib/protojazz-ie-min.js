/* Protojazz 0.5
 * (c) 2011 EDave
 *
 * Protojazz is freely distributable under the terms of an MIT-style license.
 * For details, see the Prototype web site: http://edave64.github.com/protojazz/
*/
$.applyAttr=function(f,a){var b={};if(a.getters){for(var d in a.getters)b[d]={
get:a.getters[d]};delete a.getters}if(a.setters){for(var c in a.setters)b[c]?b[c
].set=a.setters[c]:b[c]={set:a.setters[c]};delete a.setters}for(var e in b)
Object.defineProperty(f,e,b[e])};