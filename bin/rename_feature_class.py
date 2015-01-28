'''
Created on 24. mars 2014

@author: Norwegian Polar Institute
'''

import os
import arcpy
from arcpy import env

env.workspace = "E:/Data/SMS/20130925/Svalbardplan_Versjon45_2014.gdb/Svalbardplan"

# @TODO add all non-ascii characters and other invalid characters
chars = {u'\xe5':'aa', u'\xc5': 'AA', u'\xf8':'oe', u'\xd8': 'OE'}
fcs = arcpy.ListFeatureClasses()
for fc in fcs:
    out_data = fc
    for key, value in chars.items():
        if key in fc:
            out_data = fc.replace(key, value)
            arcpy.Rename_management(fc, out_data, "FeatureClass")
    print out_data

fcs = arcpy.ListFeatureClasses()
fieldNames = [f.name for f in arcpy.ListFields(fc)]

# replace non-ascii characters from field names
for fc in fcs:
    fieldList = arcpy.ListFields(fc)
    for field in fieldList:
        for key, value in chars.items():
            if key in field.name:
                new_field = field.name.replace(key,value)
                fieldType = field.type
                if arcpy.ListFields(fc, new_field):
                    arcpy.DeleteField_management(fc, field.name)
                else:
                    arcpy.AddField_management(fc, new_field, fieldType)
                    # calculate new field values from old field
                    arcpy.CalculateField_management(fc, new_field, "!"+field.name+"!", "PYTHON")
                    arcpy.DeleteField_management(fc, field.name)          
                
    fieldList = None
fc = None
