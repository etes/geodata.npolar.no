# ---------------------------------------------------------------------------
# recplassPolarbear.py
# Created on: 2013-09-03 10:33:09.00000
# author: ermias
# Description: reclass polar bear kernel density map
# ---------------------------------------------------------------------------
import arcpy
from arcpy import env
from arcpy.sa import *

env.workspace = "E:/Data/Barentsportal/Polarbear/kernel_density"
env.overwriteOutput = True

reclassField = "Value"
remapAug = RemapRange([[0,0.00015824,1],[0.00015824,0.00047472,2],[0.00047472,0.001107679,3],[0.001107679,0.001589,4]])
remapDes = RemapRange([[0,0.001190752,1],[0.001190752,0.003572256,2],[0.003572256,0.008335265,3],[0.008335265,0.01198,4]])
remapJun = RemapRange([[0,0.000517426,1],[0.000517426,0.001552279,2],[0.001552279,0.003621984,3],[0.003621984,0.005175,4]])
remapOkt = RemapRange([[0,0.000218548,1],[0.000218548,0.000655643,2],[0.000655643,0.001529833,3],[0.001529833,0.00218549,4]])

# Check out the ArcGIS Spatial Analyst extension license
arcpy.CheckOutExtension("Spatial")

# Execute Reclassify
outReclassify = Reclassify("kd_augsep", reclassField, remapAug, "NODATA")
print "convert raster to polygon."
arcpy.RasterToPolygon_conversion(outReclassify,"E:/Data/Barentsportal/Polarbear/kernel_density/kernel_density.gdb/kd_augsep","SIMPLIFY","VALUE")
outReclassify = Reclassify("kd_desmai", reclassField, remapDes, "NODATA")

arcpy.RasterToPolygon_conversion(outReclassify,"E:/Data/Barentsportal/Polarbear/kernel_density/kernel_density.gdb/kd_desmai","SIMPLIFY","VALUE")

outReclassify = Reclassify("kd_junjul", reclassField, remapJun, "NODATA")
arcpy.RasterToPolygon_conversion(outReclassify,"E:/Data/Barentsportal/Polarbear/kernel_density/kernel_density.gdb/kd_junjul","SIMPLIFY","VALUE")

outReclassify = Reclassify("kd_oktnov", reclassField, remapOkt, "NODATA")
arcpy.RasterToPolygon_conversion(outReclassify,"E:/Data/Barentsportal/Polarbear/kernel_density/kernel_density.gdb/kd_oktnov","SIMPLIFY","VALUE")
#outReclassify.save("kd_oktnov_re")
print "Process finished successfully." 


