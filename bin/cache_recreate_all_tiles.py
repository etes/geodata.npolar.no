# Empty quotes take the default value.
# To accept arguments from the command line replace values of variables to
# "sys.argv[]"

# Import system modules
import os, sys, time, datetime, traceback, string
import arcpy
from arcpy import env

# Set environment settings
env.workspace = "E:/data" # @todo: retrieve this from command line

# List of input variables for map service properties
serviceConn = "C:/Users/ermias/AppData/Roaming/ESRI/Desktop10.2/ArcCatalog/arcgis on willem3 (admin)"
serviceFolder = "Basisdata_Intern"
serviceName = "NP_Ortofoto_Svalbard_WMTS_25833" # @todo: retrieve this from command line
serviceType = "MapServer"

inputService = serviceConn + "/" + serviceFolder + "/" + serviceName + "." + serviceType
scales = "1250"
numOfCachingServiceInstances = 3
updateMode = "RECREATE_ALL_TILES"
areaOfInterest = ""
waitForJobCompletion = "DO_NOT_WAIT" # use "WAIT" if full report wanted (script runs until job finishes)
updateExtents = ""

currentTime = datetime.datetime.now()
arg1 = currentTime.strftime("%H-%M")
arg2 = currentTime.strftime("%Y-%m-%d %H:%M")
file = env.workspace + '/report_%s.txt' % arg1

# print results of the script to a report
report = open(file,'w')

try:
    starttime = time.clock()
    result = arcpy.ManageMapServerCacheTiles_server(inputService, scales,
                                                    updateMode,
                                                    numOfCachingServiceInstances,
                                                    areaOfInterest, updateExtents,
                                                    waitForJobCompletion)
    finishtime = time.clock()
    elapsedtime= finishtime - starttime

    print "Started recreating cache tiles..."
    #print messages to a file
    while result.status < 4:
        time.sleep(0.2)
    resultValue = result.getMessages()
    report.write ("completed " + str(resultValue))

    print "Created cache tiles for given schema successfully for "
    serviceName + " in " + str(elapsedtime) + " sec \n on " + arg2
    
except Exception, e:
    # If an error occurred, print line number and error message
    tb = sys.exc_info()[2]
    report.write("Failed at step 1 \n" "Line %i" % tb.tb_lineno)
    report.write(e.message)
report.close()
    
print "Created Map server Cache Tiles "