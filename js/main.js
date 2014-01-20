
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
            dojo.require("myModules.customoperation");
            dojo.require("esri.toolbars.draw");
		        
   	        var layers = [{ name: 'HvalrossLiggeplasser', id: 2 }, { name: 'R�ye', id: 3 }, { name: 'Sj�fugl kolonier', id: 5 }, { name: 'Alle Sj�pattdyr observasjoner', id: 27 }, { name: 'Isbj�rn observasjoner', id: 37 }, { name: 'Strandrydding per �r', id: 58 }, { name: 'Reinbestandomr�der', id: 59 }, { name: 'Biogeografiske soner', id: 60 }, { name: 'Vegetasjon (10 kasser)', id: 62}, { name: 'Geologi', id: 87 }];
      		var root = location.protocol + "//" + location.host;
   	        var mapletUrl = root + "/iframe/embed.html"; // Relative path to Iframe page, should be absolute path when deployed, for example http://svalbardkartet.npolar.no/iframe.html
   	        var previewURL = 'preview.html'; // Relative path, should be absolute path when deployed.
   	        var basemapServiceUrl = 'http://geodata.npolar.no/ArcGIS/rest/services/inspire1/NP_TopoNordomr_U33_CHL/MapServer';
   	        var dynamicServiceUrl = 'http://willem3.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer';
   	        var geometryServiceUrl = 'http://geodata.npolar.no/arcgis/rest/services/Utilities/Geometry/GeometryServer';
   	        var isTiledMap = true;
   	        var overlayMap, point, mode, geometryService;
      
      
            var map, undoManager, tb, toc, dynaLayer1, dynaLayer2, featLayer1;
            var layerInfo = [];
            var graphicOverlays = [];
            var visible = [];
            var identifyTask, identifyParams, identifyHandle = 0;
            var opacityValue = 0.8;
            
      function init(){
            	
       
            // hideable panel
		//$("#paramDiv").css("display", "block");
		//$("#showhide").css("display", "block");
		
        geometryService = new esri.tasks.GeometryService(geometryServiceUrl);
          //dojo.connect(geometryService, "onProjectComplete", onProjectComplete);
          
          //setup the popup window 
        var popup = new esri.dijit.Popup({
          fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
        }, dojo.create("div"));
            
              var initialExtent = new esri.geometry.Extent({ "xmin": 356350.3184, "ymin": 8456631.06, "xmax" : 886026.044, "ymax" : 8989694.055, "spatialReference": { "wkid": 32633} });
              map = new esri.Map("map", {
                extent: initialExtent,
                infoWindow: popup,
                logo: false
              });
              
            // dojo.place(popup.domNode, map.root);

           // @TODO Add overview map
              
              var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapServiceUrl);
              map.addLayer(basemap);
              
              dynaLayer1 = new esri.layers.ArcGISDynamicMapServiceLayer(dynamicServiceUrl, {
                showAttribution: false,
                opacity: 0.8
              });
              
              featLayer1 = new esri.layers.FeatureLayer("http://willem3.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer/9", {
                mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
                outFields: ["Navn"]//,
              });
              
              featLayer1.setDefinitionExpression("STCOFIPS='21111'"); //
              var h = dojo.connect(map, 'onLayersAddResult', function(results){
                // overwrite the default visibility of service.
                // TOC will honor the overwritten value.
                dynaLayer1.setVisibleLayers([]);
                try {
                  toc = new agsjs.dijit.TOC({
                    map: map,
                    layerInfos: [
                   // {
                   //   layer: featLayer1,
                   //   title: "FeatureLayer1"
                   // }, 
                    {
                      layer: dynaLayer1,
                      title: "Svalbardkartet",
                      //collapsed: false, // whether this root layer should be collapsed initially, default false.
                      slider: true, // whether to display a transparency slider. default false.
                      autoToggle: true //whether to automatically collapse when turned off, and expand when turn on for groups layers. default true. 
                    }]
                  }, 'tocDiv');
                  toc.startup();
                  dojo.connect(toc, 'onLoad', function(){
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
          dojo.connect(map, "onClick", updateIdentifyTask);
          dojo.connect(map, "onExtentChange", map_extentChanged);
                            
              //resize the map when the browser resizes - view the 'Resizing and repositioning the map' section in
              //the following help topic for more details http://help.esri.com/EN/webapi/javascript/arcgis/help/jshelp_start.htm#jshelp/inside_guidelines.htm      
              var resizeTimer;
              dojo.connect(map, 'onLoad', function(theMap){
              	initIdentify(map);
                dojo.connect(dijit.byId('map'), 'resize', function(){ //resize the map if the div is resized
                  clearTimeout(resizeTimer);
                  resizeTimer = setTimeout(function(){
                    map.resize();
                    map.reposition();
                  }, 500);
                });
              });
             
            
             //specify the number of undo operations allowed using the maxOperations parameter
        undoManager = new esri.UndoManager({maxOperations:100});
        
        dojo.connect(undoManager,"onChange",function(){
          //enable or disable buttons depending on current state of application
          if (undoManager.canUndo) {
          	$("#undo").removeAttr('disabled');
          } else {
          	$("#undo").attr("disabled", "disabled");
          	$("#btnRemoveMarker").attr("disabled", "disabled");
          }
        });
              
        dojo.connect(map, "onLoad", initToolbar);	
           
	} //end init
            
            
            // Iframe designer
            // get the checked layers
            function getCheckedLayers() {
                var result = [];
                getContent();
                //console.log(layerInfo);
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

                //pad = dojo.string.pad;

                // console.log("Succeeded: ", response);
                // dojo.toJson method converts the given JavaScript object
                // and its properties and values into simple text.
                dojo.toJsonIndentStr = "  ";
                //console.log("response as text:\n", dojo.toJson(response, true));
                //dojo.byId("status").innerHTML = "";

                // show layer indexes and names
                if (response.hasOwnProperty("layers")) {
                    //console.log("got some layers");

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
                //dojo.attr('btnRemoveMarker', 'disabled', 'disabled');
                //dojo.attr('btnCancelMarker', 'disabled', 'disabled');
                //dojo.removeAttr('btnPlaceMarker', 'disabled');
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
                for (var i=0; i<graphicOverlays.length; i++ ){
                	
                	var overlayParams = graphicOverlays[i];
                	var shape = overlayParams[0];
                	drawingColor = overlayParams[1];
                	infoTitle = overlayParams[2];
                	infoContent = overlayParams[3];
                	
                	if (shape == "point"){
                		pointX = Math.round(overlayParams[4]);
                		pointY = Math.round(overlayParams[5]);
                		ptsUrl.push("&poi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + pointX + "," + pointY);
                	}
                	if (shape == "circle"){
                		centerX = overlayParams[4];
                		centerY = overlayParams[5];
                		radius = overlayParams[6];
                		circleUrl.push("&coi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + centerX + "," + centerY + "," + radius);
                	}
                	if (shape == "polyline"){
                		var linepath = overlayParams[4];
                		for (var j=0; j<linepath.length; j++ ){
                			linepath[j][0] = Math.round(linepath[j][0]);
                			linepath[j][1] = Math.round(linepath[j][1]);
                		}
                		lineUrl.push("&loi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + linepath);
                	}
                	if (shape == "extent"){
                		rectXMin = Math.round(overlayParams[4][0]);
                		rectYMin = Math.round(overlayParams[4][1]);
                		rectXMax = Math.round(overlayParams[4][2]);
                		rectYMax = Math.round(overlayParams[4][3]);
                		rectUrl.push("&roi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + rectXMin + "," + rectYMin + "," + rectXMax + "," + rectYMax);
                	}
                	if (shape == "text"){
                		var textPoints = overlayParams[4];
                		for (var j=0; j<textPoints.length; j++ ){
                			textPoints[j][0] = Math.round(textPoints[j][0]);
                			textPoints[j][1] = Math.round(textPoints[j][1]);
                		}
                		textUrl.push("&toi[]=" + drawingColor + "," + infoTitle + "," + infoContent + "," + textPoints);
                	}
                }
                
                var code = dojo.string.substitute('<iframe scrolling="no" src="${url}?&width=${width}&height=${height}&extent=${extent}&wkid=32633${point}${circle}${line}${rectangle}${text}${overlay}&t=${tiled}&n=${nav}&opValue=${opValue}" width="${width}" height="${height}"></iframe>', {
                    url : mapletUrl,
                    //sc : dojo.byId('chkSC').checked ? "sc=0&" : "",
                    extent : Math.round(map.extent.xmin) + "," + Math.round(map.extent.ymin) + "," + Math.round(map.extent.xmax) + "," + Math.round(map.extent.ymax),
                    opValue: opacityValue,
                    width : $("#txtWidth").val(),
                    height : $("#txtHeight").val(),
                    point : ( ptsUrl ? ptsUrl.join(""): ""),
                    circle : ( circleUrl ? circleUrl.join(""): ""),
                    line : ( lineUrl ? lineUrl.join(""): ""),
                    rectangle : ( rectUrl ? rectUrl.join(""): ""),
                    text: (textUrl ? textUrl.join(""): ""),
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
        tb = new esri.toolbars.Draw(map, {showTooltips: true,tooltipOffset:20});
        dojo.connect(tb, "onDrawEnd", addGraphic);
               //hook up the button click events
		$('.btn.btn-primary.btn-xs').click(function() {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$('.btn.btn-primary.btn-xs').not($(this)).removeClass("active");
				if ($(this).is("#drawPoint")) {
					tb.activate(esri.toolbars.Draw.POINT);
				}
				if ($(this).is("#drawPolyline")) {
					tb.activate(esri.toolbars.Draw.POLYLINE);
				}
				if ($(this).is("#drawExtent")) {
					tb.activate(esri.toolbars.Draw.EXTENT);
				}
				if ($(this).is("#drawCircle")) {
					tb.activate(esri.toolbars.Draw.CIRCLE);
				}
				if ($(this).is("#drawText")) {
					tb.activate(esri.toolbars.Draw.MULTI_POINT);
					if(!$("#iframetitleinput").val() ) {
						$(".alert-message").addClass("in");
						setTimeout(function () {
							$(".alert-message").removeClass("in");
							}, 3000);
						}
				}
			}
			
			else {
				$(this).removeClass("active");
				tb.deactivate();
			}
		});

      }
          
      function addGraphic(geometry) {
        iframetitleinput = $("#iframetitleinput").val();
		iframetitleinputtext = iframetitleinput.replace(/\'/g, '��');
		iframeinfoinput = $("#iframeinfoinput").val();
		iframeinfoinputtext = iframeinfoinput.replace(/\'/g, '��');
		iframeinfoinputtexturl = iframeinfoinputtext.replace(/ /g,"_");
		iframetitleinputtexturl = iframetitleinputtext.replace(/ /g,"_");
		iframegraphiccolor = $("#colorpicker").val();
		iframegraphiccolorurl = iframegraphiccolor.replace(/#/g,"");
		iframegraphiccolorrgb = hexToRgb(iframegraphiccolor);

        var type = geometry.type;
        var symbol; 
        
        if (type === "point") {
          symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(iframegraphiccolor), 4), new dojo.Color(iframegraphiccolor));
          graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, geometry.x, geometry.y]);
        }
        else if (type === "line" || type === "polyline") {
          symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color(iframegraphiccolor), 4);
          graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl,geometry.paths[0]]);
        }
        else if (type === "extent") {
          symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color(iframegraphiccolor), 3),new dojo.Color(iframegraphiccolorrgb));
          graphicOverlays.push([type, iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl,[geometry.xmin, geometry.ymin, geometry.xmax, geometry.ymax]]);
        }
        else if (type === "polygon") {
          symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color(iframegraphiccolor), 3),new dojo.Color(iframegraphiccolorrgb));
          xmin = geometry._extent.xmin;
          ymin = geometry._extent.ymin;
          xmax = geometry._extent.xmax;
          ymax = geometry._extent.ymax;
          centerX= Math.round((xmin+xmax)/2);
          centerY= Math.round((ymin+ymax)/2);
          radius = Math.round((xmax-xmin)/2);
          graphicOverlays.push(["circle", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, centerX, centerY, radius]);
        }
        else if (type === "multipoint") {
        
     	  var font  = new esri.symbol.Font();
     	  font.setSize("14pt");
     	  font.setFamily("veranda, arial, helvetica, sans-serif");
     	  font.setWeight(esri.symbol.Font["WEIGHT_BOLD"]);
          
     	  var symbol = new esri.symbol.TextSymbol();
     	  if (iframetitleinput == ""){
     	  	symbol.setText("Text");
     	  }
     	  else {
     	  	symbol.setText(iframetitleinput);
     	  }
     	  symbol.setColor( new dojo.Color(iframegraphiccolor));
     	  symbol.setFont(font);
     	  //symbol.setAngle(parseInt(dojo.byId("tsAngle").value));
          positions = geometry.points;
          graphicOverlays.push(["text", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, positions]);
          //for (var i=0; i<positions.length; i++ ){
          	//graphicOverlays.push(["text", iframegraphiccolorurl, iframetitleinputtexturl, iframeinfoinputtexturl, positions[i][0], positions[i][1]]);
          //}
        }
        else {
          symbol= new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color(iframegraphiccolor), 2),new dojo.Color(iframegraphiccolorrgb));
        }
         
        var graphic = new esri.Graphic(geometry, symbol);
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle(iframetitleinputtext);
        infoTemplate.setContent(iframeinfoinputtext);
        graphic.setInfoTemplate(infoTemplate);
        
        var operation = new myModules.customoperation.Add({
          graphicsLayer: map.graphics,
          addedGraphic: graphic
        });

        undoManager.add(operation);
        map.graphics.add(graphic);
        
        generateCode();
        $('#btnRemoveMarker').removeAttr('disabled');
      }
      
      function undo_click(){
          	graphicOverlays.pop();
          	generateCode();
      }
      
      function hexToRgb(hex) {
       	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
       	return result ? {
       		r: parseInt(result[1], 16),
       		g: parseInt(result[2], 16),
       		b: parseInt(result[3], 16),
       		a: 0.3
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
        identifyTask = new esri.tasks.IdentifyTask("http://willem3.npolar.no/arcgis/rest/services/Svalbard/embed/MapServer");

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
        } else if ( ! identifyHandle[0] ) { 
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

        deferred.addCallback(function (response) {
          // response is an array of identify result objects    
          // return an array of features.
          return dojo.map(response, function (result) {
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

        map.infoWindow.setFeatures([deferred]);
        map.infoWindow.show(evt.mapPoint);
      }
      
            
            //show hide menu
			function showhide () {
				if($("#paramDiv").css("display") == "none") {
					$("#paramDiv").css("display", "block");
					$("#showhide").css("background-position", "-448px  -72px");
				}
				else {
					$("#paramDiv").css("display", "none");
					$("#showhide").css("background-position", "-430px -72px");	
				}
			}
			
			
            dojo.ready(init);