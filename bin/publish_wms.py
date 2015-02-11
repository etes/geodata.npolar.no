import os
from geoserver.catalog import Catalog

def publish_raster(geoserver_rest, username,password, in_raster, workspace):
    file_name = os.path.splitext(os.path.basename(in_raster))[0]
    dest= '/'.join([geoserver_rest, 'workspaces', workspace, 'coveragestores', file_name, 'file.geotiff'])
    command = 'curl -v -u '+ username + ':' +password + ' -XPUT -H "Content-type: image/tiff" --data-binary @' + in_raster + ' ' + dest
    os.system(command)

def publish_sld(geoserver_rest, username, password, style_file, style_name):
    style_def= "<style><name>" + style_name +"</name><filename>" + os.path.basename(style_file) + "</filename></style>"
    curlString_style_def = 'curl -v -u ' + username + ':' + password + ' -XPOST -H "Content-type: text/xml" -d "' + style_def + '" ' + '/'.join([geoserver_rest, 'styles'])
    dest= '/'.join([geoserver_rest, 'styles', style_name])
    curlString_style = 'curl -v -u ' + username + ':' + password + ' -XPUT -H "Content-type: application/vnd.ogc.sld+xml" -d @' + style_file + ' ' + dest
    os.system(curlString_style_def)
    os.system(curlString_style)

curl -u username:password -XPUT -H 'Content-type: text/xml' -d '<layer><defaultStyle><name>pboh_monthly_april</name></defaultStyle></layer>'\
 http://liv.npolar.no:8080/geoserver/rest/layers/barentsportal:PolarBearOptimalHabitat_Montly_April_1992-1996

username = "admin"
password = "password"
geoserver_rest = 'http://localhost:8080/geoserver/rest'
cat = Catalog(geoserver_rest, username, password)

shapefile_plus_sidecars = geoserver.util.shapefile_and_friends("data/sjopattedyrobservasjoner")
svalbardkartet = cat.get_workspace("svalbardkartet")

ft = cat.create_featurestore("sjopattedyrobservasjoner", shapefile_plus_sidecars, svalbardkartet)
in_raster = "E:/Data/Barentsportal/Biodiversity/Polarbear/PolarbearOptimalHabitat/Monthly/PolarBearOptimalHabitat_Montly_April_1992-1996.tif"

file_name = os.path.splitext(os.path.basename(in_raster))[0]
workspace= "barentsportal"
cat.create_coveragestore(file_name, in_raster, workspace)

cat = Catalog("http://liv.npolar.no:8080/geoserver/rest", username, password)
layer = cat.get_layer(file_name)
layer_style = cat.get_style('pboh_monthly_april')
layer.default_style = layer_style
cat.save(layer)
cat.reload()
