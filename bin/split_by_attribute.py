# -*- coding: utf-8 -*-
print "Importing required modules... "
import arcpy
import os
import sys
from arcpy import env

env.overwriteOutput = True

in_shp = arcpy.GetParameterAsText(0)
out_dir = os.path.normpath(arcpy.GetParameterAsText(1)) # Normalize the pathname
field_name = arcpy.GetParameterAsText(2)

if not os.path.exists(out_dir):
    print "Creating output directory: " + out_dir
    os.mkdir(out_dir)

try:
    rows = arcpy.SearchCursor(in_shp)
except Exception, e:
    print >> sys.stderr, "Error reading shapefile"
    print >> sys.stderr, "Exception: %s" % repr(e)
    sys.exit(1)

try:
    # Create a list of unique attributes from a shapefile field
    row = rows.next()
    attributes = set([])
    while row:
        attributes.add(row.getValue(field_name))
        row = rows.next()
except Exception, e:
    print >> sys.stderr, "Field does not exist in shapefile"
    print >> sys.stderr, "Exception: %s" % repr(e)
    sys.exit(1)

# Create a Shapefile from a subset of features based on unique attribute value
for attribute in attributes:
    out_shp = out_dir + "\\" + attribute + ".shp"
    where_clause = field_name + " = '" + attribute + "'"
    arcpy.Select_analysis(in_shp, out_shp, where_clause)
    print out_shp.encode("utf8")

del row, rows, attributes
