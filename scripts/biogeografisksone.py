# -*- coding: utf-8 -*-

'''
Created on 13. 03. 2014

@author: ermias
'''

__version__ = "0.0.1"


import csv
import os
import glob
import sys
#prefer OSGeo distro
try:
	from osgeo import ogr
except:
	import ogr

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

inshp_dir = "/home/ermias/biogeografisksone"
outshp_dir = "/home/ermias/biogeografisksone_utf8"
shp_to_utf8(inshp_dir, outshp_dir)
shp = "/home/ermias/biogeografisksone_utf8/BiogeografiSksone.shp"
driver = ogr.GetDriverByName('ESRI Shapefile')





# Begin Testing
def test():
    import doctest
    doctest.NORMALIZE_WHITESPACE = 1
    doctest.testfile("README.txt", verbose=1)

if __name__ == "__main__":
    """
    Doctests are contained in the file 'README.txt'. This library was originally developed
    using Python 2.3. Python 2.4 and above have some excellent improvements in the built-in
    testing libraries but for now unit testing is done using what's available in
    2.3.
    """
    test()
