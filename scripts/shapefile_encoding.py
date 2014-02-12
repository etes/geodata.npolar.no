# -*- coding: utf-8 -*-

'''
Created on 23. jan. 2014

@author: ermias
'''

import csv
import os
import glob
import ogr

def csv_to_dict(path, encoding, **kwargs):
    doc = []
    with open(path, 'rb') as csvfile:
        csv_reader = csv.DictReader(csvfile, **kwargs)
        doc = [dict((k.decode(encoding).encode('utf-8'), v) for k, v in row.iteritems()) for row in csv_reader]
    return doc

def getFileName(infile):
    import os
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

