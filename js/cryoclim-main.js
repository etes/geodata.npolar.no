/**
 * @author ermias
 */
//dojo.require("dijit.dijit");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.layout.ExpandoPane");
dojo.require("dijit.layout.StackContainer");
//uncomment if want dojo widget style checkbox
//dojo.require('dijit.form.CheckBox');
dojo.require("esri.map");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dojo.fx");
//needed if use jsapi 3.0
dojo.require("agsjs.dijit.TOC");
//dojo.provide("myModules.custommenu");
//dojo.require("dijit.MenuItem");
dojo.require("esri.dijit.OverviewMap");
//For measurement widget
dojo.require("dijit.TitlePane");
dojo.require("dijit.form.CheckBox");
dojo.require("esri.dijit.Measurement");
dojo.require("esri.SnappingManager");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.dijit.Popup");

//For identify tool
dojo.require("esri.tasks.identify");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.form.Button");
dojo.require("dijit.dijit");

dojo.require("esri.toolbars.navigation");
dojo.require("dijit.Toolbar");
dojo.require("esri.dijit.Legend");
dojo.require("esri.arcgis.utils");
//optimize: load dijit layer
dojo.require("dijit.form.DropDownButton");
dojo.require("esri.dijit.Bookmarks");
dojo.require("dijit.form.Button");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.TextBox");

//dojo.requireLocalization("esriTemplate","template");
var navToolbar;
      
var map;
var identifyTask, identifyParams,identifyListener;
var symbol;
var layer2results, layer3results, layer4results;
function init() {

	esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://geodata.npolar.no/ArcGIS/rest/services/geometry/Geometry/GeometryServer");

	var initialExtent = new esri.geometry.Extent({
		xmin : 101126.74419537,
		ymin : 8189436.56471365,
		xmax : 1222892.39341308,
		ymax : 9043658.10721954,
		"spatialReference" : {
			"wkid" : 32633
		}
	});

	//setup the popup window
	var popup = new esri.dijit.Popup({
		fillSymbol : new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
	}, dojo.create("div"));
	


	map = new esri.Map("map", {
		infoWindow : popup,
		extent : initialExtent,
		logo : false
	});

	dojo.place(popup.domNode, map.root);
	//dojo.addClass(map.infoWindow.domNode, "myTheme");

	//Add the basemap service to the map
	var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://geodata.npolar.no/ArcGIS/rest/services/inspire1/NP_TopoNordomr_U33_CHX/MapServer");
	map.addLayer(basemap);

	var glaciers = new esri.layers.ArcGISDynamicMapServiceLayer("http://geodata.npolar.no/ArcGIS/rest/services/CryoClim/glaciers/MapServer", {
		id : 'glaciers',
		opacity : 1.0
	});
	map.addLayers([glaciers]);
	
	// Table of Contents and Meauserment
	dojo.connect(map, 'onLayersAddResult', function(results) {
		var toc = new agsjs.dijit.TOC({
			map : map,
			layerInfos : [{
				layer : glaciers,
				title : "glaciers",
				//noLegend: true,
				slider : true,
				collapsed : false
			}]
		}, 'standardDiv');
		toc.startup();
		

		//Measurement Widget

		var measurement = new esri.dijit.Measurement({
			map : map
		}, dojo.byId('measurementDiv'));

		measurement.startup();
		//End of Measurement Widget
	});

	// Restrict users only to map extent
	dojo.connect(map, "onExtentChange", function() {
		var extent = map.extent.getCenter();
		if (initialExtent.contains(extent)) {
		} else {
			map.setExtent(initialExtent)
		}
	});

	dojo.connect(map, 'onLoad', mapReady);

	//	Navigation ToolBar
	navToolbar = new esri.toolbars.Navigation(map);
	dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);

}
