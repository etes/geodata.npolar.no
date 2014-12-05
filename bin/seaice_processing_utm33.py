# -*- coding: utf-8 -*-
'''
Created on 4. des. 2014

@author: ermias
'''

import arcpy
from arcpy import env
from arcpy.sa import *
import os, glob, fnmatch
import tempfile
import shapefile

arcpy.env.overwriteOutput = True

arcpy.CheckOutExtension("Spatial")

# Local variables:
in_prj = "PROJCS['NSIDC_Sea_Ice_Polar_Stereographic_North',GEOGCS['GCS_Hughes_1980',DATUM['D_Hughes_1980',SPHEROID['Hughes_1980',6378273.0,298.279411123064]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]],PROJECTION['Stereographic_North_Pole'],PARAMETER['false_easting',0.0],PARAMETER['false_northing',0.0],PARAMETER['central_meridian',-45.0],PARAMETER['standard_parallel_1',70.0],UNIT['Meter',1.0]]"
out_prj = "PROJCS['ETRS_1989_UTM_Zone_33N',GEOGCS['GCS_ETRS_1989',DATUM['D_ETRS_1989',SPHEROID['GRS_1980',6378137.0,298.257222101]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]],PROJECTION['Transverse_Mercator'],PARAMETER['False_Easting',500000.0],PARAMETER['False_Northing',0.0],PARAMETER['Central_Meridian',15.0],PARAMETER['Scale_Factor',0.9996],PARAMETER['Latitude_Of_Origin',0.0],UNIT['Meter',1.0]]"

in_dir = "E:\\data\\Barentsportal\\Ocean\\seaice\\maxkonig\\polar_stereographic"
out_dir = "E:\\data\\Barentsportal\\Ocean\\seaice\\maxkonig\\EPSG25833"
reclassed_dir = "E:\\data\\Barentsportal\\Ocean\\seaice\\maxkonig\\EPSG25833\\reclassed"
shp_file = "\\\\willem3\\data\\Basisdata\\SJRundt\\Bakgrunnslag.shp"
shp = shapefile.Reader(shp_file)
extent = map(str,shp.shapes()[0].bbox)

if not os.path.exists(out_dir):
    os.mkdir(out_dir)

if not os.path.exists(reclassed_dir):
    os.mkdir(reclassed_dir)

for root, dirnames, filenames in os.walk(in_dir):
  for filename in fnmatch.filter(filenames, '*.tif'):
      in_tif = os.path.join(root, filename)
      out_folder = out_dir + '\\' + root.strip(in_dir)
      if not os.path.exists(out_folder):
          os.makedirs(out_folder)
      out_tif = os.path.join(out_folder, filename.replace('.tif', '_EPSG25833.tif'))
      reclassed_filepath = out_folder + 'reclassed\\'
      reclassed_tif = os.path.join(reclassed_filepath, filename.replace('.tif', '_EPSG25833_reclass.tif'))
      tmp_tif = tempfile.NamedTemporaryFile(delete = False, suffix='.tif')
      try:
         os.system('gdalwarp.exe -tr 25000 -25000 -s_srs EPSG:3411 -t_srs EPSG:25833 ' + in_tif + ' ' + tmp_tif.name)
         os.system('gdalwarp.exe -s_srs EPSG:3411 -t_srs EPSG:25833 ' + in_tif + ' ' + tmp_tif.name)
         #os.system("gdal_translate -projwin " + " ".join((extent[0],extent[3],extent[2],extent[1])) + " -of GTiff " + tmp_tif.name + " " + out_tif)
         #os.system("gdalwarp -dstnodata 255 -q -cutline " + shp_file  + " -crop_to_cutline -of GTiff " + in_tif + " " + out_tif)
         arcpy.gp.ExtractByMask_sa(tmp_tif.name, shp_file, out_tif)
         arcpy.AddMessage("Reclassifying {0}".format(out_tif))
         remap = RemapRange([[0,0.01, 0],[0.01,10,5],[10,20,15], [20,30,25],[30,40,35],[40,50,45],[50,60,55],[60,70,65],[70,80,75],[80,90,85],[90,99,95],[99,600,100]])
         #arcpy.gp.Reclassify_sa(inraster,"Value","0 0;10 5;2 25;3 55;4 80;5 95;6 100;NODATA 0",outraster,"DATA")
         outReclassify = Reclassify(out_tif, "Value", remap, "DATA")
         outReclassify.save(reclassed_tif)
         arcpy.AddMessage("Saving {0}".format(reclassed_tif))
      finally:
         # Cleanup temporary files
         tmp_tif.close()
         os.remove(tmp_tif.name)
      print "Reprojected %s to UTM 33 and saved as %s" % (in_tif, out_tif)
      

arcpy.BatchProject_management("E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198401_201301_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198402_201302_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198403_201303_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198404_201304_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198405_201305_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198406_201306_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198407_201307_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198408_201308_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198409_201309_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198410_201310_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198411_201311_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_maximum198412_201312_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198401_201301_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198402_201302_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198403_201303_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198404_201304_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198405_201305_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198406_201306_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198407_201307_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198408_201308_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198409_201309_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198410_201310_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198411_201311_snakesBezier.shp;E:/Data/Barentsportal/Ocean/seaice/maxkonig/polar_stereographic/icechart_line_minimum198412_201312_snakesBezier.shp","E:/Data/Barentsportal/Ocean/seaice/maxkonig/EPSG25833",out_prj,"#","#")

