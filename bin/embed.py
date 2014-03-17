
import arcpy

mxd = arcpy.mapping.MapDocument(r"W:/NP/SvalbardTema/embed.mxd")
layers = arcpy.mapping.ListLayers(mxd)[33]
for layer in layers:
    if layer.symbologyType == "UNIQUE_VALUES":
        print layer.symbology.classValues[0].decode('utf8')
        layer.definitionQuery = "'" + layer.symbology.valueField + "' = '" + layer.symbology.classValues[0] + "'"

