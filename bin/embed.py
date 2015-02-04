
import arcpy

mxd = arcpy.mapping.MapDocument(r"W:/NP/SvalbardTema/embed.mxd")
layers = arcpy.mapping.ListLayers(mxd)[33]
for layer in layers:
    if layer.symbologyType == "UNIQUE_VALUES":
        for layer in layers:
            arcpy.env.workspace = layer.workspacePath
            fcs = arcpy.ListFeatureClasses('','','sjopattedyrobservasjon')
            for fc in fcs:
                if layer.name.split(' ')[0] in fc:
                    layer.replaceDataSource(layer.workspacePath, "FILEGDB_WORKSPACE", fc)
                    layer.definitionQuery = ""
                    print layer.name.encode('utf8')
                    print layer.dataSource.encode('utf8')
