dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
// uncomment if want dojo widget style checkbox
//dojo.require('dijit.form.CheckBox');
dojo.require("esri.map");
dojo.require("esri.geometry.Circle");
dojo.require("esri.dijit.Popup");
dojo.require("esri.layers.FeatureLayer");
dojo.require("dojox.html.entities");
dojo.require("agsjs.dijit.TOC");
dojo.require("dojox.layout.ExpandoPane");
dojo.require("modules.customoperation");
dojo.require("esri.toolbars.draw");

var root = location.protocol + "//" + location.host;
var mapletUrl = root + "/iframe/embed.html";
// Relative path to Iframe page, should be absolute path when deployed, for example http://svalbardkartet.npolar.no/iframe.html
var previewURL = 'preview.html';
// Relative path, should be absolute path when deployed.
var basemapServiceUrl = 'http://geodata.npolar.no/ArcGIS/rest/services/inspire1/NP_TopoNordomr_U33_CHL/MapServer';
var dynamicServiceUrl = 'http://geodata.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer';
var geometryServiceUrl = 'http://geodata.npolar.no/arcgis/rest/services/Utilities/Geometry/GeometryServer';
var isTiledMap = true;
var overlayMap, point, mode, geometryService;

var map, undoManager, tb, toc, dynaLayer1, dynaLayer2, featLayer1;
var layerInfo = [];
var graphicOverlays = [];
var visible = [];
var identifyTask, identifyParams, identifyHandle = 0;
var opacityValue = 0.8;
var toolId;

// @TODO Use backbone.js to have clean and modular code.
function init() {

	// hideable panel

	geometryService = new esri.tasks.GeometryService(geometryServiceUrl);
	//dojo.connect(geometryService, "onProjectComplete", onProjectComplete);

	//setup the popup window
	var popup = new esri.dijit.Popup({
		fillSymbol : new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
	}, dojo.create("div"));

	var initialExtent = new esri.geometry.Extent({
		"xmin" : 356350.3184,
		"ymin" : 8456631.06,
		"xmax" : 886026.044,
		"ymax" : 8989694.055,
		"spatialReference" : {
			"wkid" : 32633
		}
	});
	map = new esri.Map("map", {
		extent : initialExtent,
		infoWindow : popup,
		logo : false
	});

	// dojo.place(popup.domNode, map.root);

	// @TODO Add overview map

	var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapServiceUrl);
	map.addLayer(basemap);

	dynaLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(dynamicServiceUrl, {
		showAttribution : false,
		opacity : 0.8
	});

	featLayer1 = new esri.layers.FeatureLayer("http://geodata.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer/9", {
		mode : esri.layers.FeatureLayer.MODE_SNAPSHOT,
		outFields : ["Navn"]//,
	});

	featLayer1.setDefinitionExpression("STCOFIPS='21111'");
	//
	var h = dojo.connect(map, 'onLayersAddResult', function(results) {
		// overwrite the default visibility of service.
		// TOC will honor the overwritten value.
		dynaLayer1.setVisibleLayers([]);
		try {
			toc = new agsjs.dijit.TOC({
				map : map,
				layerInfos : [
				// {
				//   layer: featLayer1,
				//   title: "FeatureLayer1"
				// },
				{
					layer : dynaLayer1,
					title : "Svalbardkartet",
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
	});

	//map.addLayers([dynaLayer1, featLayer1]);
	map.addLayers([dynaLayer1]);

	$("#btnRemoveMarker").click(btnRemoveMarker_click);
	$("#btnExamplePage").click(btnExamplePage_click);
	$("#btnGenerateCode").click(generateCode);
	$("#txtWidth").change(generateCode);
	$("#txtHeight").change(generateCode);
	$("#rbLockedYes").change(generateCode);
	$("#rbLockedNo").change(generateCode);
	//dojo.connect(dojo.byId('btnExamplePage'), "onclick", btnExamplePage_click);
	//dojo.connect(dojo.byId('txtWidth'), "onchange", generateCode);
	dojo.connect(dynaLayer1, "onOpacityChange", generateCode);
	dojo.connect(map, "onClick", updateIdentifyTask);;;
	dojo.connect(map, "onExtentChange", map_extentChanged);

	//resize the map when the browser resizes - view the 'Resizing and repositioning the map' section in
	//the following help topic for more details http://help.esri.com/EN/webapi/javascript/arcgis/help/jshelp_start.htm#jshelp/inside_guidelines.htm
	var resizeTimer;
	dojo.connect(map, 'onLoad', function(theMap) {
		initIdentify(map);
		dojo.connect(dijit.byId('map'), 'resize', function() {//resize the map if the div is resized
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				map.resize();
				map.reposition();
			}, 500);
		});
	});

	//specify the number of undo operations allowed using the maxOperations parameter
	undoManager = new esri.UndoManager({
		maxOperations : 100
	});

	dojo.connect(undoManager, "onChange", function() {
		//enable or disable buttons depending on current state of application
		if (undoManager.canUndo) {
			$("#undo").removeAttr('disabled');
		} else {
			$("#undo").attr("disabled", "disabled");
			$("#btnRemoveMarker").attr("disabled", "disabled");
		}
	});

	dojo.connect(map, "onLoad", initToolbar);

}//end init

// Iframe designer
// get the checked layers
function getCheckedLayers() {
	var result = [];
	getContent();
	for (var i = 0; i < layerInfo.length; i++) {
		var checkBox = dojo.byId('layercheckbox_' + i);
		if (layerInfo[i] !== -1 && checkBox && checkBox.checked)
			result.push(i);
	}
	return result;

}

function layerCheckBox_click(e) {
	var checkBox = e.target;
	var layer = map.getLayer(layers[1].id);
	if (layer) {
		layer.setVisibleLayers(getCheckedLayers());
		layer.visible = true;
	}
	//console.log(layers[1].id,getCheckedLayers());
	generateCode();

}

//layer infos
function getContent() {
	//var url;

	url = dynamicServiceUrl;

	var requestHandle = esri.request({
		"url" : dynamicServiceUrl,
		"content" : {
			"f" : "json"
		},
		"callbackParamName" : "callback",
	});
	requestHandle.then(requestSucceeded, requestFailed);
}

function requestSucceeded(response, io) {
	dojo.toJsonIndentStr = "  ";

	// show layer indexes and names
	if (response.hasOwnProperty("layers")) {

		layerInfo = dojo.map(response.layers, function(f) {
			if (f.subLayerIds == null) {
				return f.id;
			} else {
				return -1;
			}
		});
		// console.log(layerInfo);
	} else {
		// console.log ("no layers");
	}
}

function requestFailed(error, io) {
	console.log("Failed: ", error);
}

function btnRemoveMarker_click() {
	mode = "default";
	map.graphics.clear();
	graphicOverlays = [];
	$('#btnRemoveMarker').attr("disabled", "disabled");
	$("#undo").attr("disabled", "disabled");
	generateCode();
}

function btnExamplePage_click() {
	var w = window.open(previewURL, '_blank', null, false);
	if (!(w))
		alert('You need to turn off pop-up blockers to open the sample page.');
}

function generateCode() {
	var checkedLayers = getCheckedLayers();
	var ptsUrl = [];
	var circleUrl = [];
	var lineUrl = [];
	var rectUrl = [];
	var textUrl = [];
	for (var i = 0; i < graphicOverlays.length; i++) {

		var overlayParams = graphicOverlays[i];
		var shape = overlayParams[0];
		drawingColor = overlayParams[1];
		infoTitle = overlayParams[2];
		infoContent = overlayParams[3];

		if (shape == "point") {
			pointX = Math.round(overlayParams[4]);
			pointY = Math.round(overlayParams[5]);
			ptsUrl.push("&poi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + pointX + "," + pointY);
		}
		if (shape == "circle") {
			centerX = overlayParams[4];
			centerY = overlayParams[5];
			radius = overlayParams[6];
			circleUrl.push("&coi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + centerX + "," + centerY + "," + radius);
		}
		if (shape == "polyline") {
			var linepath = overlayParams[4];
			for (var j = 0; j < linepath.length; j++) {
				linepath[j][0] = Math.round(linepath[j][0]);
				linepath[j][1] = Math.round(linepath[j][1]);
			}
			lineUrl.push("&loi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + linepath);
		}
		if (shape == "extent") {
			rectXMin = Math.round(overlayParams[4][0]);
			rectYMin = Math.round(overlayParams[4][1]);
			rectXMax = Math.round(overlayParams[4][2]);
			rectYMax = Math.round(overlayParams[4][3]);
			rectUrl.push("&roi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + rectXMin + "," + rectYMin + "," + rectXMax + "," + rectYMax);
		}
		if (shape == "text") {
			textPositionX = Math.round(overlayParams[4]);
			textPositionY = Math.round(overlayParams[5]);
			textUrl.push("&toi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + textPositionX + "," + textPositionY);
			/*var textPoints = overlayParams[4];
			 for (var j=0; j<textPoints.length; j++ ){
			 textPoints[j][0] = Math.round(textPoints[j][0]);
			 textPoints[j][1] = Math.round(textPoints[j][1]);
			 }
			 textUrl.push("&toi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + textPoints);
			 */
		}
	}

	var code = dojo.string.substitute('<iframe scrolling="no" src="${url}?&width=${width}&height=${height}&extent=${extent}&wkid=32633${point}${circle}${line}${rectangle}${text}${overlay}&t=${tiled}&n=${nav}&opValue=${opValue}" frameborder=0 width="${width}" height="${height}"></iframe>', {
		url : mapletUrl,
		//sc : dojo.byId('chkSC').checked ? "sc=0&" : "",
		extent : Math.round(map.extent.xmin) + "," + Math.round(map.extent.ymin) + "," + Math.round(map.extent.xmax) + "," + Math.round(map.extent.ymax),
		opValue : opacityValue,
		width : $("#txtWidth").val(),
		height : $("#txtHeight").val(),
		point : ( ptsUrl ? ptsUrl.join("") : ""),
		circle : ( circleUrl ? circleUrl.join("") : ""),
		line : ( lineUrl ? lineUrl.join("") : ""),
		rectangle : ( rectUrl ? rectUrl.join("") : ""),
		text : ( textUrl ? textUrl.join("") : ""),
		//nav : dojo.byId('rbLockedYes').checked ? "0" : "1",
		nav : $('#rbLockedYes').is(':checked') ? "0" : "1",
		tiled : isTiledMap ? "1" : "0",
		//mapUrl : encodeURIComponent(basemapServiceUrl),
		overlay : checkedLayers.length == 0 ? "" : "&cl=" + checkedLayers.join(";")
	});
	$("#divCode").html(dojox.html.entities.encode(code));
	return code;
}

function initToolbar(map) {
	tb = new esri.toolbars.Draw(map, {
		showTooltips : true,
		tooltipOffset : 20
	});
	dojo.connect(tb, "onDrawEnd", addGraphic);
	//hook up the button click events
	$('.draw-tool').click(function() {
		if (!$(this).hasClass("active")) {
			$(this).addClass("active");
			$('.button').not($(this)).removeClass("active");
			if ($(this).is("#drawPoint")) {
				tb.activate(esri.toolbars.Draw.POINT);
				toolId = "point";
			}
			if ($(this).is("#drawPolyline")) {
				tb.activate(esri.toolbars.Draw.POLYLINE);
				toolId = "polyline";
			}
			if ($(this).is("#drawExtent")) {
				tb.activate(esri.toolbars.Draw.EXTENT);
				toolId = "rectangle";
			}
			if ($(this).is("#drawCircle")) {
				tb.activate(esri.toolbars.Draw.CIRCLE);
				toolId = "circle";
			}
			if ($(this).is("#drawText")) {
				tb.activate(esri.toolbars.Draw.POINT);
				toolId = "text";
				if (!$("#iframetitleinput").val()) {
					$(".alert-message").addClass("in");
					setTimeout(function() {
						$(".alert-message").removeClass("in");
					}, 3000);
				}
			}
		} else {
			$(this).removeClass("active");
			tb.deactivate();
		}
	});
	
	$('.identify').click(function() {
		if (!$(this).hasClass("active")) {
			$(this).addClass("active");
			$('.button').not($(this)).removeClass("active");
			tb.deactivate();
		}
		else {
			$(this).removeClass("active");
		}
	});

}

function addGraphic(geometry) {
	iframetitleinput = $("#iframetitleinput").val();
	iframetitleinputtext = iframetitleinput.replace(/\'/g, '¤¤');
	iframeinfoinput = $("#iframeinfoinput").val();
	iframeinfoinputtext = iframeinfoinput.replace(/\'/g, '¤¤');
	iframeinfoinputtexturl = iframeinfoinputtext.replace(/ /g, "_");
	iframetitleinputtexturl = iframetitleinputtext.replace(/ /g, "_");
	iframegraphiccolor = $("#colorpicker").val();
	iframegraphiccolorurl = iframegraphiccolor.replace(/#/g, "");
	iframegraphiccolorrgb = hexToRgb(iframegraphiccolor);

	var type = geometry.type;
	var symbol;

	if (type === "point" && toolId == "point") {
		symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 4), new dojo.Color(iframegraphiccolor));
		graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, geometry.x, geometry.y]);
	} else if (type === "line" || type === "polyline") {
		symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 4);
		graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, geometry.paths[0]]);
	} else if (type === "extent") {
		symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 3), new dojo.Color(iframegraphiccolorrgb));
		graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, [geometry.xmin, geometry.ymin, geometry.xmax, geometry.ymax]]);
	} else if (type === "polygon") {
		symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 3), new dojo.Color(iframegraphiccolorrgb));
		xmin = geometry._extent.xmin;
		ymin = geometry._extent.ymin;
		xmax = geometry._extent.xmax;
		ymax = geometry._extent.ymax;
		centerX = Math.round((xmin + xmax) / 2);
		centerY = Math.round((ymin + ymax) / 2);
		radius = Math.round((xmax - xmin) / 2);
		graphicOverlays.push(["circle", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, centerX, centerY, radius]);
	} else if (type === "point" && toolId == "text") {

		var font = new esri.symbol.Font();
		font.setSize("14pt");
		font.setFamily("veranda, arial, helvetica, sans-serif");
		font.setWeight(esri.symbol.Font["WEIGHT_BOLD"]);

		var symbol = new esri.symbol.TextSymbol();
		if (iframetitleinput == "") {
			symbol.setText("Text");
		} else {
			symbol.setText(iframetitleinput);
		}
		symbol.setColor(new dojo.Color(iframegraphiccolor));
		symbol.setFont(font);
		//symbol.setAngle(parseInt(dojo.byId("tsAngle").value));
		graphicOverlays.push(["text", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, geometry.x, geometry.y]);
		//positions = geometry.points;
		//graphicOverlays.push(["text", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, positions]);
		//for (var i=0; i<positions.length; i++ ){
		//graphicOverlays.push(["text", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, positions[i][0], positions[i][1]]);
		//}
	} else {
		symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 2), new dojo.Color(iframegraphiccolorrgb));
	}

	var graphic = new esri.Graphic(geometry, symbol);
	var infoTemplate = new esri.InfoTemplate();
	infoTemplate.setTitle(iframetitleinputtext);
	infoTemplate.setContent(iframeinfoinputtext);
	graphic.setInfoTemplate(infoTemplate);

	var operation = new modules.customoperation.Add({
		graphicsLayer : map.graphics,
		addedGraphic : graphic
	});

	undoManager.add(operation);
	map.graphics.add(graphic);

	generateCode();
	$('#btnRemoveMarker').removeAttr('disabled');
}

function undo_click() {
	graphicOverlays.pop();
	generateCode();
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r : parseInt(result[1], 16),
		g : parseInt(result[2], 16),
		b : parseInt(result[3], 16),
		a : 0.3
	} : null;
}

function onProjectComplete(graphics) {
	if (graphics && graphics.length == 1) {
		var g = graphics[0];
	}
}

function map_extentChanged() {
	generateCode();
}

function testChangeFeatureLayerRenderer() {
	//based on http://help.arcgis.com/EN/webapi/javascript/arcgis/jssamples/renderer_class_breaks.html
	var symbol = new esri.symbol.SimpleFillSymbol();
	symbol.setColor(new dojo.Color([150, 150, 150, 0.5]));
	var renderer = new esri.renderer.ClassBreaksRenderer(symbol, "POP07_SQMI");
	renderer.addBreak(0, 25, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([56, 168, 0, 0.5])));
	renderer.addBreak(25, 75, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([139, 209, 0, 0.5])));
	renderer.addBreak(75, 175, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 255, 0, 0.5])));
	renderer.addBreak(175, 400, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 128, 0, 0.5])));
	renderer.addBreak(400, Infinity, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.5])));
	featLayer1.setRenderer(renderer);
	featLayer1.redraw();
	toc.refresh();
}

function testSetVisibleLayersProgramatically() {
	dynaLayer1.setVisibleLayers([8, 17, 18, 19, 20])
}

function testInsertNewLayer() {
	if (dynaLayer2 == null) {
		dynaLayer2 = new esri.layers.ArcGISDynamicMapServiceLayer("http://geodata.npolar.no/ArcGIS/rest/services/inspire3/Miljo/MapServer", {
			opacity : 0.8
		});
		var h = dojo.connect(map, 'onLayerAddResult', function(result) {
			toc.layerInfos.splice(1, 0, {
				layer : dynaLayer2,
				title : "DynamicMapServiceLayer2",
				// collapsed: true, // whether this root layer should be collapsed initially, default false.
				slider : true, // whether to display a transparency slider. default false.
				autoToggle : true //whether to automatically collapse when turned off, and expand when turn on for groups layers. default true.
			});
			toc.refresh();
			dojo.disconnect(h);
		});
		map.addLayer(dynaLayer2);
	}
}

function testFindNodeByLayer() {
	// 0 is the layerId of group "Basis"
	toc.findTOCNode(dynaLayer1, 0).collapse();
	// 	12 is the id of layer "Kortnebbgaas"
	toc.findTOCNode(dynaLayer1, 12).hide();
}

// Identify Task (PopUp)

function initIdentify(map) {
	//create identify tasks and setup parameters
	identifyTask = new esri.tasks.IdentifyTask("http://geodata.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer");

	identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.tolerance = 5;
	identifyParams.returnGeometry = true;
	identifyParams.layerIds = getCheckedLayers();
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	identifyParams.width = map.width;
	identifyParams.height = map.height;
	//console.log('set up ID');

	// Save a reference to the event listener so it can be
	// disconnected when no layers are selected
	identifyHandle = dojo.connect(map, "onClick", executeIdentifyTask);
}

function updateIdentifyTask() {
	visible = getCheckedLayers();
	// If no layers are visible set the array value to = -1
	// and disconnect the identify task
	if (visible.length === 0) {
		visible = [-1];
		dojo.disconnect(identifyHandle);
		map.infoWindow.hide();
		//console.log('disconnected ID');
	} else if (!identifyHandle[0]) {
		// There are visible layers to re-connect identify task
		// and the identify task is not connected
		identifyHandle = dojo.connect(map, "onClick", executeIdentifyTask);
		//console.log('connected ID');
	}
	// Update Identifys layers
	identifyParams.layerIds = visible;
}

function executeIdentifyTask(evt) {
	identifyParams.geometry = evt.mapPoint;
	identifyParams.mapExtent = map.extent;

	var deferred = identifyTask.execute(identifyParams);

	deferred.addCallback(function(response) {
		// response is an array of identify result objects
		// return an array of features.
		return dojo.map(response, function(result) {
			var feature = result.feature;
			feature.attributes.layerName = result.layerName;

			//console.log(feature.attributes);

			var template = new esri.InfoTemplate();
			template.setTitle("${layerName}");
			template.setContent("${*}");
			feature.setInfoTemplate(template);

			return feature;
		});
	});

	//map.infoWindow.setFeatures([deferred]);
	//map.infoWindow.show(evt.mapPoint);
	
	//show info window only if identify tool is active
	if ($('.identify').hasClass("active")) {
		map.infoWindow.show(evt.mapPoint);
		map.infoWindow.setFeatures([deferred]);
	}
}

//show hide menu
function showhide() {
	if ($("#rightpanel").css("display") == "none") {
		$("#rightpanel").css("display", "block");
		$("#showhide").css("background-position", "-448px  -72px");
	} else {
		$("#rightpanel").css("display", "none");
		$("#showhide").css("background-position", "-430px -72px");
	}
}
// show hide draw toolbar
function toggle_draw_toolbar() {
	if ($(".draw-toolbar").css("display") == "none") {
		$(".draw-toolbar").css("display", "block");
		$("#draw-toolbar-section").css({"border": "solid 1px #ccc", "border-radius": "4px"});
	} else {
		$(".draw-toolbar").css("display", "none");
		$("#draw-toolbar-section").css({"border": "0px"});
	}
}
dojo.ready(init);


// PLACENAMES SEARCH
// Create projection definition of UTM33
//Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
Proj4js.defs["EPSG:32633"] = "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

var wgs84 = new Proj4js.Proj('EPSG:4326');
var utm33 = new Proj4js.Proj('EPSG:32633');
var position, graphic;
// transform placename coordinates from wgs84 to utm 33
function WGS84ToUTM33(event) {
	var north, east;
	north = event.north;

	east = event.east;
	position = new Proj4js.Point(east, north);
	// transform to UTM33
	Proj4js.transform(wgs84, utm33, position);
}

var placenameGraphic;
// Add point marker to map and zoom to that position
function addMarker(position){
	
	map.graphics.remove(placenameGraphic);
	
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
	placenameGraphic = new esri.Graphic(new esri.geometry.Point(position.x, position.y),
			symbol);
	map.graphics.add(placenameGraphic);
	
	// zoom to point coordinates
	map.setExtent(new esri.geometry.Extent(position.x - 20000, position.y,
			position.x + 20000, position.y, map.spatialReference));	
}

//placenames search using jquery autocomplete
   $(function() {
    $( "#search-input" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://placenames.npolar.no/stadnamn/edge/",
          dataType: "jsonp",
          data: {
            q: request.term,
            approved: true,
            rows: 8,
            hemisphere: "n",
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return {
                label: item.title + " (" + item.terrain + ")",
                value: item.title,
                object: item
              };
            }));
          }
        });
      },
      minLength: 1,
      select: function( event, ui ) {
           WGS84ToUTM33(ui.item.object);
           addMarker(position);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
           var re = new RegExp("("+$.ui.autocomplete.escapeRegex(this.term)+")", "gi" );
           item.label = item.label.replace(re,"<strong>$1</strong>");
           return $( "<li></li>" )
              .data( "ui-autocomplete-item", item )
              .append( $( "<a></a>" ).html(item.label) )
              .appendTo( ul );
          };
  });

// END PLACENAMES SEARCH

//COLOR PICKER: uses specturm.js
$("#colorpicker").spectrum({
    color: "#ff0000",
    //showButtons: false,
});
// disable enter key in input boxes
$('#iframetitleinput').keypress(function(e){
    if ( e.which == 13 ) return false;
    //or...
    if ( e.which == 13 ) e.preventDefault();
});
$('#search-input').keypress(function(e){
    if ( e.which == 13 ) return false;
    //or...
    if ( e.which == 13 ) e.preventDefault();
});

//ingen GIS data ble skadet i utviklingen av disse kartene.