```
title: Documentation
layout: page
header: 
tags: ['intro','page']
pageOrder: 1

sections:
    - 'getting-started'
    - 'setting-the-map'
    - 'geocoding-service-search-place-name-'
    - 'map-overlays'
    - 'map-service-layers'

labels:
    getting-started: 'Getting Started'
    setting-the-map: "Setting The Map"
    geocoding-service-search-place-name-: "Geocoding Service"
    map-overlays: "Map Overlays"
    map-service-layers: "Maps Service Layers"

```

Norwegian Polar Institute Maps API - Javascript
===============================================


### Getting Started

#### Overview

NPI provides topographic maps of Svalbard and Jan Mayen served at
[geodata.npolar.no/arcgis/rest/services](http://geodata.npolar.no/arcgis/rest/services).
These maps can be consumed through various client applications such as
ArcGIS API for JavaScript, Google Maps API, OpenLayers etc. to easily
create a mapping application.

This documentation shows how to quickly setup and develop an interactive
web map application for the Svalbard region using ArcGIS API for
Javascript, including adding place name search, working with map
overlays and popups and dealing with map services. The ArcGIS API for
JavaScript is a lightweight way to embed maps and tasks in web
applications similar to Google Maps API with more advanced
functionalities, such as geoprocessing, network analysis and data
editing.

#### Audience

This documentation is designed with the assumption that you are familiar
with basic JavaScript programming and mapping concepts (such as Google
Maps). It's also desirable if you make yourself familiar with Esri's
[ArcGIS API for
Javascript](http://help.arcgis.com/en/webapi/javascript/arcgis/) to take
full advantage of the mapping API.

### Setting The Map

The easiest way to setup a map of Svalbard using ArcGIS API for
JavaScript is to see a simple example. The following html page displays
a map of Svalbard centered around Longyearbyen:

```
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="http://geodata.npolar.no/arcgis_js_api/library/3.8/3.8/js/esri/css/esri.css"/>
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map { height: 100% }
    </style>
    <script src="http://geodata.npolar.no/arcgis_js_api/library/3.8/3.8/init.js"></script>
    <script type="text/javascript">
      dojo.require("esri.map");
      function initialize() {
    var initialExtent = new esri.geometry.Extent({
        "xmin": 477423.89,
        "ymin":8663685.98,
        "xmax":553624.05,
        "ymax":8714486.09,
        "spatialReference":{"wkid":25833}
        });
    // create map instance and add a basemap
    map = new esri.Map("map", {extent: initialExtent, logo : false});
    basemapURL = "http://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer"
    map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
    }

    dojo.ready(initialize); 
    </script>
  </head>
  <body>
    <div id="map" style="width:100%; height:100%;"></div>
  </body>
</html>
```

There are a few steps to follow in order to initialize a map in your web
application:

1.  Setup an HTML document and include esri.css style sheet in the head
    section of the document to have styles and various widgets for the
    map.

        <link rel="stylesheet" href="http://geodata.npolar.no/arcgis_js_api/library/3.8/3.8/js/esri/css/esri.css"/>

2.  Add reference to the ArcGIS API for Javascript which loads all
    symbols and definitions needed for using the API.

        <script src="http://geodata.npolar.no/arcgis_js_api/library/3.8/3.8/init.js"></script>

3.  Create a `div` element with a certain id to hold the map. The size
    of the map is specified in the style attribute of the div.

        <div id="map" style="width:100%; height:100%;"/>

4.  Use another `<script>` tag to load the mapping modules from ArcGIS
    JavaScript API using the `dojo.require()` function. The initialize
    function creates a map instance using the `esri.Map` module and
    connects it with the DIV element created above by referencing it
    using the `"map"` id.

```
    <script>
    dojo.require("esri.map");
    function initialize() {
        // create map instance and add a basemap
        var map = new esri.Map("map");
        basemapURL = "http://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServerin"
        map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
        }

        dojo.ready(initialize); 
    </script>
```


   Add a topographic basemap of Svalbard to the map by providing the cached [map service REST URI](http://geodata.npolar.no/ArcGIS/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer).

   Finally, instruct the API to only execute the `initialize()` function after dependencies are fully loaded and the DOM is read, by passing `dojo.ready()`.

**That's it!** You now have a working map of Svalbard.

<div id="map1" style="width:100%; height:256px;"></div>

#### Map Options

At this stage, you didn't pass any optional parameters when creating the
map instance and therefore the map is loaded with the default extent and
zoom level.

Because we often want to center the map on a specific area, create an
initialExtent object to hold the starting extent of the map and add it
to the map instance created above. Use the [extent
helper](extenthelper.html) to create your desired map extent coordinates
in JSON.

```
    var intialExtent = new esri.geometry.Extent ({
        "Xmin": 477423.89,
        "Ymin": 8663685.98,
        "Xmax": 553624.05,
        "Ymax": 8714486.09,
        "spatialReference": {"wkid":25833}
        });
    // create map instance and add a basemap
    var map = new esri.Map("map" {extent: initialExtent});
```

By default the Esri logo is drawn to the bottom right of the map which
can be turned off by:

     var map = new esri.Map("map" {extent: initialExtent, logo: false});

### Geocoding Service (Search place name)

Norwegian Polar Institute provides the [place names
API](http://placenames.npolar.no/api) for looking up place names
dynamically from user input. The search results can be used to convert
place names (e.g "Longyearbyen") into geographic coordinates (e.g.
latitude 78.22223 and longitude 15.631533), which you can use to place
markers or position the map.

#### Autocomplete place names

The [YUI autocomplete
library](http://yuilibrary.com/yui/docs/autocomplete/) is used to
dynamically search for place names as the user types in the input field.
As text is entered, the autocomplete returns place name predictions to
the application in the form of a drop-down pick list which can be used
to help users find and zoom to a specific location.

**Requirements:** Make sure you add reference the YUI library before
creating the autocomplete instance.

    <script src="http://yui.yahooapis.com/3.10.1/build/yui/yui-min.js"></script>

Next, create a new YUI instance for your application and populate it
with the required modules by specifying them as arguments to the
`YUI().use()` method.

```
<script>
// Create a new YUI instance and populate it with the required modules.
YUI().use("autocomplete", "autocomplete-filters", "autocomplete-highlighters", function(Y) {
    // AutoComplete is available and ready for use. Add implementation code here.
});
</script>
```

You can use the placenames API within your code as results source via
the `http://placenames.npolar.no:80` URL. The results source contains
the input terms and a callback method to execute upon receipt of the
response.

The JSON response is an object in the following form:

```
{
location: "Svalbard",
title: "Longyearbyen",
terrain: "Bustad",
approved: true,
ident: "8560",
north: 78.22223,
link: "/stadnamn/Longyearbyen?ident=8560",
east: 15.631533,
newer_ident: ""
}
```

The fields are explained in the place names
[API](http://placenames.npolar.no/terreng). These fields can also be
passed as parameter to narrow the search results.

The example below restricts your autocomplete results to place names
that are approved and within Svalbard:

```
<script>
    // Create a new YUI instance and populate it with the required modules.
    YUI().use("autocomplete", "autocomplete-filters", "autocomplete-highlighters", function(Y) {
        // Add the yui3-skin-sam class to the body so the default
        // AutoComplete widget CSS skin will be applied to the form element.
        Y.one('form').addClass('yui3-skin-sam'); //Autocomplete css
        
        var geoname_base = "http://placenames.npolar.no:80";
        // Geoname service URI (JSONP service)
        // Use GET parameters ?location= and ?approved=true|false to change service URI
        // and thereby restricting results, e.g. /stadnamn/auto?location=Svalbard&approved=true
        var geoname_service = geoname_base + "/stadnamn/edge/{query}?callback={callback}&rows=5" + "&approved=true&location=Svalbard⟨=nn";
        var geoname_autocomplete = Y.one('#geoname_autocomplete');
        geoname_autocomplete.plug(Y.Plugin.AutoComplete, {
            resultHighlighter : 'phraseMatch',
            //resultFormatter: simple_geoname_formatter,
            resultTextLocator : 'title',
            source : geoname_service
        });
        
        // zoom and add marker to the map when the user selects a place name from result 
        geoname_autocomplete.ac.on('select', function(e) {
            //console.log(e.result.raw);
            WGS84ToUTM33(e);
            addMarker(position);
        })
    }); 
    </script>
    
```

The last function zooms and adds a graphic marker to the map when a user
selects a place name from the result.

Finally, create a `div` element above the map `div` to hold the search
form and add an `input` element with the `geoname_autocomplete` id
referenced in the YUI instance.
```
    <div id = "search" style="margin:10px 10% 0 10%; position: absolute; width: 250px; z-index: 2;">
        <form action="" method="get">
            <input type="search" id="geoname_autocomplete" value="" placeholder="Zoom to place name"/>
        </form>
    </div>
```
<div id = "search" style="margin:10px 10% 0 10%; position: absolute; width: 250px; z-index: 2;">
	<form action="" method="get">
		<input type="search" id="geoname_autocomplete" value="" placeholder="Zoom to place name"/>
			<!-- link_to I18n.t("Nullstill") -->
	</form>
</div>
<div id="map" style="width:100%; height:256px; border:1px solid #000;"></div>

### Map Overlays

#### Adding Graphics

The ArcGIS JavaScript API also alows to add or draw graphics such as
markers, polylines, polygons, and popups into your map. Those objects
have location coordinates tied to them so that they can move when
zooming or panning the map.

You can create and add a point, polyline, or polygon using the
`esri.Graphic` object.

When adding graphics to the map, you need to wait for the map to load
first. This can be done by adding a function that runs after the map
finishes loading using the `dojo.connect()` event handler. The example
below adds a simple point around Longyearbyen where the geometry is set
using `esri.geometry.Point()`. The coordinates used to create the point
geometry in this sample are in UTM33.

```
<script>
    dojo.require("esri.map");
    function initialize() {
        // create map instance and add a basemap
        var map = new esri.Map("map", {logo : false});
        basemapURL = "http://geodata.npolar.no/ArcGIS/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer"
        map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
        
        dojo.connect(map, 'onLoad', function() {
            var symbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([255, 0, 0, 0.5]));
            var graphic = new esri.Graphic(new esri.geometry.Point(514589.2466, 8682916.3628), symbol);
            map.graphics.add(graphic);
            }); 
        }
        dojo.ready(initialize); 
    </script>
```
<div id="map2" style="width:100%; height:256px;"></div>

Similar method can be used to create lines, polylines, and polygons.

#### Drawing on map

If you would like the users to draw a points, lines, or polygons on the
screen and capture that geometry, the easiest is to use
[Draw](http://developers.arcgis.com/en/javascript/jsapi/draw.html)
toolbar of ArCGIS API for Javascript.

<div id="info" style="margin:5px 0 0 25%; position: absolute; z-index: 2;">
			<button class="btn btn-primary" id="drawPoint">Point</button>
			<button class="btn btn-primary" id="drawPolyline">Polyline</button>
			<button class="btn btn-primary" id="drawPolygon">Polygon</button>
			<button class="btn btn-primary" id="drawExtent">Extent</button>
			<button class="btn" id="clear">Clear</button>
			</div>
<div id="map3" style="width:100%; height:256px;"></div>

### Map Service Layers

Norwegian Polar Institute provides various dynamic thematic map services
that can easily be overlayed on the top basemaps. You can use the map
[Services Directory](http://geodata.npolar.no/arcgis/rest/services) to
discover the available map services. \
 Dynamic map services are more flexible than cached services by
providing the user options such as turn on and off layers in the
service, change layer transparency, freely adjust the scale, retrieve
layer info and legend, etc.

To create dynamic layer to a map, you only need to call the
`esri.layers.ArcGISDynamicMapServiceLayer()` constructor pointing to the
URL of service's REST endpoint (e.g.
[http://geodata.npolar.no/ArcGIS/rest/services/inspire3/Sjofuglkolonier/MapServer](http://geodata.npolar.no/ArcGIS/rest/services/inspire3/Sjofuglkolonier/MapServer)).

```
//Use the ImageParameters to set the visible layers in the map service during ArcGISDynamicMapServiceLayer construction.
    var imageParameters = new esri.layers.ImageParameters();
    imageParameters.format = "png32";  //sets the image format to PNG32.
    imageParameters.layerIds = [0]; // we want the layer with id 0 to be visible
    imageParameters.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
    //Takes a URL to a dynamic map service.
    serviceURL = "http://geodata.npolar.no/ArcGIS/rest/services/inspire3/Sjofuglkolonier/MapServer";
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(serviceURL, {
          "opacity":0.75, 
          "imageParameters":imageParameters
        });              
    map.addLayer(dynamicLayer);
```

The above code creates a layer from a dynamic ArcGIS Server map service. The following arguments were passed to the
[ArcGISDynamicMapServiceLayer](https://developers.arcgis.com/en/javascript/jsapi/arcgisdynamicmapservicelayer.html)
constructor in order to create the layer:

-   The URL of the map service. The URL provided in this sample is the
    Seabird colonies map of Svalbard.
-   Optional parameters to specify the image format (png, jpg, png32
    etc).
-   An opacity setting that determines the transparency of the layer
    which is between 0 and 1.

Finally, you need to add that dynamic layer on top of the basemap by calling the map's `addLayer()` method.

<div id="map4" style="width:100%; height:256px;"></div>
* * * * *

**Norwegian Polar Data**
 
 Norwegian Polar Institute
 
 9296 Tromsø,
 
 Norway



<link href='http://fonts.googleapis.com/css?family=Open+Sans:800,700' rel='stylesheet' type='text/css'>
<script src="http://yui.yahooapis.com/3.10.1/build/yui/yui-min.js"></script>
<script src="/public/js/proj4js.min.js" type="text/javascript"></script>
<script type="text/javascript" src="http://geodata.npolar.no/arcgis_js_api/library/3.8/3.8/init.js"></script>
<script src="/public/js/npmaps.js" type="text/javascript"></script>

<script>
    YUI().use("autocomplete", "autocomplete-highlighters", function(Y) {
        Y.one('form').addClass('yui3-skin-sam');
        //Autocomplete css
        var geoname_base = "http://placenames.npolar.no:80";
        // Geoname service URI (JSONP service)
        var geoname_service = geoname_base + "/stadnamn/edge/{query}?callback={callback}&rows=5" + "&approved=true&location=Svalbard&lang=nn";
        var geoname_autocomplete = Y.one('#geoname_autocomplete');
        geoname_autocomplete.plug(Y.Plugin.AutoComplete, {
            resultHighlighter : 'phraseMatch',
            //resultFormatter: simple_geoname_formatter,
            resultTextLocator : 'title',
            source : geoname_service
        });
        
        // zoom and add marker to the place name when the user selects from result 
        geoname_autocomplete.ac.on('select', function(e) {
        	//console.log(e.result.raw);
            WGS84ToUTM33(e);
            addMarker(position);
        })
    }); 
</script>
<script type="text/javascript">
    dojo.require("esri.map");
    dojo.require("esri.toolbars.draw");

    var map;

    function initialize() {
    	
      	var initialExtent = new esri.geometry.Extent({"xmin": 477423.89,"ymin":8663685.98,"xmax":553624.05,"ymax":8714486.09,"spatialReference":{"wkid":25833}});
      	// create map instance and add a basemap
      	// Geocoding Service (Search placename map)
        map = new esri.Map("map", {extent: initialExtent, logo : false});
        
        basemapURL = "http://geodata.npolar.no/ArcGIS/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer"
		map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));

        //add marker for place names search result to map
        graphicLayer = new esri.layers.GraphicsLayer();
        map.addLayer(graphicLayer);       
        graphicLayer.show();

        // Setting the map
        var map1 = new esri.Map("map1", {extent: initialExtent, logo : false});
        map1.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
        
        // Adding graphics map
        var map2 = new esri.Map("map2", {extent: initialExtent, logo : false});
        map2.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
        
        dojo.connect(map2, 'onLoad', function() {       	
        	var symbol = new esri.symbol.SimpleMarkerSymbol().setColor(new dojo.Color([255, 0, 0]));
        	var graphic = new esri.Graphic(new esri.geometry.Point(514589.2466, 8682916.3628,{"wkid":25833}), symbol);
        	map2.graphics.add(graphic);
        	});
       //Drawing tool map
       map3 = new esri.Map("map3", {extent : initialExtent,logo : false});
       map3.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));                
       dojo.connect(map, "onLoad", initToolbar);
       
       //Dynamic Map Service Layers
       map4 = new esri.Map("map4", {extent : initialExtent,logo : false});
       map4.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(basemapURL));
       
        var imageParameters = new esri.layers.ImageParameters();
        imageParameters.format = "png32"; //sets the image format to PNG32.
	imageParameters.layerIds = [0]; // we want the layer with id 0 to be visible
	imageParameters.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
    //Takes a URL to a dynamic map service.
    serviceURL = "http://geodata.npolar.no/ArcGIS/rest/services/inspire3/Sjofuglkolonier/MapServer";
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(serviceURL, {
          "opacity":0.75, 
          "imageParameters":imageParameters, showAttribution: false
        });
        
    map4.addLayer(dynamicLayer);
       

    }
    
     function initToolbar() {
                tb = new esri.toolbars.Draw(map3);
                dojo.connect(tb, "onDrawEnd", addGraphic);

                //hook up the button click events
                dojo.connect(dojo.byId("drawPoint"), "click", function() {
                    tb.activate(esri.toolbars.Draw.POINT);
                });

                dojo.connect(dojo.byId("drawExtent"), "click", function() {
                    tb.activate(esri.toolbars.Draw.EXTENT);
                });

                dojo.connect(dojo.byId("drawPolyline"), "click", function() {
                    tb.activate(esri.toolbars.Draw.POLYLINE);
                });
                dojo.connect(dojo.byId("drawPolygon"), "click", function() {
                    tb.activate(esri.toolbars.Draw.POLYGON);
                });
                dojo.connect(dojo.byId("clear"), "click", function() {
                    tb.deactivate();
                    map3.graphics.clear();
                });
            }
            
     function addGraphic(geometry) {
                //deactivate the toolbar and clear existing graphics
                //tb.deactivate();
                //map.graphics.clear();

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
                map3.graphics.add(new esri.Graphic(geometry, symbol));
            }       
    dojo.ready(initialize); 
</script>
