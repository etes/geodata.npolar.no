import os
import json
import requests
from geoserver.catalog import Catalog
import geoserver.util

username = 'admin'
password = 'geoserver'
geoserver_url = 'http://localhost:8080/geoserver/rest'

curlcmd = 'curl -u username:password -XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>pboh_monthly_april</name></defaultStyle></layer>"\
 http://localhost:8080/geoserver/rest/layers/barentsportal:PolarBearOptimalHabitat_Monthly_April_1992-1996'

def publish_raster(geoserver_url, username,password, in_raster, workspace):
    file_name = os.path.splitext(os.path.basename(in_raster))[0]
    dest= '/'.join([geoserver_url, 'workspaces', workspace, 'coveragestores', file_name, 'file.geotiff'])
    command = 'curl -v -u '+ username + ':' +password + ' -XPUT -H "Content-type: image/tiff" --data-binary @' + in_raster + ' ' + dest
    os.system(command)

def publish_sld(geoserver_url, username, password, style_file, style_name):
    style_def= "<style><name>" + style_name +"</name><filename>" + os.path.basename(style_file) + "</filename></style>"
    curlCmd_style_def = 'curl -v -u ' + username + ':' + password + ' -XPOST -H "Content-type: text/xml" -d "' + style_def + '" ' + '/'.join([geoserver_url, 'styles'])
    dest= '/'.join([geoserver_url, 'styles', style_name])
    curlCmd_style = 'curl -v -u ' + username + ':' + password + ' -XPUT -H "Content-type: application/vnd.ogc.sld+xml" -d @' + style_file + ' ' + dest
    os.system(curlCmd_style_def)
    os.system(curlCmd_style)


# using gsconfig library

def geojson_to_shp(url, filename):
    req = requests.get(url)
    assert req.ok
    data = req.json()
    geojson = filename + '.geojson'
    with open(geojson, 'w') as outfile:
        json.dump(data, outfile)
    ogrCmd = 'ogr2ogr -F "ESRI Shapefile" ' + filename + '.shp ' + geojson + ' OGRGeoJSON'
    os.system(ogrCmd)

def shp_to_geoserver(geoserver_url, shapefile, workspace):
    cat = Catalog(geoserver_url, username, password)
    create_workspace(geoserver_url, username, password, workspace)
    shapefile_plus_sidecars = geoserver.util.shapefile_and_friends(shapefile)
    file_name = os.path.splitext(os.path.basename(shapefile))[0]
    workspace = cat.get_workspace(workspace)
    if not file_name in [l.name for l in cat.get_layers()]:
        print 'Creating new layer: %s' %file_name
        cat.create_featurestore(file_name, shapefile_plus_sidecars, workspace)
    else:
        print 'Layer %s already exists' %file_name


def create_workspace(server, username, password, workspace):
    cat = Catalog(server, username, password)
    if not workspace in [w.name for w in cat.get_workspaces()]:
        print 'Creating workspace: %s' %workspace
        cat.create_workspace(workspace, 'api.npolar.no/' + workspace)

def raster_to_geoserver(geoserver_url, raster, workspace):
    cat = Catalog(geoserver_url, username, password)
    create_workspace(geoserver_url, username, password, workspace)
    file_name = os.path.splitext(os.path.basename(raster))[0]
    workspace = cat.get_workspace(workspace)
    if not file_name in [l.name for l in cat.get_layers()]:
        print 'Creating new layer: %s' %file_name
        cat.create_coveragestore(file_name, raster, workspace)
    else:
        print 'Layer %s already exists' %file_name

'''
nice2015_url = "http://api.npolar.no/expedition/track/?q=&format=geojson&filter-code=N-ICE2015&limit=all"
filename = 'n-ice2015'
#geojson_to_shp(nice2015_url, filename)
#shp_to_geoserver(geoserver_url, filename, 'expedition')

in_raster = "/home/ermias/data/barentsportal/polarbear/PolarbearOptimalHabitat/Monthly/PolarBearOptimalHabitat_Montly_April_1992-1996.tif"
raster_to_geoserver(geoserver_url,in_raster, 'barentsportal')

cat = Catalog(geoserver_url, username, password)
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
'''
