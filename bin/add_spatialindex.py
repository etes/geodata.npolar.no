'''
Created on 19. mars 2013

@author: ermias
'''

import sys, arcpy, getopt

def main(argv):
  inDir = ''
  try:
    opts, args = getopt.getopt(argv,"hi:o:",["ifile="])
  except getopt.GetoptError:
    print 'addSpatialIndex.py -i <directory>'
    sys.exit(2)
  for opt, arg in opts:
    if opt == '-h':
      print 'addSpatialIndex.py -i <directory>'
      sys.exit()
    elif opt in ("-i", "--ifile"):
      inDir = arg
  
  arcpy.env.workspace = inDir
  fcs = arcpy.ListFeatureClasses()
  for fc in fcs:
    print fc
    arcpy.AddSpatialIndex_management(fc, "0", "0", "0")

  print "Spaital Index added for shapefiles at ", inDir

if __name__ == "__main__":
   main(sys.argv[1:])