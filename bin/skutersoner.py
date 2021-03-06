'''
Created on 8. aug. 2014

@author: Norwegian Polar Institute

This script fixes the url attribute of the Skuterbegrensning data from Sysselmannen.
Part of the data had two URLs in a single field separated by a comma, which produces an invalid
hyperlink when published as a map service.
The script separates the URLs in add them into two separate fields (Lenke and Lenke2)
'''
import os
import arcpy
from arcpy import env

env.workspace = "SMS_data_Svalbardkartet.gdb/Skuterbegrensning"

inFeatureClass = "E:/Data/SMS/etrs89/SMS_data_Svalbardkartet.gdb/Skuterbegrensning/Skuterferdsel_Svalbkartet_0814"

code_block_add_url = '''def add_url(lenke):
    if len(lenke.split(',')) == 2:
        return lenke.split(',')[1].strip()
    else:
        return ""
'''

code_block_fix_url = '''def fix_url(lenke):
    if len(lenke.split(',')) == 2:
        return lenke.split(',')[0].strip()
    else:
        return lenke
'''

#arcpy.AddField_management("Skuterferdsel_Svalbkartet_0814", 'Lenke2', "text", "", "", "255")
print "Added new field Lenke2"
arcpy.CalculateField_management(inFeatureClass,"Lenke2", "add_url(!Lenke!)","PYTHON",code_block_add_url)
print "Added second url to lenke2"
arcpy.CalculateField_management(inFeatureClass,"Lenke", "fix_url(!Lenke!)","PYTHON",code_block_fix_url)
