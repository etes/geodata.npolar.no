#!/bin/sh
geoserver=http://liv.npolar.no:8080/geoserver
username=username
password=password
workspace=barentsportal
format=GeoTIFF
workspace_schema="<workspace><name>$workspace</name></workspace>"
#create workspace
#curl -v -u $username:$password -XPOST -H "Content-type: application/xml" -d $workspace_schema $geoserver"/rest/workspaces"

#curl -v -u $username:$password -XPOST -H "Content-type: application/xml" -d "<coverageStore><name>raster</name><type>GeoTIFF</type><workspace>barentsportal</workspace><enabled>true</enabled></coverageStore>" "http://liv.npolar.no:8080/geoserver/rest/workspaces/barentsportal/coveragestores"
data=data/barentsportal/polarbear_optimal_habitat/Change/
curl -v -u $username:$password -XPUT -H "Content-type: image/tiff" --data-binary @dl/polarbear_optimal_habitat/Change/PolarBearOptimalHabitat_Change_April_1992-1996_to_2013.tif http://liv.npolar.no:8080/geoserver/rest/workspaces/barentsportal/coveragestores/PolarBearOptimalHabitat_Change_April_1992-1996_to_2013.tif/file.geotiff


class publisher:
    @staticmethod
    def geoserver_url(env):
        return 'http://liv.npolar.no.8080/geoserver'

    self.workspace_url =
