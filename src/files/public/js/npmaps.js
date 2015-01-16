/*
 * A JavaScript library for interactive maps of Norwegian Polar Institute. Based on Proj4js library and Esri Javascript API

 * @requires proj4.js
 * @requires ArcGIS API for Javascript
 */

var Npmaps = function(options) {

	this.position,
	this.graphic;
	options = options || {};
	this.map = options.map;
	this.projection = options.projection || '25833';

	// Fetches Proj4 definition from http://epsg.io
	this._fetch = function(code) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '//epsg.io/' + code + '.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	// Create projection definition if not a known projection
	try {
		proj4('EPSG:' + this.projection);
	} catch (e) {
		this._fetch(this.projection);
	}

	// transform placename coordinates from wgs84 to utm
	this.wgs84ToUtm = function(event) {
		var wgs84 = new proj4('EPSG:4326');
		var utm = new proj4('EPSG:' + this.projection);
		var north, east;
		north = event.result.raw.north;
		east = event.result.raw.east;
		// transform to UTM
		return proj4(wgs84,utm, [east, north]);
	}

	// Add point marker to map and zoom to that position
	this.addMarker = function(map, xy){

		// uses Esri picture marker symbol
		var symbol = new esri.symbol.PictureMarkerSymbol(
			{
				"angle" : 0,
				"xoffset" : 0,
				"yoffset" : 10,
				"type" : "esriPMS",
				"url" : "http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
				"contentType" : "image/png",
				"width" : 24,
				"height" : 24
			});
			graphic = new esri.Graphic(new esri.geometry.Point(xy[0], xy[1]),
			symbol);
			graphicLayer.clear();
			graphicLayer.add(graphic);

			// zoom to point coordinates
			map.setExtent(new esri.geometry.Extent(xy[0] - 20000, xy[1],
				xy[0] + 20000, xy[1], map.spatialReference));
		}

		this.addGraphics = function (map, geometry) {

			//create a random color for the symbols
			var r = Math.floor(Math.random() * 250);
			var g = Math.floor(Math.random() * 100);
			var b = Math.floor(Math.random() * 100);

			//Marker symbol used for point created using svg path. See this site for more examples
			// http://raphaeljs.com/icons/#talkq. You could also create marker symbols using the SimpleMarkerSymbol class
			//to define color, size, style or the PictureMarkerSymbol class to specify an image to use for the symbol.
			var markerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.5]), 10), new dojo.Color([r, g, b, 0.9]));

			//line symbol used for polyline.
			var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([r, g, b, 0.85]), 6);

			//a simple fill symbol used for extent, polygon and freehand polygon.
			var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([r, g, b]), 2), new dojo.Color([r, g, b, 0.3]));

			var type = geometry.type, symbol;
			if (type === "point") {
				symbol = markerSymbol;
			} else if (type === "polyline") {
				symbol = lineSymbol;
			} else {
				symbol = fillSymbol;
			}

			//Add the graphic to the map
			map.graphics.add(new esri.Graphic(geometry, symbol));
		}

};
