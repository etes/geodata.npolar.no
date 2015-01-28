'''
Created on 14. feb. 2014

@author: Norwegian Polar Institute
'''

import ogr
import os
import sys

# set the working directory
os.chdir('/home/ermias/protectedplanet')

inShp = "WDPApoly_August2013.shp"
outShp = "protected_barents.shp"

# get the shapefile driver
driver = ogr.GetDriverByName('ESRI Shapefile')
in_data = driver.Open(inShp, 0)
if in_data is None:
  print 'Could not open file'
  sys.exit(1)
layer = in_data.GetLayer()

# create a shapefile and layer
if os.path.exists(outShp):
  driver.DeleteDataSource(outShp)
out_data = driver.CreateDataSource(outShp)
if out_data is None:
  print 'Could not create file'
  sys.exit(1)
outLayer = out_data.CreateLayer('protected_barents', srs=layer.GetSpatialRef(), geom_type=layer.GetLayerDefn().GetGeomType())

feature = layer.GetFeature(0)
[outLayer.CreateField(feature.GetFieldDefnRef(i)) for i in range(feature.GetFieldCount())]

inFeature = layer.GetNextFeature()
while inFeature:
  country = inFeature.GetField('COUNTRY')
  if country in ('RUS', 'NOR', 'SJM'):
    outLayer.CreateFeature(inFeature)
  inFeature.Destroy()
  inFeature = layer.GetNextFeature()

in_data.Destroy()
out_data.Destroy()
