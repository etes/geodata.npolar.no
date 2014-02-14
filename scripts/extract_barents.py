'''
Created on 14. feb. 2014

@author: ermias
'''

import ogr
import os

# set the working directory
os.chdir('/home/ermias/protectedplanet')

inShp = "WDPApoly_August2013.shp"
outShp = "protected_barents.shp"
query = """
COUNTRY in ('RUS','NOR', 'SJM')
"""
#@TODO find elegant alternative
os.system('ogr2ogr -f "ESRI Shapefile" -where "' + query + '" -overwrite ' + outShp + ' ' + outShp)