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

	// transform placename coordinates from wgs84 to utm
	this.wgs84ToUtm = function(event) {
		// Create projection definition if not known projection
		try {
			proj4('EPSG:' + this.projection);
		} catch (e) {
			this._fetch(this.projection);
		}

		var wgs84 = new proj4('EPSG:4326');
		var utm = new proj4('EPSG:' + this.projection);
		var north, east;
		north = event.result.raw.north;
		east = event.result.raw.east;
		// transform to UTM
		this.position = proj4(wgs84,utm, [east, north]);
	}

	// Add point marker to map and zoom to that position
	this.addMarker = function(xy){

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
			graphic = new esri.Graphic(new esri.geometry.Point(xy[0], xy[1]),
			symbol);
			graphicLayer.clear();
			graphicLayer.add(graphic);

			// zoom to point coordinates
			this.map.setExtent(new esri.geometry.Extent(xy[0] - 20000, xy[1],
				xy[0] + 20000, xy[1], map.spatialReference));
		}

};
