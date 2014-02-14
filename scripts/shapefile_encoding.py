# -*- coding: utf-8 -*-

'''
Created on 23. jan. 2014

@author: ermias
'''

import csv
import os
import glob
#prefer OSGeo distro
try:
    from osgeo import ogr
except:
    import ogr

def csv_to_dict(path, encoding, **kwargs):
    doc = []
    with open(path, 'rb') as csvfile:
        csv_reader = csv.DictReader(csvfile, **kwargs)
        doc = [dict((k.decode(encoding).encode('utf-8'), v) for k, v in row.iteritems()) for row in csv_reader]
    return doc

def getFileName(infile):
    basename = os.path.basename(infile) #get filename with extension seperately
    (fileName, extension) = os.path.splitext(basename)
    return fileName

def shp_to_utf8(inDir, outDir):
    # encode shapefile to utf8
    import glob, os
    filelist = glob.glob(inDir + "/*.shp")
    os.system('export SHAPE_ENCODING="ISO-8859-1"')
    if not os.path.exists(outDir):
        os.makedirs(outDir)
    for inShp in filelist:
        outShp = outDir + "/" + os.path.basename(inShp)
        os.system('ogr2ogr ' + outShp + " " + inShp +' -lco ENCODING=UTF-8')

def populate_field(shpfile, field, fieldValue):
    dataSource = driver.Open(shp, 1)
    layer = dataSource.GetLayer()
    feature = layer.GetNextFeature()
    while feature:
        feature.SetField(field, fieldValue)
        layer.SetFeature(feature)
        feature = layer.GetNextFeature()
    dataSource.Destroy()

# bird species names russian
inshp_dir = "/home/ermias/seabird"
outshp_dir = "/home/ermias/seabirdUTF8"
shp_to_utf8(inshp_dir, outshp_dir)

bird_dict_file = '/home/ermias/data/birds_dictionary.csv'
bird_dicts = csv_to_dict(bird_dict_file, encoding='utf-8-sig', delimiter=';')
shplist = glob.glob(outshp_dir + "/*.shp")
driver = ogr.GetDriverByName('ESRI Shapefile')
for shp in shplist:
    for row in bird_dicts:
        if row['Acronym'] == getFileName(shp):
            populate_field(shp, 'Russian', row['Russian'])
            print 'russian populated to %s' %getFileName(shp)



