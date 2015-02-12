import os
import json
import requests
from geoserver.catalog import Catalog
import geoserver.util

username = "admin"
password = "geoserver"
geoserver_rest = 'http://localhost:8080/geoserver/rest'

curlcmd = 'curl -u username:password -XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>pboh_monthly_april</name></defaultStyle></layer>"\
 http://localhost:8080/geoserver/rest/layers/barentsportal:PolarBearOptimalHabitat_Monthly_April_1992-1996'
def publish_raster(geoserver_rest, username,password, in_raster, workspace):
    file_name = os.path.splitext(os.path.basename(in_raster))[0]
    dest= '/'.join([geoserver_rest, 'workspaces', workspace, 'coveragestores', file_name, 'file.geotiff'])
    command = 'curl -v -u '+ username + ':' +password + ' -XPUT -H "Content-type: image/tiff" --data-binary @' + in_raster + ' ' + dest
    os.system(command)

def publish_sld(geoserver_rest, username, password, style_file, style_name):
    style_def= "<style><name>" + style_name +"</name><filename>" + os.path.basename(style_file) + "</filename></style>"
    curlCmd_style_def = 'curl -v -u ' + username + ':' + password + ' -XPOST -H "Content-type: text/xml" -d "' + style_def + '" ' + '/'.join([geoserver_rest, 'styles'])
    dest= '/'.join([geoserver_rest, 'styles', style_name])
    curlCmd_style = 'curl -v -u ' + username + ':' + password + ' -XPUT -H "Content-type: application/vnd.ogc.sld+xml" -d @' + style_file + ' ' + dest
    os.system(curlCmd_style_def)
    os.system(curlCmd_style)


# using gsconfig library
nIce2015_url = "http://api.npolar.no/expedition/track/?q=&format=geojson&filter-code=N-ICE2015&limit=all"
req = requests.get(nIce2015_url)
assert req.ok
data = req.json()
with open('n-ice2015.geojson', 'w') as outfile:
    json.dump(data, outfile)

os.system('ogr2ogr -F "ESRI Shapefile" n-ice2015.shp n-ice2015.geojson OGRGeoJSON')

cat = Catalog(geoserver_rest, username, password)

shapefile_plus_sidecars = geoserver.util.shapefile_and_friends("n-ice2015")
workspaces = cat.get_workspaces()
if not "expedition" in [w.name for w in workspaces]:
    cat.create_workspace("expedition", "api.npolar.no/expedition/track")

expedition = cat.get_workspace("expedition")

#ft = cat.create_featurestore("n-ice2015", shapefile_plus_sidecars, expedition)
in_raster = "/home/ermias/data/barentsportal/polarbear/PolarbearOptimalHabitat/Monthly/PolarBearOptimalHabitat_Montly_April_1992-1996.tif"

file_name = os.path.splitext(os.path.basename(in_raster))[0]
workspaces = cat.get_workspaces()
workspace= "barentsportal"
if not workspace in [w.name for w in workspaces]:
    cat.create_workspace(workspace, "geodata.npolar.no/barentsportal")
layers = cat.get_layers()
if not file_name in [l.name for l in layers]:
    print "Creating new layer: %s" %file_name
    cat.create_coveragestore(file_name, in_raster, workspace)

cat = Catalog("http://liv.npolar.no:8080/geoserver/rest", username, password)
styles = cat.get_styles()
style_file = "polarbearOH_monthly.sld"
style_name = os.path.splitext(os.path.basename(style_file))[0]
if not os.path.basename(style_file) in [s.filename for s in styles]:
    print "Creating style: %s" %style_file
    cat.create_style(style_name, open(style_file).read())


layer = cat.get_layer(file_name)
default_style = cat.get_style(style_name)
layer.default_style = default_style_style
cat.save(layer)
cat.reload()
