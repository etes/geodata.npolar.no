define(['dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin', 'dijit/form/Button', 'dojo/_base/lang', 'dojo/string', 'dojo/text!./placename/templates/placename.html', 'esri/renderers/SimpleRenderer', 'esri/symbols/PictureMarkerSymbol', 'esri/layers/GraphicsLayer', 'esri/graphic', 'esri/SpatialReference', 'esri/geometry/webMercatorUtils', 'esri/tasks/ProjectParameters'], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Button, lang, string, placenameTemplate, statsTemplate, SimpleRenderer, PictureMarkerSymbol, GraphicsLayer, Graphic, SpatialReference, webMercatorUtils, ProjectParameters) {
	//anonymous function to load CSS files required for this module
	( function() {
			var css = [require.toUrl("gis/dijit/placename/css/placename.css")];
			var head = document.getElementsByTagName("head").item(0), link;
			for (var i = 0, il = css.length; i < il; i++) {
				link = document.createElement("link");
				link.type = "text/css";
				link.rel = "stylesheet";
				link.href = css[i].toString();
				head.appendChild(link);
			}
		}());
	//Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
	Proj4js.defs["EPSG:32633"] = "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
	var wgs84 = new Proj4js.Proj('EPSG:4326');
	var utm33 = new Proj4js.Proj('EPSG:32633');
	var position, placenameGraphic, graphic;

	// main placename widget
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : placenameTemplate,
		widgetsInTemplate : true,
		baseClass : 'gis_placename_Dijit',
		inputClass : 'placenameInput',
		postCreate : function() {		
		function w84_to_u33(event) {
			var north, east;
			north = event.north;

			east = event.east;
			position = new Proj4js.Point(east, north);
			Proj4js.transform(wgs84, utm33, position);
		};
		themap = this.map;
		//@TODO make function reusable
		function add_marker(position) {
			themap.graphics.remove(placenameGraphic);
			// uses Esri picture marker symbol
			var symbol = new esri.symbol.PictureMarkerSymbol({
				"angle" : 0,
				"xoffset" : 0,
				"yoffset" : 10,
				"type" : "esriPMS",
				"url" : "http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
				"contentType" : "image/png",
				"width" : 24,
				"height" : 24
			});
			placenameGraphic = new esri.Graphic(new esri.geometry.Point(position.x, position.y), symbol);
			themap.graphics.add(placenameGraphic);
			
			// zoom to point coordinates
			
			themap.setExtent(new esri.geometry.Extent(position.x - 20000, position.y, position.x + 20000, position.y, themap.spatialReference));
		};
		
		$("#search-input").autocomplete({
			source : function(request, response) {
				$.ajax({
					// @ TODO use api.npolar.no
					url : "http://placenames.npolar.no/stadnamn/edge/",
					dataType : "jsonp",
					data : {
						q : request.term,
						approved : true,
						rows : 8,
						hemisphere : "n",
					},
					success : function(data) {
						response($.map(data, function(item) {
							return {
								label : item.title + " (" + item.terrain + ")",
								value : item.title,
								object : item
							};
						}));
					}
				});
			},
			minLength : 1,
			select : function(event, ui) {
				w84_to_u33(ui.item.object);
				add_marker(position);
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {
			var re = new RegExp("(" + $.ui.autocomplete.escapeRegex(this.term) + ")", "gi");
			item.label = item.label.replace(re, "<strong>$1</strong>");
			return $("<li></li>").data("ui-autocomplete-item", item).append($("<a></a>").html(item.label)).appendTo(ul);
		};
		// disable enter key in input boxes
		$('#search-input').keypress(function(e){
			if ( e.which == 13 ) return false;
			//or...
			if ( e.which == 13 ) e.preventDefault();
			});
		},
	add_search: function() {

	}
	});
}); 