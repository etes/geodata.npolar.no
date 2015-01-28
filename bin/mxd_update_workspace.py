'''
Created on 21. mars 2014

@author: Norwegian Polar Institute
'''

import arcpy, os
folderPath = r"W:\NP\SvalbardTema"
for filename in os.listdir(folderPath):
    fullpath = os.path.join(folderPath, filename)
    if os.path.isfile(fullpath):
        basename, extension = os.path.splitext(fullpath)
        if extension.lower() == ".mxd":
            mxd = arcpy.mapping.MapDocument(fullpath)
            mxd.findAndReplaceWorkspacePaths(r"E:\Data", r"\\willem2\Data")
            mxd.save()
del mxd
