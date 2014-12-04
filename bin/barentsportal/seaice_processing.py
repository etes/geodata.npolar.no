# -*- coding: utf-8 -*-
'''
Created on 21. Oct. 2014

@author: ermias
'''

import arcpy
from arcpy import env
from arcpy.sa import *
import os, glob, fnmatch

in_dir = "E:\\Data\\Barentsportal\\Oceanography\\seaice\\maxkonig\\polar_stereographic\\New Folder"
out_dir = "E:\\Data\\Barentsportal\\Oceanography\\seaice\\maxkonig\\EPSG32637_resampled"
shp_file = "E:\\Data\\Barentsportal\\Oceanography\\map_frame_polygon.shp"
workspace = "E:\\data\\workspace.gdb"
if not os.path.exists(workspace):
    arcpy.CreateFileGDB_management(os.path.dirname(workspace), os.path.basename(workspace))
arcpy.env.workspace = workspace
arcpy.env.overwriteOutput = True
in_prj = "PROJCS['NSIDC_Sea_Ice_Polar_Stereographic_North',GEOGCS['GCS_Hughes_1980',DATUM['D_Hughes_1980',SPHEROID['Hughes_1980',6378273.0,298.279411123064]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]],PROJECTION['Stereographic_North_Pole'],PARAMETER['false_easting',0.0],PARAMETER['false_northing',0.0],PARAMETER['central_meridian',-45.0],PARAMETER['standard_parallel_1',70.0],UNIT['Meter',1.0]]"
out_prj = "PROJCS['WGS_1984_UTM_Zone_37N',GEOGCS['GCS_WGS_1984',DATUM['D_WGS_1984',SPHEROID['WGS_1984',6378137.0,298.257223563]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]],PROJECTION['Transverse_Mercator'],PARAMETER['False_Easting',500000.0],PARAMETER['False_Northing',0.0],PARAMETER['Central_Meridian',39.0],PARAMETER['Scale_Factor',0.9996],PARAMETER['Latitude_Of_Origin',0.0],UNIT['Meter',1.0]]"

for root, dirnames, filenames in os.walk(in_dir):
  for filename in fnmatch.filter(filenames, '*.tif'):
      in_tif = os.path.join(root, filename)
      out_folder = out_dir + '\\' + root.strip(in_dir)
      if not os.path.exists(out_folder):
          os.makedirs(out_folder)
      out_tif = os.path.join(out_folder, filename)
      # Convert Raster to Polygons
      arcpy.RasterToPolygon_conversion(in_tif, "tmp_polygons", "NO_SIMPLIFY", "Value")
      print "Converted raster to polygons...", in_tif
      # Project polygons to utm 37
      arcpy.Project_management("tmp_polygons", "tmp_polygons_projected", out_prj, "", in_prj)
      print "Done projecting features to UTM 37..."
      # Convert Polygons to Raster
      arcpy.FeatureToRaster_conversion("tmp_polygons_projected", "gridcode", out_tif.replace('.tif', '_unmasked.tif'), "5000")
      print 'Finished projecting to UTM37', out_tif.replace('.tif', '_unmasked.tif')
      if arcpy.CheckExtension("Spatial") == "Available":
          arcpy.CheckOutExtension("Spatial")
          arcpy.gp.ExtractByMask_sa(out_tif.replace('.tif', '_unmasked.tif'),shp_file,out_tif.replace('.tif', '_EPSG32637.tif'))
          [os.remove(file) for file in glob.glob(out_tif.replace('.tif', '_unmasked*'))]
          print 'Finished masking and saved as %s' %(out_tif.replace('.tif', '_EPSG32637.tif'))
      else:
          print "Spatial Analyst license is unavailable, final output raster is not masked"

arcpy.CheckInExtension("Spatial")

mdict = {'1' : 'January', '2' : 'February', '3' : 'March', '4' : 'April', '5' : 'May', '6' : 'June', '7' : 'July', '8' : 'August', '9' : 'September', '10' : 'October', '11' : 'November', '12' : 'December'}


''' Commented on: 20141031
# GDAL way
import os, fnmatch
import tempfile
import shapefile
import subprocess


# Local variables:
in_dir = "E:\\Data\\Barentsportal\\Oceanography\\seaice\\maxkonig\\EPSG32637_clip"
out_dir = "E:\\Data\\Barentsportal\\Oceanography\\seaice\\maxkonig\\EPSG32637_test"
shp_file = "E:\\Data\\Barentsportal\\Oceanography\\map_frame_polygon.shp"
shp = shapefile.Reader(shp_file)
extent = map(str,shp.shapes()[0].bbox)

for root, dirnames, filenames in os.walk(in_dir):
  for filename in fnmatch.filter(filenames, '*.tif'):
      in_tif = os.path.join(root, filename)
      out_folder = out_dir + '\\' + root.strip(in_dir)
      if not os.path.exists(out_folder):
          os.makedirs(out_folder)
      out_tif = os.path.join(out_folder, filename)
      tmp_tif = tempfile.NamedTemporaryFile(delete = False, suffix='.tif')
      try:
         #os.system('gdalwarp.exe -tr 25000 -25000 -s_srs EPSG:3411 -t_srs EPSG:32637 ' + in_tif + ' ' + tmp_tif.name)
         #os.system('gdalwarp.exe -s_srs EPSG:3411 -t_srs EPSG:32637 ' + in_tif + ' ' + tmp_tif.name)
         #os.system("gdal_translate -projwin " + " ".join((extent[0],extent[3],extent[2],extent[1])) + " -of GTiff " + tmp_tif.name + " " + out_tif)
         os.system("gdalwarp -dstnodata 255 -q -cutline " + shp_file  + " -crop_to_cutline -of GTiff " + in_tif + " " + out_tif)
      finally:
         # Cleanup temporary files
         tmp_tif.close()
         os.remove(tmp_tif.name)
      print "Reprojected %s to UTM 37 and saved as %s" % (in_tif, out_tif)
'''
