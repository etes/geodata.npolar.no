import xml.etree.ElementTree as ET
tree = ET.parse('svalbardkartet_site.xml')
root = tree.getroot()
mms_metadata = 'https://data.npolar.no/dataset/246c1053-6fdc-5043-b7b4-284f4fa8c095'
seabird_metadata = 'https://data.npolar.no/dataset/246c1053-6fdc-5043-b7b4-284f4fa8c095'
def featureDesc(metadata):
    return '<a href="' + metadata + '" target="_blank">Metadata</a>'

for groupLayer in root.iter('GroupLayer'):
    if groupLayer.get('Name') == u'Sj\xf8fugl kolonier':
        for layer in groupLayer.iter('Layer'):
            layer.set('FeatureDescription', featureDesc(seabird_metadata))
            layer.attrib.pop('FeatureLongDescription', None)
        del layer
    if groupLayer.get('Name') == u'Sj\xf8pattedyr observasjoner pr. 2009':
        for layer in groupLayer.iter('Layer'):
            layer.set('FeatureDescription', featureDesc(mms_metadata))
        del layer

tree.write('svalbardkartet_site.xml')
