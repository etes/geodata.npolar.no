define([
	'esri/InfoTemplate'
], function(InfoTemplate) {
	return {
		// url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
		proxy: {
			url: "proxy/proxy.ashx",
			alwaysUseProxy: false
		},
		// url to your geometry server.
		geometryService: {
			url: "//geodata.npolar.no/arcgis/rest/services/Utilities/Geometry/GeometryServer"
		},
		// basemapMode: must be either "agol" or "custom"
		basemapMode: "custom",
		//basemapMode: "agol",
		// defaultBasemap: valid options for "agol" mode: "streets", "satellite", "hybrid", "topo", "gray", "oceans", "national-geographic", "osm"
		mapStartBasemap: "lightGray", //topographic map Nordområde
		//basemapsToShow: basemaps to show in menu. If "agol" mode use valid values from above, if "custom" mode then define in basmaps dijit and refrence by name here
		basemapsToShow: ["topo", "lightGray", "satellite"],
		//basemapsToShow: ["topography", "satellite", "hybrid", "satTrans", "lightGray"],
		// initialExtent: extent the the map starts at. Helper tool: http://www.arcgis.com/home/item.html?id=dd1091f33a3e4ecb8cd77adf3e585c8a
		initialExtent: {
			xmin: 520492.686,
			ymin: 8501777.902973395,
			xmax: 589367.2385518802,
			ymax: 8897385.915492956,
			spatialReference: {
				wkid: 25833
			}
		},
		//logo: hide esri logo from map by setting it to false
		logo: false,
		// tolerance for identify map click.
		identifyTolerance: 2,
		// operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: "dynamic", "tiled", "feature".
		// The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
		// 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
		operationalLayers: [/*{
			type: "feature",
			url: "//geodata.npolar.no/arcgis/rest/services/Svalbard/glaciers/FeatureServer/0",
			title: "Features",
			options: {
				id: "glaceriersFS",
				opacity: 1.0,
				visible: true,
				outFields: ["*"],
				infoTemplate: new InfoTemplate("Name", "${*}"),
				mode: 0
			},
			editorLayerInfos: {
				disableGeometryUpdate: false
			}
		},*/ {
			type: "dynamic",
			url: "//geodata.npolar.no/arcgis/rest/services/Svalbard/glaciersurfacetypes/MapServer",
			title: "Glacier Surface Types",
			metadata: "https://data.npolar.no/dataset/d756f766-de33-11e2-8993-005056ad0004",
			options: {
				id: "glaciersurfacetypes",
				opacity: 1.0,
				visible: true,
				showAttribution: false
			}
		}, {
			type: "dynamic",
			url: "//geodata.npolar.no/arcgis/rest/services/Svalbard/glaciers/MapServer",
			title: "Glaciers Outlines",
			metadata: "https://data.npolar.no/dataset/89f430f8-862f-11e2-8036-005056ad0004",
			options: {
				id: "glaciers",
				opacity: 0.85,
				visible: true,
				showAttribution: false
			}
		}],
		//widgets: set include to true or false to load or not load the widget. set position to the desired order, starts at 0 on the top.
		widgets: {
			TOC: {
				include: true,
				title: "Layers",
				open: true,
				position: 0
			},
			print: {
				include: true,
				title: "Print",
				open: false,
				position: 1,
				serviceURL: "//geodata.npolar.no/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
				copyrightText: "Copyright Norsk Polarinstitutt 2014",
				authorText: "Norwegian Polar Institute",
				defaultTitle: 'Cryoclim',
				defaultFormat: 'PDF',
				defaultLayout: 'Letter ANSI A Landscape'
			},
			measure: {
				include: true,
				title: "Measurement",
				open: false,
				position: 2,
				defaultAreaUnit: esri.Units.SQUARE_KILOMETERS,
				defaultLengthUnit: esri.Units.KILOMETERS
			},
			legend: {
				include: true,
				title: "Legend",
				open: false,
				position: 3
			},
			draw: {
				include: true,
				title: "Draw",
				open: false,
				position: 4
			},
			scalebar: {
				include: true,
				options: {
					attachTo: "bottom-left",
					scalebarStyle: "line",
					scalebarUnit: "dual"
				}
			}
		}
	};
});
