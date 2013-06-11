/*
 * A JavaScript library for interactive maps of Norwegian Polar Institute. Based on Proj4js library and Esri Javascript API

 * @requires proj4js-compressed.js
 * @requires ArcGIS API for Javascript http://serverapi.arcgisonline.com/jsapi/arcgis/?v=3.4
 */

// Create projection definition of UTM33
//Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
Proj4js.defs["EPSG:32633"] = "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

var wgs84 = new Proj4js.Proj('EPSG:4326');
var utm33 = new Proj4js.Proj('EPSG:32633');
var position, graphic;
// transform placename coordinates from wgs84 to utm 33
function WGS84ToUTM33(event) {
	var north, east;
	north = event.result.raw.north;

	east = event.result.raw.east;
	position = new Proj4js.Point(east, north);
	// transform to UTM33
	Proj4js.transform(wgs84, utm33, position);
	//console.log(position);
}

// Add point marker to map and zoom to that position
function addMarker(position){
	
	// uses Esri picture marker symbol
	var symbol = new esri.symbol.PictureMarkerSymbol(
			{
				"angle" : 0,
				"xoffset" : 0,
				"yoffset" : 10,
				"type" : "esriPMS",
				// "url" : "/img/BluePin1LargeB.png",
				"url" : "http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
				"contentType" : "image/png",
				"width" : 24,
				"height" : 24
			});
	graphic = new esri.Graphic(new esri.geometry.Point(position.x, position.y),
			symbol);
	graphicLayer.clear();
	graphicLayer.add(graphic);
	
	// zoom to point coordinates
	map.setExtent(new esri.geometry.Extent(position.x - 20000, position.y,
			position.x + 20000, position.y, map.spatialReference));	
}
