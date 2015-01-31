define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dijit/form/DropDownButton',
    'dijit/DropDownMenu',
    'dijit/MenuItem',
    'dojo/_base/array',
    'dojox/lang/functional',
    'dojo/text!./Basemaps/templates/Basemaps.html',
    'esri/dijit/BasemapGallery',
    'esri/dijit/BasemapLayer',
    'esri/dijit/Basemap'], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, DropDownButton, DropDownMenu, MenuItem, array, functional, template, BasemapGallery, BasemapLayer, Basemap) {

    //anonymous function to load CSS files required for this module
    (function() {
        var css = [require.toUrl("gis/dijit/Basemaps/css/Basemaps.css")];
        var head = document.getElementsByTagName("head").item(0),
            link;
        for (var i = 0, il = css.length; i < il; i++) {
            link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = css[i].toString();
            head.appendChild(link);
        }
    }());

    // define all valid custom basemaps here. Object of Basemap objects. Key name and basemap id must match. (pass desired basmaps in constructor in custom mode)
    var customBasemaps = {
        street: {
            title: "Topography",
            basemap: new Basemap({
                id: "topo",
                layers: [new BasemapLayer({
                    url: "//geodata.npolar.no/arcgis/rest/services/Basisdata_Intern/NP_Nordomraadene_WMTS_25833/MapServer",
                    showAttribution: false
                })]
            })
        },
        satellite: {
            title: "Satellite",
            basemap: new Basemap({
                id: "satellite",
                layers: [new BasemapLayer({
                    url: "//geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Satellitt_Svalbard_WMTS_25833/MapServer",
					showAttribution: false/*,
                    isReference: true/*,
                    displayLevels: [0, 1, 2, 3, 4, 5, 6, 7]*/
                }), new BasemapLayer({
                    url: "//geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Ortofoto_Svalbard_WMTS_25833/MapServer",
					showAttribution: false/*,
                    isReference: true,
                    displayLevels: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]*/
                })]
            })
        },
        lightGray: {
            title: "Topography",
            basemap: new Basemap({
                id: "lightGray",
                layers: [new BasemapLayer({
                    url: "//geodata.npolar.no/arcgis/rest/services/Basisdata_Intern/NP_Nordomraadene_WMTS_25833/MapServer",
					showAttribution: true
                })]
            })
        }
    };

    // all valid arcgisonline basemaps that the map excepts, only change title if desired. (pass desired basmaps in constructor in agol mode)
    var agolBasemaps = {
        streets: {
            title: 'Streets'
        },
        satellite: {
            title: 'Satellite'
        },
        hybrid: {
            title: 'Hybrid'
        },
        topo: {
            title: 'Topo'
        },
        gray: {
            title: 'Gray'
        },
        oceans: {
            title: 'Oceans'
        },
        "national-geographic": {
            title: 'Nat Geo'
        },
        osm: {
            title: 'Open Street Map'
        }
    };

    // main basemap widget
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        mode: "agol",
        title: "Basemaps",
        //baseClass: 'gis_Basemaps_Dijit',
        //buttonClass: 'gis_Basemaps_Button',
        //menuClass: "gis_Basemaps_Menu",
        mapStartBasemap: "streets",
        basemapsToShow: ["streets", "satellite", "hybrid", "topo", "gray", "oceans", "national-geographic", "osm"],
        validBasemaps: [],
        postCreate: function() {
            this.inherited(arguments);
            this.currentBasemap = this.mapStartBasemap || null;

            if (this.mode === "custom") {
                this.gallery = new BasemapGallery({
                    map: this.map,
                    showArcGISBasemaps: false,
                    basemaps: functional.map(customBasemaps, function(map) {
                        return map.basemap;
                    })
                });
                this.gallery.select(this.mapStartBasemap);
                this.gallery.startup();
            }

            this.menu = new DropDownMenu({
                style: "display: none;"//,
                //baseClass: this.menuClass
            });

            if (this.mode === "custom") {
                this.validBasemaps = functional.keys(customBasemaps);
            } else {
                this.validBasemaps = functional.keys(agolBasemaps);
            }

            array.forEach(this.basemapsToShow, function(basemap) {
                if (array.indexOf(this.validBasemaps, basemap) !== -1) {
                    var menuItem = new MenuItem({
                        id: basemap,
                        label: (this.mode === "custom") ? customBasemaps[basemap].title : agolBasemaps[basemap].title,
                        iconClass: (basemap == this.mapStartBasemap) ? 'selectedIcon' : 'emptyIcon',
                        onClick: lang.hitch(this, function() {
                            if (basemap !== this.currentBasemap) {
                                this.currentBasemap = basemap;
                                if (this.mode === "custom") {
                                    this.gallery.select(basemap);
                                } else {
                                    this.map.setBasemap(basemap);
                                }
                                var ch = this.menu.getChildren();
                                array.forEach(ch, function(c) {
                                    if (c.id == basemap) {
                                        c.set('iconClass', 'selectedIcon');
                                    } else {
                                        c.set('iconClass', 'emptyIcon');
                                    }
                                });
                            }
                        })
                    });
                    this.menu.addChild(menuItem);
                }
            }, this);

            this.dropDownButton.set('dropDown', this.menu);

            if (array.indexOf(this.basemapsToShow, "osm") !== -1) {
                require(["esri/layers/osm"]);
            }
        },
        startup: function() {
            this.inherited(arguments);
            if (this.mode === "custom") {
                this.gallery.select(this.mapStartBasemap);
            } else {
                this.map.setBasemap(this.mapStartBasemap);
            }
        }
    });
});
