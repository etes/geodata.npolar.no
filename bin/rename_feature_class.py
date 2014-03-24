'''
Created on 24. mars 2014

@author: ermias
'''

import arcpy
from arcpy import env

env.workspace = "E:/Data/SMS/20130925/Svalbardplan_Versjon45_2014.gdb/Svalbardplan"
chars = {u'\xe5':'aa', u'\xf8':'oe'}
fcs = arcpy.ListFeatureClasses()
for fc in fcs:
     out_data = fc
     for key, value in chars.items():
         if key in fc:
             out_data = fc.replace(key, value)
             arcpy.Rename_management(fc, out_data, "FeatureClass")
     print out_data
