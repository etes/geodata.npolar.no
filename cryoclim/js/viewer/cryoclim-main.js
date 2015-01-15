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
var dynaLayer1, dynaLayer2;
var identifyTask, identifyParams,identifyListener;
var idParams;
var identifyHandle;
var visible = [];
var visibleLayers = [];
var symbol;
var layer2results, layer3results, layer4results;
var basemapServiceUrl = "http://geodata.npolar.no/ArcGIS/rest/services/inspire1/NP_TopoNordomr_U33_CHL/MapServer";
var overlayMapService = "http://geodata.npolar.no/ArcGIS/rest/services/CryoClim/glaciers/MapServer";
var overlayMapService2 = "http://geodata.npolar.no/ArcGIS/rest/services/CryoClim/glaciersurfacetypes/MapServer";
var geometryServiceUrl = 'http://geodata.npolar.no/arcgis/rest/services/Utilities/Geometry/GeometryServer';
function init() {

	esri.config.defaults.geometryService = new esri.tasks.GeometryService(geometryServiceUrl);

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
		extent : initialExtent,
		infoWindow : popup,
		logo : false
	});
	
	

	dojo.place(popup.domNode, map.root);
	//dojo.addClass(map.infoWindow.domNode, "myTheme");

	//Add the basemap service to the map
	var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapServiceUrl, {showAttribution: false});
	map.addLayer(basemap);

	dynaLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(overlayMapService, {showAttribution: false, opacity : 0.8});
	dynaLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer(overlayMapService2, {showAttribution: false, opacity : 0.8});
	
	var h = dojo.connect(map, 'onLayersAddResult', function(results) {
		// overwrite the default visibility of service.
		// TOC will honor the overwritten value.
		dynaLayer1.setVisibleLayers([]);
		dynaLayer2.setVisibleLayers([]);
		try {
			toc = new agsjs.dijit.TOC({
				map : map,
				layerInfos : [
				{
					layer : dynaLayer2,
					title : "Glacier Surface Types",
					//collapsed: false, // whether this root layer should be collapsed initially, default false.
					slider : true, // whether to display a transparency slider. default false.
					autoToggle : true //whether to automatically collapse when turned off, and expand when turn on for groups layers. default true.
				},
				{
					layer : dynaLayer1,
					title : "Glaciers",
					//collapsed: false, // whether this root layer should be collapsed initially, default false.
					slider : true, // whether to display a transparency slider. default false.
					autoToggle : true //whether to automatically collapse when turned off, and expand when turn on for groups layers. default true.
				}]
			}, 'tocDiv');
			toc.startup();
			dojo.connect(toc, 'onLoad', function() {
				if (console)
					console.log('TOC loaded');
				//dojo.byId("FindNodeByLayer").disabled = false;
			});
			dojo.disconnect(h);
		} catch (e) {
			alert(e);
		}
	
	//Measurement Widget

		var measurement = new esri.dijit.Measurement({
			map : map
		}, dojo.byId('measurementDiv'));

		measurement.startup();
		//End of Measurement Widget
	});
	
	
	map.addLayers([dynaLayer1, dynaLayer2]);

	// Restrict users only to map extent
	dojo.connect(map, "onExtentChange", function() {
		var extent = map.extent.getCenter();
		if (initialExtent.contains(extent)) {
		} else {
			map.setExtent(initialExtent);
		}
	});

	dojo.connect(map, 'onLoad', (mapReady, initToolbar));
	//dojo.connect(map, "onLoad", initNavigation);
	dojo.connect(map, "onClick", updateIdentifyTask);

}

function initToolbar(map){
	navToolbar = new esri.toolbars.Navigation(map);
	dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
		$('.btn.btn-primary.btn-xs').click(function() {
		if ($(this).is("#pan, #zoomin, #zoomout, #identify")) {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$('.btn.btn-primary.btn-xs').not($(this)).removeClass("active");
				if ($(this).is("#pan")) {
					navToolbar.activate(esri.toolbars.Navigation.PAN);
					toolId = "pan";
				}
				if ($(this).is("#zoomin")) {
					navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
					toolId = "zoomin";
				}
				if ($(this).is("#zoomout")) {
					navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
					toolId = "zoomout";
				}
				if ($(this).is("#identify")) {
					activateIdentify();
					toolId = "identify";
				}
			}
			else {
				$(this).removeClass("active");
				navToolbar.deactivate();
				deactivateIdentify();
			}
		}

			if ($(this).is("#zoomfullext")) {
				navToolbar.zoomToFullExtent();
				toolId = "full";
			}
			if ($(this).is("#zoomprev")) {
				navToolbar.zoomToPrevExtent();
				toolId = "prev";
				
			}
			if ($(this).is("#zoomnext")) {
				navToolbar.zoomToNextExtent();
				toolId = "next";
			}
	});
}
//Extent History
function extentHistoryChangeHandler() {
	dojo.byId("zoomprev").disabled = navToolbar.isFirstExtent();
	dojo.byId("zoomnext").disabled = navToolbar.isLastExtent();
}


//This section gives the ability for the identify button to be toggled.
function activateIdentify() {
	initIdentify(map);
	//dojo.connect(map, "onClick", updateIdentifyTask);
}

function deactivateIdentify(){
	dojo.disconnect(identifyHandle);
}


function mapReady(theMap) {
	dojo.connect(dijit.byId('map'), 'resize', function() {//resize the map if the div is resized
		clearTimeout(resizeTimer);
		var resizeTimer = setTimeout(function() {
			map.resize();
			map.reposition();
		}, 500);
	});

	//Add overview Map
	var overviewMapDijit = new esri.dijit.OverviewMap({
		map : map,
		visible : false,
		attachTo : "bottom-right"
	});
	overviewMapDijit.startup();

	//Add Scale bar to Map
	var scalebar = new esri.dijit.Scalebar({
		map : map,
		scalebarUnit : 'metric'
	});

}

      function updateIdentifyTask() {
        vLayers = getVisibleLayers();
        var visible = {};
        for (i = 0; i<vLayers.length; i++){visible[vLayers[i].id] = vLayers[i].visibleLayers;}
        console.log(visible);
        // If no layers are visible set the array value to = -1
        // and disconnect the identify task
        if (visible.length === 0) {
          visible = [-1];
          dojo.disconnect(identifyHandle);
          //map.infoWindow.hide();
          console.log('disconnected ID');
        } else if ( ! identifyHandle[0]) { 
          // There are visible layers to re-connect identify task
          // and the identify task is not connected 
          identifyHandle = dojo.connect(map, "onClick", executeIdentifyTask);
          //executeIdentifyTask({mapPoint: idParams.geometry});
          console.log('connected ID');
        }
        // Update Identifys layers
        //identifyParams.layerIds = visible;
        idParams.layerIds = visible;
      }
        
    function initIdentify(map) {
    	idParams = new esri.tasks.IdentifyParameters();
    	idParams.tolerance = 5;
    	idParams.returnGeometry = true;
        idParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
        identifyHandle = dojo.connect(map, "onClick", executeIdentifyTask);
    }
    function executeIdentifyTask(evt) {
    	var all_layers = dojo.map(map.layerIds, function(layerId) {
                    return map.getLayer(layerId);
                }); //Create an array of all layers in the map
                all_layers = dojo.filter(all_layers, function(layer) {
                    return layer.getImageUrl && layer.visible;
                }); //Only dynamic layers have the getImageUrl function. Filter so you only query visible dynamic layers
                var tasks = dojo.map(all_layers, function(layer) {
                    return new esri.tasks.IdentifyTask(layer.url);
                }); //map each visible dynamic layer to a new identify task, using the layer url
                var defTasks = dojo.map(tasks, function (task) {
                    return new dojo.Deferred();
                }); //map each identify task to a new dojo.Deferred
                var dlTasks = new dojo.DeferredList(defTasks); //And use all of these Deferreds in a DeferredList
                dlTasks.then(showResults); //chain showResults onto your DeferredList
                idParams.width = map.width;
                idParams.height = map.height;
                idParams.geometry = evt.mapPoint;
                idParams.mapExtent = map.extent;
                for (i=0;i<tasks.length;i++) { //Use 'for' instead of 'for...in' so you can sync tasks with defTasks
                    try {
                        tasks[i].execute(idParams, defTasks[i].callback, defTasks[i].errback); //Execute each task
                    } catch (e) {
                        console.log("Error caught");
                        console.log(e);
                        defTasks[i].errback(e); //If you get an error for any task, execute the errback
                    }
                }
}
function showResults(r) {
                var results = [];
                r = dojo.filter(r, function (result) {
                    return r[0];
                }); //filter out any failed tasks
                for (i=0;i<r.length;i++) {
                    results = results.concat(r[i][1]);
                }
                results = dojo.map(results, function(result) {
                    var feature = result.feature;
                    feature.attributes.layerName = result.layerName;
                    var template = new esri.InfoTemplate();
            		template.setTitle("${layerName}");
            		template.setContent("${*}");
            		feature.setInfoTemplate(template);
                    
                    return feature;
                });
                if(results.length === 0) {
                    map.infoWindow.clearFeatures();
                } else {
                    map.infoWindow.setFeatures(results);
                }
                map.infoWindow.show(idParams.geometry);
                return results;
            }
function getVisibleLayers(){
	var root_layers = dojo.map(map.layerIds, function(layerId) {
                    return map.getLayer(layerId);
                }); //Create an array of all layers in the map
    var visible_layers = jQuery.grep(root_layers, function(layer) {
                   return layer.getImageUrl && layer.visible;
                }); //Only dynamic layers have the getImageUrl function. Filter so you only query visible dynamic layers

   return visible_layers;

}
dojo.addOnLoad(init);





