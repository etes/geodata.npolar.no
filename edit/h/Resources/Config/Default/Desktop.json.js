{
    "configuration": {
        "version": "1.3",
        "application": {
            "proxyUri": "proxy.ashx?",
            "allowUnsafeContent": false,
            "offlineStorageSpaceMb": "50",
            "geometryServiceUrl": "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
        },
        "defaultLibraryId": "Mapping",
        "libraries": [
            {
                "id": "Framework.UI",
                "uri": "Resources/Compiled/Framework.UI.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Framework.UI.en-US.json.js"
                    }
                ]
            },
            {
                "id": "Mapping",
                "uri": "Resources/Compiled/Mapping.js",
                "locales": [
                    {
                        "locale": "en-US",
                        "uri": "Resources/Locales/Mapping.en-US.json.js"
                    }
                ]
            }
        ],
        "modules": [
            {
                "moduleName": "Log",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogModule",
                "views": [
                    {
                        "id": "LogView",
                        "viewModelId": "LogViewModel",
                        "visible": false,
                        "markup": "Mapping/modules/Log/LogView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogView",
                        "region": "ApplicationRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "LogViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.log.LogViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Alert",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.alert.AlertModule",
                "configuration": {
                    "alertRegion": "ModalWindowRegion",
                    "overrideNativeAlert": true
                }
            },
            {
                "moduleName": "Authentication",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.authentication.AuthenticationModule",
                "configuration": {
                    "region": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "Banner",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerModule",
                "configuration": {},
                "views": [
                    {
                        "id": "BannerView",
                        "viewModelId": "BannerViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Banner/BannerView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerView",
                        "region": "HeaderRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "BannerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.banner.BannerViewModel",
                        "configuration": {
                            "applicationTitle": "",
                            "applicationSubtitle": "",
                            "backgroundColor": "#1D86B7",
                            "backgroundImage": "Resources/Images/banner-background.png",
                            "leftImage": "Resources/Images/banner-logo.png",
                            "rightImage": "",
                            "height": 50
                        }
                    }
                ]
            },
            {
                "moduleName": "Browser",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.browser.BrowserModule",
                "configuration": {
                    "title": "@language-browser-title"
                }
            },
            {
                "moduleName": "Confirm",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.confirm.ConfirmModule",
                "configuration": {
                    "confirmRegion": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "Editing",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditingModule",
                "configuration": { },
                "views": [
                    {
                        "id": "MapDataMenuView",
                        "iconUri": "Resources/Images/Icons/edit-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup": "Mapping/infrastructure/menus/MenuView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-feature-offline-tools",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {
                            "menuId": "MapDataMenu"
                        }
                    },
                    {
                        "id": "TemplatePickerView",
                        "viewModelId": "TemplatePickerViewModel",
                        "iconUri": "Resources/Images/Icons/file-add-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerView",
                        "markup": "Mapping/modules/Editing/TemplatePicker/TemplatePickerView.html",
                        "region": "FeatureEditingContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-template-picker",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {}
                    },
                    {
                        "id": "EditorView",
                        "viewModelId": "EditorViewModel",
                        "iconUri": "Resources/Images/Icons/sync-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditorView",
                        "markup": "Mapping/modules/Editing/Editor/EditorView.html",
                        "region": "FeatureEditingContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-editing",
                        "description": "@language-common-feature-editing-desc",
                        "configuration": {}
                    },
                    {
                        "id": "EditLogView",
                        "viewModelId": "EditLogViewModel",
                        "iconUri": "Resources/Images/Icons/sync-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.EditLogView",
                        "markup": "Mapping/modules/FeatureLayer/EditLogView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-feature-layer-edits-and-sync",
                        "description": "@language-common-feature-editlog-desc",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "TemplatePickerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.TemplatePickerViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "EditLogViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.EditLogViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "EditorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.editing.EditorViewModel",
                        "configuration": {
                            "validateGeometry": true,
                            "tools": [
                                {
                                    "name": "EditingMapPointTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POINT",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-point-24.png",
                                    "statusText": "@language-feature-editing-dsk-point-tool"
                                },
                                {
                                    "name": "EditingLineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "LINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-polyline-24.png",
                                    "statusText": "@language-feature-editing-dsk-line-tool"
                                },
                                {
                                    "name": "EditingPolylineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POLYLINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-polyline-24.png",
                                    "statusText": "@language-feature-editing-dsk-polyline-tool"
                                },
                                {
                                    "name": "EditingFreehandPolylineTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "FREEHAND_POLYLINE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-freehand-24.png",
                                    "statusText": "@language-feature-editing-dsk-freehand-polyline-tool"
                                },
                                {
                                    "name": "EditingPolygonTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "POLYGON",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-polygon-24.png",
                                    "statusText": "@language-feature-editing-dsk-polygon-tool"
                                },
                                {
                                    "name": "EditingFreehandPolygonTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "FREEHAND_POLYGON",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-freehand-24.png",
                                    "statusText": "@language-feature-editing-dsk-freehand-polygon-tool"
                                },
                                {
                                    "name": "EditingCircleTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "CIRCLE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-circle-24.png",
                                    "statusText": "@language-feature-editing-circle-tool"
                                },
                                {
                                    "name": "EditingEllipseTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "ELLIPSE",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-ellipse-24.png",
                                    "statusText": "@language-feature-editing-ellipse-tool"
                                },
                                {
                                    "name": "EditingRectangleTool",
                                    "command": "SetEditorFeatureGeometry",
                                    "drawMode": "EXTENT",
                                    "isSticky": false,
                                    "iconUri": "Resources/Images/Icons/draw-rectangle-24.png",
                                    "statusText": "@language-feature-editing-rectangle-tool"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "moduleName": "FeatureDetails",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsModule",
                "configuration": {
                    "providers": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.FeatureActionsViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.FeatureActionsView",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/FeatureActionsView.html",
                            "viewConfig": {
                                "menuId": "FeatureActions"
                            }
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttributesView",
                            "iconUri": "Resources/Images/Icons/details-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/AttributesView.html"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttachmentsViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.AttachmentsView",
                            "iconUri": "Resources/Images/Icons/paperclip-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/AttachmentsView.html"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.HyperlinksViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.HyperlinksView",
                            "iconUri": "Resources/Images/Icons/paperclip-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/HyperlinksView.html"
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.RelatedFeaturesViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.RelatedFeaturesView",
                            "iconUri": "Resources/Images/Icons/file-multi-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/RelatedFeaturesView.html",
                            "config": {
                                "relatedFeatureView": "DataRegion"
                            }
                        },
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksViewModel",
                            "viewType": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsProviders.DataLinksView",
                            "iconUri": "Resources/Images/Icons/details-24.png",
                            "markup": "Mapping/modules/FeatureDetails/FeatureDetailsProviders/DataLinksView.html",
                            "config": {
                                "dataLinkView": "DataRegion"
                            }
                        }
                    ],
                    "regionNames": [
                        "FeatureRegion"
                    ]
                },
                "views": [
                    {
                        "id": "FeatureDetailsView",
                        "viewModelId": "FeatureDetailsViewModel",
                        "iconUri": "Resources/Images/Icons/details-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsView",
                        "markup": "Mapping/modules/FeatureDetails/FeatureDetailsView.html",
                        "region": "DataFrameResultsContainerRegion",
                        "title": "@language-feature-details-title",
                        "visible": false,
                        "configuration": {
                            "onDeactivated": [
                                "ClearDefaultHighlights"
                            ]
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "FeatureDetailsViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.FeatureDetails.FeatureDetailsViewModel",
                        "configuration": {
                            "viewToActivate": "FeatureDetailsView"
                        }
                    }
                ]
            },
            {
                "moduleName": "FeatureLayer",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerModule",
                "configuration": {},
                "views": [
                    {
                        "id": "FeatureLayerDetailsView",
                        "viewModelId": "FeatureLayerViewModel",
                        "iconUri": "Resources/Images/Icons/layerlist-extract-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerDetailsView",
                        "markup": "Mapping/modules/FeatureLayer/FeatureLayerDetailsView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-layer-details",
                        "description": "@language-common-feature-layer-details-desc",
                        "configuration": {}
                    },
                    {
                        "id": "FeatureLayerListView",
                        "viewModelId": "FeatureLayerViewModel",
                        "iconUri": "Resources/Images/Icons/feature-layer-list-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerListView",
                        "markup": "Mapping/modules/FeatureLayer/FeatureLayerListView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "title": "@language-common-feature-sync-settings",
                        "description": "@language-common-feature-sync-settings-desc",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "FeatureLayerViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.featureLayer.FeatureLayerViewModel",
                        "configuration": {
                            "showWhereClause": false
                        }
                    }
                ]
            },
            {
                "moduleName": "Highlight",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Highlight.HighlightModule",
                "configuration": {
                    "fillColor": "#99ECEC3A",
                    "borderColor": "#FFCCCC33"
                }
            },
            {
                "moduleName": "Identify",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.identify.IdentifyModule",
                "configuration": {
                    "topMostLayerOnly": false,
                    "pixelTolerance": 5,
                    "polygonPixelTolerance": 0,
                    "resultsDisplayName": "@language-identify-results-header",
                    "returnGeometry": true,
                    "tools": [
                        {
                            "name": "IdentifyPointTool",
                            "command": "Identify",
                            "drawMode": "POINT",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/identify-24.png",
                            "statusText": "@language-dsk-identify-point-tool"
                        },
                        {
                            "name": "IdentifyRectangleTool",
                            "command": "Identify",
                            "drawMode": "EXTENT",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/identify-rectangle-24.png",
                            "statusText": "@language-identify-rectangle-tool"
                        },
                        {
                            "name": "IdentifyPolylineTool",
                            "command": "Identify",
                            "drawMode": "POLYLINE",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/identify-polyline-24.png",
                            "statusText": "@language-dsk-identify-polyline-tool"
                        },
                        {
                            "name": "IdentifyPolygonTool",
                            "command": "Identify",
                            "drawMode": "POLYGON",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/identify-polygon-24.png",
                            "statusText": "@language-identify-polygon-tool"
                        },
                        {
                            "name": "IdentifyFreehandPolygonTool",
                            "command": "Identify",
                            "drawMode": "FREEHAND_POLYGON",
                            "isSticky": false,
                            "iconUri": "Resources/Images/Icons/identify-freehand-24.png",
                            "statusText": "@language-identify-freehand-polygon-tool"
                        }
                    ]
                }
            },
            {
                "moduleName": "Info",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoModule",
                "configuration": {},
                "views": [
                    {
                        "id": "InfoView",
                        "viewModelId": "InfoViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoView",
                        "markup": "Mapping/modules/Info/InfoView.html",
                        "region": "HomePanelContainerRegion",
                        "title": "@language-common-welcome",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "InfoViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.Info.InfoViewModel",
                        "configuration": {
                            "content": "%3Cp style%3D%22text-align%3A center%3B%22%3E%5BApplication information and actions here%5D%3C/p%3E%3Cbr%3E%3Cp%3E%3Ci%3EUse this region to welcome users%2C make objectives of the application clear%2C and provide efficient access to important functions and workflows.%3C/i%3E%3C/p%3E",
                            "included": true,
                            "title": "@language-common-welcome"
                        }
                    }
                ]
            },
            {
                "moduleName": "IWantToMenu",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuModule",
                "configuration": {
                    "menus": [
                        {
                            "id": "Iwantto",
                            "description": "@language-menu-menus-description",
                            "moduleId": "IWantToMenu",
                            "defaultIconUri": "Resources/Images/Icons/check-24.png",
                            "items": [
                                {
                                    "iconUri": "Resources/Images/Icons/layerlist-24.png",
                                    "text": "@language-menu-map-layers",
                                    "description": "@language-menu-map-layers-desc",
                                    "command": "ShowLayerList"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/print-24.png",
                                    "text": "@language-print-map",
                                    "description": "@language-print-map",
                                    "command": "PrintMap"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/identify-rectangle-24.png",
                                    "text": "@language-menu-identify-rectangle",
                                    "description": "@language-menu-identify-rectangle-desc",
                                    "command": "SetActiveTool",
                                    "commandParameter": "IdentifyRectangleTool"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/identify-freehand-24.png",
                                    "text": "@language-menu-identify-freehand",
                                    "description": "@language-menu-identify-freehand-desc",
                                    "command": "SetActiveTool",
                                    "commandParameter": "IdentifyFreehandPolygonTool"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/map-nav-initial-extent-24.png",
                                    "text": "@language-menu-zoom-initial-extent",
                                    "description": "@language-menu-zoom-initial-extent-desc",
                                    "command": "ZoomToInitialExtent",
                                    "commandParameter": 750
                                }
                            ]
                        }
                    ]
                },
                "views": [
                    {
                        "id": "IWantToMenuButtonView",
                        "visible": true,
                        "viewModelId": "IWantToMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuButtonView",
                        "markup": "Mapping/modules/IWantToMenu/IWantToMenuButtonView.html",
                        "region": "NavigationMapRegion",
                        "title": "@language-menu-title",
                        "configuration": {}
                    },
                    {
                        "id": "IWantToMenuView",
                        "viewModelId": "IWantToMenuViewModel",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuView",
                        "markup": "Mapping/modules/IWantToMenu/IWantToMenuView.html",
                        "region": "IWantToMenuRegion",
                        "configuration": {
                            "menuId": "Iwantto"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "IWantToMenuViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.IWantToMenu.IWantToMenuViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Legend",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendModule",
                "configuration": {},
                "views": [
                    {
                        "id": "LegendView",
                        "viewModelId": "LegendViewModel",
                        "title": "@language-legend-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendView",
                        "markup": "Mapping/modules/Legend/LegendView.html",
                        "region": "LayerDataContainerRegion",
                        "isManaged": false,
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "LegendViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.legend.LegendViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Map",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapModule",
                "configuration": {
                    "panDuration": 350,
                    "panRate": 50,
                    "zoomDuration": 500,
                    "zoomRate": 50,
                    "onClick": [
                        "InvokeMapTip",
                        "ClearDefaultHighlights"
                    ],
                    "showLoadingStatus": true,
                    "loadingMessageTiming": [
                        1000,
                        3000,
                        3000
                    ],
                    "defaultPointFeatureZoomScales": [],
                    "tools": [
                        {
                            "name": "CenterMapTool",
                            "command": "PanToPoint",
                            "drawMode": "POINT",
                            "isSticky": true,
                            "statusText": "@language-dsk-map-center"
                        },
                        {
                            "name": "ZoomInTool",
                            "command": "ZoomToExtent",
                            "drawMode": "EXTENT",
                            "isSticky": true,
                            "statusText": "@language-map-zoom-in"
                        },
                        {
                            "name": "ZoomOutTool",
                            "command": "ZoomOutToExtent",
                            "drawMode": "EXTENT",
                            "isSticky": true,
                            "statusText": "@language-map-zoom-out"
                        }
                    ]
                },
                "views": [
                    {
                        "id": "MapView",
                        "viewModelId": "MapViewModel",
                        "visible": true,
                        "markup": "Mapping/modules/Map/MapView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapView",
                        "region": "MapRegion",
                        "configuration": {
                            "wrapAround180": false,
                            "extentBroadcastFrequency": 20
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "MapViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.map.MapViewModel",
                        "configuration": {
                            "stepZoomFactor": 0.5
                        }
                    }
                ]
            },
            {
                "moduleName": "MapTips",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.maptips.MapTipsModule",
                "configuration": {
                    "allowMultiple": false,
                    "contentField": "longDescription",
                    "onClose": [
                        "ClearDefaultHighlights"
                    ]
                }
            },
            {
                "moduleName": "Markup",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupModule",
                "viewModels": [
                    {
                        "id": "MarkupViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.markup.MarkupViewModel",
                        "configuration": {
                            "markupLayerName": "Drawings"
                        }
                    }
                ]
            },
            {
                "moduleName": "Menu",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.Menu.MenuModule",
                "configuration": {
                    "menus": [
                        {
                            "id": "MapDataMenu",
                            "description": "@language-menu-open-offline-tools-menu",
                            "moduleId": "FeatureEditing",
                            "defaultIconUri": "Resources/Images/Icons/edit-24.png",
                            "items": [
                                {
                                    "text": "@language-menu-provision-for-offline",
                                    "description": "@language-menu-provision-for-offline-desc",
                                    "iconUri": "Resources/Images/Icons/connection-on-24.png",
                                    "command": "DownloadOfflineResources",
                                    "commandParameter": "{ViewerConfigUri}../../Bundled/catalog.json.js"
                                },
                                {
                                    "iconUri": "Resources/Images/Icons/sync-manage-24.png",
                                    "text": "@language-menu-manage-sync-settings",
                                    "description": "@language-menu-manage-sync-settings-desc",
                                    "command": "ActivateView",
                                    "commandParameter": "FeatureLayerListView"
                                },
                                {
                                    "text": "@language-menu-view-edit-log",
                                    "description": "@language-menu-view-edit-log-desc",
                                    "iconUri": "Resources/Images/Icons/sync-24.png",
                                    "command": "ActivateView",
                                    "commandParameter": "EditLogView"
                                },
                                {
                                    "text": "@language-clear-storage",
                                    "description": "@language-menu-clear-offline-data-desc",
                                    "iconUri": "Resources/Images/Icons/trashcan-24.png",
                                    "command": "ActivateView",
                                    "commandParameter": "ClearDataView"
                                }
                            ]
                        },
                        {
                            "id": "LayerActions",
                            "description": "@language-layer-actions-desc",
                            "moduleId": "SimpleLayerList",
                            "defaultIconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                            "items": [
                                {
                                    "text": "@language-menu-add-a-feature",
                                    "description": "@language-menu-add-a-feature-desc",
                                    "iconUri": "Resources/Images/Icons/add-24.png",
                                    "command": "ShowFeatureTemplatePicker",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom-to-layer",
                                    "description": "@language-menu-zoom-to-layer-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToLayerExtent",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom-to-visible-scale",
                                    "description": "@language-menu-zoom-to-visible-scale-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToLayerVisibleScale",
                                    "hideOnDisable": true
                                }
                            ]
                        },
                        {
                            "id": "FeatureActions",
                            "description": "@language-feature-actions-description",
                            "moduleId": "FeatureDetails",
                            "defaultIconUri": "Resources/Images/Icons/check-24.png",
                            "items": [
                                {
                                    "text": "@language-feature-layer-edit",
                                    "description": "@language-feature-layer-edit-desc",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "StartEditingFeature",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-native-attach-file",
                                    "description": "@language-native-file-from-browser",
                                    "iconUri": "Resources/Images/Icons/attach-file-photo-24.png",
                                    "command": "AttachFileToFeature",
                                    "hideOnDisable": true
                                },
                                {
                                    "text": "@language-menu-zoom",
                                    "description": "@language-menu-zoom-description",
                                    "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                                    "command": "ZoomToFeature",
                                    "hideOnDisable": false
                                },
                                {
                                    "text": "@language-common-pan",
                                    "description": "@language-common-pan-description",
                                    "iconUri": "Resources/Images/Icons/pan-24.png",
                                    "command": "PanToFeature",
                                    "hideOnDisable": false
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "moduleName": "Native",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.native.NativeModule",
                "configuration": {},
                "views": [
                    {
                        "id": "AttachFileView",
                        "viewModelId": "AttachFileViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-native-attach-file",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.native.AttachFileView",
                        "markup": "Mapping/modules/Native/AttachFileView.html",
                        "region": "FeatureEditingContainerRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "AttachFileViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.native.AttachFileViewModel",
                        "configuration": {
                            "attachFileViewId": "AttachFileView"
                        }
                    }
                ]
            },
            {
                "moduleName": "Offline",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.offline.OfflineModule",
                "configuration": {},
                "views": [
                    {
                        "id": "MapDataMenuView",
                        "iconUri": "Resources/Images/Icons/edit-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.infrastructure.menus.MenuView",
                        "markup": "Mapping/infrastructure/menus/MenuView.html",
                        "region": "LayerDataContainerRegion",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-feature-offline-tools",
                        "description": "@language-common-feature-template-picker-desc",
                        "configuration": {
                            "menuId": "MapDataMenu"
                        }
                    },
                    {
                        "id": "ConnectionStatusIndicatorView",
                        "viewModelId": "ConnectionStatusIndicatorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.indicator.ConnectionStatusIndicatorView",
                        "markup": "Mapping/modules/Offline/ConnectionStatusIndicator/ConnectionStatusIndicatorView.html",
                        "region": "BottomLeftMapRegion",
                        "visible": true,
                        "configuration": {}
                    },
                    {
                        "id": "ClearDataView",
                        "title": "@language-clear-storage",
                        "viewModelId": "ClearDataViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.ClearDataView",
                        "markup": "Mapping/modules/Offline/ClearDataView/ClearDataView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ConnectionStatusIndicatorViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.indicator.ConnectionStatusIndicatorViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "ClearDataViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.offline.ClearDataViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Printing",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingModule",
                "configuration": {},
                "views": [
                    {
                        "id": "PrintingView",
                        "viewModelId": "PrintingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingView",
                        "markup": "Mapping/modules/Printing/PrintingView.html",
                        "region": "ModalWindowRegion",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/print-24.png",
                        "title": "@language-print-map",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "PrintingViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.printing.PrintingViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Prompt",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.prompt.PromptModule",
                "configuration": {
                    "promptRegion": "ModalWindowRegion"
                }
            },
            {
                "moduleName": "Results",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.results.ResultsModule",
                "configuration": {
                    "resultMappings": {
                        "Identify": [
                            "ShowResultsList"
                        ],
                        "MapTip": [
                            "ShowMapTipResults"
                        ],
                        "Workflow": [
                            "ShowResultsList"
                        ],
                        "Search": [
                            "ShowResultsList"
                        ]
                    },
                    "eventMappings": {
                        "ResultsListFeatureClickedEvent": [
                            "ShowFeatureDetails",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsListFeaturePressedEvent": [
                            "ShowFeatureDetails",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsTableFeatureClickedEvent": [
                            "ShowMapTip",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ],
                        "ResultsTableFeaturePressedEvent": [
                            "ShowMapTip",
                            "ZoomToFeature",
                            "HighlightFeatureDefault"
                        ]
                    }
                },
                "views": [
                    {
                        "id": "ResultsListView",
                        "viewModelId": "ResultsListViewModel",
                        "iconUri": "Resources/Images/Icons/search-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.results.ResultsListView",
                        "markup": "Mapping/modules/Results/ResultsListView.html",
                        "region": "DataFrameResultsContainerRegion",
                        "visible": false,
                        "title": "@language-common-results",
                        "description": "@language-common-query-results",
                        "configuration": {
                            "isPaged": true,
                            "pageSize": 50
                        }
                    },
                    {
                        "id": "ResultsTableView",
                        "viewModelId": "ResultsTableViewModel",
                        "iconUri": "Resources/Images/Icons/search-24.png",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.results.ResultsTableView",
                        "markup": "Mapping/modules/Results/ResultsTableView.html",
                        "region": "ResultsRegion",
                        "visible": false,
                        "configuration": {
                            "isPaged": true,
                            "pageSize": 50
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "ResultsListViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.results.FlatResultsViewModel",
                        "configuration": {}
                    },
                    {
                        "id": "ResultsTableViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.results.TabbedResultsViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Search",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchModule",
                "configuration": {
                    "autoLoadSiteGeocoders": true,
                    "searchProviders": [
                        {
                            "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.LayerSearchProvider",
                            "enable": true,
                            "configuration": {
                                "exactMatch": false
                            }
                        }
                    ]
                },
                "views": [
                    {
                        "id": "SearchView",
                        "viewModelId": "SearchViewModel",
                        "visible": true,
                        "title": "@language-search-title",
                        "iconUri": "Resources/Images/Icons/search.png",
                        "markup": "Mapping/modules/Search/SearchView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchView",
                        "region": "BannerContentRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "SearchViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.search.SearchViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Shells",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.shells.ShellModule",
                "configuration": {
                    "css": [
                        "Resources/Styles/Desktop.css",
                        "{ViewerConfigUri}../../Styles/Custom/Desktop.css"
                    ],
                    "homePanelVisible": false
                },
                "views": [
                    {
                        "id": "ShellView",
                        "viewModelId": "ShellViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.LargeShellView",
                        "markup": "Mapping/modules/Shells/DesktopShellView.html",
                        "region": "ApplicationRegion",
                        "configuration": {}
                    },
                    {
                        "id": "SplashView",
                        "visible": true,
                        "type": "geocortex.framework.ui.SplashScreen.SplashScreenView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/SplashScreen/SplashScreenView.html",
                        "region": "ApplicationRegion",
                        "configuration": {}
                    },
                    {
                        "id": "DataFrameTabView",
                        "viewModelId": "ShellViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.DataFrameTabView",
                        "markup": "Mapping/modules/Shells/DataFrameTabView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "DataFrameViewContainer",
                        "viewModelId": "DataFrameViewContainerViewModel",
                        "visible": false,
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "LeftPanelRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ModalViewContainerView",
                        "viewModelId": "ModalViewContainerViewModel",
                        "visible": false,
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "ModalWindowPlaceholderRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ResultsRegionViewContainerView",
                        "viewModelId": "ResultsRegionViewContainerViewModel",
                        "visible": false,
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "BottomPanelRegion",
                        "configuration": {}
                    },
                    {
                        "id": "FeatureEditingContainerView",
                        "viewModelId": "FeatureEditingContainerViewModel",
                        "visible": false,
                        "isManaged": true,
                        "title": "@language-common-layer-data",
                        "iconUri": "Resources/Images/Icons/edit-24.png",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "libraryId": "Framework.UI",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "DataRegion",
                        "configuration": {}
                    },
                    {
                        "id": "LayerDataContainerView",
                        "viewModelId": "LayerDataContainerViewModel",
                        "visible": true,
                        "isManaged": true,
                        "title": "@language-common-layer-data",
                        "iconUri": "Resources/Images/Icons/layerlist-24.png",
                        "libraryId": "Framework.UI",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "DataRegion",
                        "configuration": {}
                    },
                    {
                        "id": "HomePanelContainerView",
                        "viewModelId": "HomePanelContainerViewModel",
                        "visible": false,
                        "isManaged": false,
                        "title": "@language-common-welcome",
                        "iconUri": "Resources/Images/Icons/house-24.png",
                        "libraryId": "Framework.UI",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "DataRegion",
                        "configuration": {}
                    },
                    {
                        "id": "DataFrameResultsContainerView",
                        "viewModelId": "DataFrameResultsContainerViewModel",
                        "visible": false,
                        "isManaged": true,
                        "title": "@language-common-results",
                        "iconUri": "Resources/Images/Icons/search-results-24.png",
                        "libraryId": "Framework.UI",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerView",
                        "markup": "Framework.UI/geocortex/framework/ui/ViewContainer/ViewContainerView.html",
                        "region": "DataRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ShellViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.shells.LargeShellViewModel",
                        "configuration": {
                            "dataFrameWidth": 350,
                            "dataFrameOpenByDefault": false,
                            "bottomRegionHeight": 300
                        }
                    },
                    {
                        "id": "DataFrameViewContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "defaultViewIcon": "Resources/Images/Icons/search-24.png",
                            "containerRegionName": "DataRegion",
                            "headerIsVisible": false,
                            "showHeaderForStandaloneViews": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": true,
                            "showHostedViews": false,
                            "footerInsertMarkup": "Framework.UI/geocortex/framework/ui/ViewContainer/ButtonTabStripView.html",
                            "footerInsertType": "geocortex.framework.ui.ViewContainer.ButtonTabStripView",
                            "ordering": {
                                "DataFrameResultsContainerView": 0
                            }
                        }
                    },
                    {
                        "id": "DataFrameResultsContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "DataFrameResultsContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "ResultsListView": 0,
                                "FeatureDetailsView": 1
                            }
                        }
                    },
                    {
                        "id": "LayerDataContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "LayerDataContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "SimpleLayerListView": 0,
                                "LayerActionsView": 1,
                                "LegendView": 2,
                                "MapDataMenuView": 3,
                                "FeatureLayerListView": 4,
                                "FeatureLayerDetailsView": 5,
                                "EditLogView": 6
                            }
                        }
                    },
                    {
                        "id": "HomePanelContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "HomePanelContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "showHostedViews": true,
                            "ordering": {
                                "InfoView": 0
                            }
                        }
                    },
                    {
                        "id": "FeatureEditingContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "FeatureEditingContainerRegion",
                            "headerIsVisible": true,
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": false,
                            "ordering": {
                                "TemplatePickerView": 0,
                                "AttributeEditorView": 1
                            }
                        }
                    },
                    {
                        "id": "ModalViewContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "ModalWindowRegion",
                            "backButtonOnRootView": false,
                            "showBackButtonAsX": true,
                            "closeOnEscape": true
                        }
                    },
                    {
                        "id": "ResultsRegionViewContainerViewModel",
                        "type": "geocortex.framework.ui.ViewContainer.ViewContainerViewModel",
                        "configuration": {
                            "containerRegionName": "ResultsRegion",
                            "backButtonOnRootView": true,
                            "showBackButtonAsX": true,
                            "ordering": {
                                "ResultsTableView": 0
                            }
                        }
                    }
                ]
            },
            {
                "moduleName": "SimpleLayerList",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.simplelayerlist.SimpleLayerListModule",
                "configuration": {},
                "views": [
                    {
                        "id": "SimpleLayerListView",
                        "viewModelId": "SimpleLayerListViewModel",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/layerlist-24.png",
                        "markup": "Mapping/modules/SimpleLayerList/SimpleLayerListView.html",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.simplelayerlist.SimpleLayerListView",
                        "region": "LayerDataContainerRegion",
                        "configuration": {}
                    },
                    {
                        "id": "LayerActionsView",
                        "viewModelId": "LayerActionsViewModel",
                        "visible": false,
                        "iconUri": "Resources/Images/Icons/layerlist-menu-24.png",
                        "markup": "Mapping/modules/SimpleLayerList/LayerActionsView.html",
                        "title": "@language-layer-actions-title",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.SimpleLayerList.LayerActionsView",
                        "region": "LayerDataContainerRegion",
                        "configuration": {
                            "menuId": "LayerActions"
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "SimpleLayerListViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.simplelayerlist.SimpleLayerListViewModel",
                        "configuration": {
                            "hideOperationalMapServices": false,
                            "hideBaseMapServices": false,
                            "hideOperationalMapServiceNames": false,
                            "enableOperationalMapServicesIfNamesHidden": false,
                            "allowMultipleVisibleBaseMaps": true
                        }
                    },
                    {
                        "id": "LayerActionsViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.SimpleLayerList.LayerActionsViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Site",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.site.SiteModule",
                "configuration": {
                    "siteUri": "http://sampleserver1.geocortex.com/geocortex/essentials/rest/sites/CharlotteArcGISOnline"
                },
                "views": [
                    {
                        "id": "ServiceLayersFailureView",
                        "viewModelId": "ServiceLayersFailureViewModel",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.ServiceLayersFailureView",
                        "markup": "Mapping/modules/Site/ServiceLayersFailureView.html",
                        "region": "ModalWindowRegion",
                        "configuration": {}
                    },
                    {
                        "id": "SignInErrorView",
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.SignInErrorView",
                        "markup": "Mapping/modules/Site/SignInErrorView.html",
                        "region": "ModalWindowRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "ServiceLayersFailureViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.site.ServiceLayersFailureViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "Status",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.status.StatusModule",
                "configuration": {
                    "busyIcon": "Resources/Images/loader-small.gif"
                },
                "views": [
                    {
                        "id": "StatusIndicatorView",
                        "viewModelId": null,
                        "visible": false,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.status.StatusIndicatorView",
                        "markup": "Mapping/modules/Status/StatusIndicatorView.html",
                        "region": "BottomCenterMapRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": []
            },
            {
                "moduleName": "Toolbar",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarModule",
                "configuration": {
                    "toolbarGroups": [
                        {
                            "id": "NavigationTab",
                            "type": "toolbarGroup",
                            "name": "@language-toolbar-tab-navigation",
                            "items": [
                                {
                                    "id": "HomeGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-navigation-home-sub",
                                    "items": [
                                        {
                                            "id": "HomeButton",
                                            "type": "button",
                                            "name": "@language-toolbar-navigation-home",
                                            "tooltip": "@language-toolbar-navigation-home-tooltip",
                                            "iconUri": "Resources/Images/Icons/house-24.png",
                                            "command": "ActivateHomePanel"
                                        }
                                    ]
                                },
                                {
                                    "id": "NavigationGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-tab-navigation",
                                    "items": [
                                        {
                                            "id": "PanButton",
                                            "type": "button",
                                            "name": "@language-toolbar-navigation-pan",
                                            "tooltip": "@language-toolbar-navigation-pan-tooltip",
                                            "iconUri": "Resources/Images/Icons/pan-24.png",
                                            "command": "ClearActiveTool"
                                        },
                                        {
                                            "id": "ZoomInTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-navigation-zoom-in",
                                            "tooltip": "@language-toolbar-navigation-zoom-in-tooltip",
                                            "iconUri": "Resources/Images/Icons/zoom-in-24.png",
                                            "drawMode": "EXTENT",
                                            "isSticky": false,
                                            "command": "ZoomToExtent",
                                            "statusText": "@language-toolbar-navigation-zoom-in-desc"
                                        },
                                        {
                                            "id": "ZoomOutTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-navigation-zoom-out",
                                            "tooltip": "@language-toolbar-navigation-zoom-out-tooltip",
                                            "iconUri": "Resources/Images/Icons/zoom-out-24.png",
                                            "drawMode": "EXTENT",
                                            "isSticky": false,
                                            "command": "ZoomOutToExtent",
                                            "statusText": "@language-toolbar-navigation-zoom-out-desc"
                                        },
                                        {
                                            "id": "InitialExtentButton",
                                            "type": "button",
                                            "name": "@language-toolbar-navigation-initial-extent",
                                            "tooltip": "@language-toolbar-navigation-initial-extent-tooltip",
                                            "iconUri": "Resources/Images/Icons/map-nav-initial-extent-24.png",
                                            "command": "ZoomToInitialExtent"
                                        },
                                        {
                                            "id": "FullExtentButton",
                                            "type": "button",
                                            "name": "@language-toolbar-navigation-full-extent",
                                            "tooltip": "@language-toolbar-navigation-full-extent-tooltip",
                                            "iconUri": "Resources/Images/Icons/map-24.png",
                                            "command": "ZoomToFullExtent"
                                        }
                                    ]
                                },
                                {
                                    "id": "LocationInfoGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-analysis-location-info",
                                    "items": [
                                        {
                                            "id": "PointIdentifyTool-Navigation",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-point",
                                            "tooltip": "@language-toolbar-identify-point-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-24.png",
                                            "drawMode": "POINT",
                                            "isSticky": true,
                                            "command": "Identify",
                                            "statusText": "@language-toolbar-identify-point-desc"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "TasksTab",
                            "type": "toolbarGroup",
                            "name": "@language-toolbar-tab-tasks",
                            "items": [
                                {
                                    "id": "PrintingGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-tasks-printing",
                                    "items": [
                                        {
                                            "id": "PrintMapButton",
                                            "type": "button",
                                            "name": "@language-toolbar-tasks-print-map",
                                            "tooltip": "@language-toolbar-tasks-print-map-tooltip",
                                            "command": "PrintMap",
                                            "iconUri": "Resources/Images/Icons/print-24.png"
                                        }
                                    ]
                                },
                                {
                                    "id": "MarkupToolsGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-markup-drawing-tools",
                                    "items": [
                                        {
                                            "id": "PointMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-point",
                                            "tooltip": "@language-toolbar-markup-point-tooltip",
                                            "iconUri": "Resources/Images/Icons/dot-16.png",
                                            "drawMode": "POINT",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-point-desc"
                                        },
                                        {
                                            "id": "FreehandMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-freehand",
                                            "tooltip": "@language-toolbar-markup-freehand-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-freehand-24.png",
                                            "drawMode": "FREEHAND_POLYLINE",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-freehand-desc"
                                        },
                                        {
                                            "id": "PolylineMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-polyline",
                                            "tooltip": "@language-toolbar-markup-polyline-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-polyline-24.png",
                                            "drawMode": "POLYLINE",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-polyline-desc"
                                        },
                                        {
                                            "id": "PolygonMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-polygon",
                                            "tooltip": "@language-toolbar-markup-polygon-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-polygon-24.png",
                                            "drawMode": "POLYGON",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-polygon-desc"
                                        },
                                        {
                                            "id": "RectangleMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-rectangle",
                                            "tooltip": "@language-toolbar-markup-rectangle-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-rectangle-24.png",
                                            "drawMode": "RECTANGLE",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-rectangle-desc"
                                        },
                                        {
                                            "id": "CircleMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-circle",
                                            "tooltip": "@language-toolbar-markup-circle-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-circle-24.png",
                                            "drawMode": "CIRCLE",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-circle-desc"
                                        },
                                        {
                                            "id": "EllipseMarkupTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-markup-ellipse",
                                            "tooltip": "@language-toolbar-markup-ellipse-tooltip",
                                            "iconUri": "Resources/Images/Icons/draw-ellipse-24.png",
                                            "drawMode": "ELLIPSE",
                                            "isSticky": true,
                                            "command": "AddMarkup",
                                            "statusText": "@language-toolbar-markup-ellipse-desc"
                                        },
                                        {
                                            "id": "ClearMarkup",
                                            "type": "button",
                                            "name": "@language-toolbar-markup-clear",
                                            "tooltip": "@language-toolbar-markup-clear-tooltip",
                                            "command": "ClearMarkup",
                                            "iconUri": "Resources/Images/Icons/clear-24.png"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "AnalysisTab",
                            "type": "toolbarGroup",
                            "name": "@language-toolbar-tab-analysis",
                            "items": [
                                {
                                    "id": "LocationInfoGroup",
                                    "type": "toolbarGroup",
                                    "name": "@language-toolbar-analysis-location-information",
                                    "items": [
                                        {
                                            "id": "PointIdentifyTool-Analysis",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-point",
                                            "tooltip": "@language-toolbar-identify-point-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-24.png",
                                            "drawMode": "POINT",
                                            "command": "Identify",
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-identify-point-desc"
                                        },
                                        {
                                            "id": "FreehandIdentifyTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-freehand",
                                            "tooltip": "@language-toolbar-identify-freehand-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-freehand-24.png",
                                            "drawMode": "FREEHAND_POLYLINE",
                                            "command": "Identify",
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-identify-freehand-desc"
                                        },
                                        {
                                            "id": "PolylineIdentifyTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-polyline",
                                            "tooltip": "@language-toolbar-identify-polyline-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-polyline-24.png",
                                            "drawMode": "POLYLINE",
                                            "command": "Identify",
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-identify-polyline-desc"
                                        },
                                        {
                                            "id": "PolygonIdentifyTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-polygon",
                                            "tooltip": "@language-toolbar-identify-polygon-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-polygon-24.png",
                                            "drawMode": "POLYGON",
                                            "command": "Identify",
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-identify-polygon-desc"
                                        },
                                        {
                                            "id": "RectangleIdentifyTool",
                                            "type": "tool",
                                            "name": "@language-toolbar-identify-rectangle",
                                            "tooltip": "@language-toolbar-identify-rectangle-tooltip",
                                            "iconUri": "Resources/Images/Icons/identify-rectangle-24.png",
                                            "drawMode": "RECTANGLE",
                                            "command": "Identify",
                                            "isSticky": true,
                                            "statusText": "@language-toolbar-identify-rectangle-desc"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "viewModels": [
                    {
                        "id": "MainToolbarViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarViewModel",
                        "configuration": {
                            "toolbarGroupRefs": [
                                "NavigationTab",
                                "TasksTab",
                                "AnalysisTab"
                            ]
                        }
                    }
                ],
                "views": [
                    {
                        "id": "MainToolbarView",
                        "viewModelId": "MainToolbarViewModel",
                        "visible": false,
                        "title": "Main Toolbar",
                        "region": "ToolbarRegion",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarView",
                        "markup": "Mapping/modules/Toolbar/LargeToolbarView.html",
                        "configuration": {}
                    },
                    {
                        "id": "ToolbarButtonView",
                        "viewModelId": "MainToolbarViewModel",
                        "visible": true,
                        "region": "TopRightMapRegion",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.toolbar.ToolbarButtonView",
                        "markup": "Mapping/modules/Toolbar/ToolbarButtonView.html"
                    }
                ]
            },
            {
                "moduleName": "Tools",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.tools.ToolsModule",
                "configuration": {
                    "showStatusMessages": true,
                    "tools": []
                }
            },
            {
                "moduleName": "Workflow",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowModule",
                "configuration": {
                    "showTitleInFormBody": false,
                    "defaultContainerRegionName": "DataRegion",
                    "defaultContainerTitle": "@language-workflow-title",
                    "defaultContainerIconUri": "Resources/Images/Icons/workflow-24.png",
                    "showCaptureStatusMessages": true,
                    "startupWorkflows": [],
                    "formItems": {},
                    "icons": {
                        "Resources/Images/ParcelByID.png": "Resources/Images/Icons/house-number-24.png",
                        "Resources/Images/ParcelByOwner.png": "Resources/Images/Icons/house-owner-24.png",
                        "Resources/Images/ParcelByValue.png": "Resources/Images/Icons/house-value-24.png",
                        "Resources/Images/SearchSchools.png": "Resources/Images/Icons/school-24.png"
                    },
                    "containers": [
                        {
                            "name": "Default",
                            "title": "@language-workflow-title",
                            "regionName": "DataRegion"
                        },
                        {
                            "name": "Extract",
                            "title": "@language-common-extract-data",
                            "regionName": "DataRegion",
                            "iconUri": "Resources/Images/Icons/layerlist-extract-24.png"
                        },
                        {
                            "name": "ModalWindow",
                            "title": "@language-workflow-title",
                            "regionName": "ModalWindowRegion"
                        },
                        {
                            "name": "ModalWindowNoCloseButton",
                            "title": "@language-workflow-title",
                            "regionName": "ModalWindowRegion"
                        }
                    ]
                },
                "views": [
                    {
                        "id": "WorkflowListView",
                        "viewModelId": "WorkflowViewModel",
                        "title": "@language-workflow-workflows",
                        "iconUri": "Resources/Images/Icons/arrow-right-alt-24.png",
                        "description": "@language-workflow-site-workflows",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowListView",
                        "markup": "Mapping/modules/Workflow/WorkflowListView.html",
                        "region": "DataRegion",
                        "showBackButtonAsX": true,
                        "visible": false,
                        "configuration": {
                            "hideOnClickWorkflow": false
                        }
                    }
                ],
                "viewModels": [
                    {
                        "id": "WorkflowViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.WorkflowViewModel",
                        "configuration": {}
                    }
                ]
            },
            {
                "moduleName": "ZoomControl",
                "moduleType": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomControlModule",
                "configuration": {},
                "views": [
                    {
                        "id": "GeolocateView",
                        "viewModelId": "GeolocateViewModel",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.GeolocateView",
                        "markup": "Mapping/modules/ZoomControl/GeolocateView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ZoomInView",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomInView",
                        "markup": "Mapping/modules/ZoomControl/ZoomInView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    },
                    {
                        "id": "ZoomOutView",
                        "visible": true,
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.ZoomOutView",
                        "markup": "Mapping/modules/ZoomControl/ZoomOutView.html",
                        "region": "TopLeftMapRegion",
                        "configuration": {}
                    }
                ],
                "viewModels": [
                    {
                        "id": "GeolocateViewModel",
                        "type": "geocortex.essentialsHtmlViewer.mapping.modules.zoomcontrol.GeolocateViewModel",
                        "configuration": {}
                    }
                ]
            }
        ],
        "widgets": [
            {
                "id": "AutoCompleteBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.AutoCompleteBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/AutoCompleteBoxFormItemView.html"
            },
            {
                "id": "CheckBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.CheckBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/CheckBoxFormItemView.html"
            },
            {
                "id": "ComboBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ListBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ComboBoxFormItemView.html"
            },
            {
                "id": "ContainerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ContainerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ContainerFormItemView.html"
            },
            {
                "id": "DatePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.DatePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/DatePickerFormItemView.html"
            },
            {
                "id": "FilePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FilePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/FilePickerFormItemView.html"
            },
            {
                "id": "GroupBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.GroupBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/GroupBoxFormItemView.html"
            },
            {
                "id": "HyperlinkFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.HyperlinkFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/HyperlinkFormItemView.html"
            },
            {
                "id": "ImageFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FormItemViewBase",
                "markup": "Mapping/modules/Workflow/Forms/Items/ImageFormItemView.html"
            },
            {
                "id": "LabelFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.FormItemViewBase",
                "markup": "Mapping/modules/Workflow/Forms/Items/LabelFormItem.html"
            },
            {
                "id": "ListBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.ListBoxFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/ListBoxFormItemView.html"
            },
            {
                "id": "RadioButtonFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.RadioButtonFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/RadioButtonFormItemView.html"
            },
            {
                "id": "TextAreaFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TextEntryFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TextAreaFormItemView.html"
            },
            {
                "id": "TextBoxFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TextEntryFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TextBoxFormItemView.html"
            },
            {
                "id": "TimePickerFormItem",
                "type": "geocortex.essentialsHtmlViewer.mapping.modules.workflow.forms.items.TimePickerFormItemView",
                "markup": "Mapping/modules/Workflow/Forms/Items/TimePickerFormItemView.html"
            }
        ]
    }
}