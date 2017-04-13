var SVG = require('svg-json-parser');
var extend = require('util')._extend;
function loadFolder(url){
	var fp = SVG.load.folder(url)
	for(var name in fp){
		var e = fp[name];
		if(e.children.length == 1){
			e.children[0].viewBox = e.attr.viewBox ;
			fp[name] = e.children[0];
		}else{
			e.viewBox = e.attr.viewBox ;
			delete	fp[name].attr ;
			e.node = "g";
		}
	}
	return fp ;
}
function strArray (a){return typeof a === "string" ? [a]:a;}
module.exports = function(source) {
	this.cacheable && this.cacheable();
	var map = typeof source === "string" ? JSON.parse(source):null;
	var value = {};
	if(map){
		if(map.folder){
			strArray(map.folder).forEach((e)=>{
				value = extend(value,loadFolder(e));
			})
		}
		if(map.lib){strArray(map.lib).forEach((e)=>{value = extend(value,SVG.load.lib(e));})}
		if(map.costum){	for(var id in map.costum){value[id] = SVG.load.lib(map.costum[id]);}}
	}
	this.value = [value];
	return "module.exports = " + JSON.stringify(value, undefined, "\t") + ";";
}
