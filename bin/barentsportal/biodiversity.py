# -*- coding: utf-8 -*-
'''
Created on 14. okt. 2013

@author: ermias
'''

'''
SEABIRD COLONIES
'''
import glob
import arcpy, os
mxd = arcpy.mapping.MapDocument("Biodiversity-dev.mxd")
layers = arcpy.mapping.ListLayers(mxd)[1]
arcpy.RefreshTOC()

from arcpy import env
env.workspace = "L:\\Data\\Barentsportal\\Seabird"
outgdb = "Seabird.gdb"
env.overwriteOutput = True


infc = "L:\\Data\\Barentsportal\\Seabird\\Seabird_RussiaSvalbard.shp"
birds_dict = "L:\\Data\\Barentsportal\\Seabird\\Seabird.gdb\\birds_dictionary"
for lyr in layers:
    inshp = lyr.dataSource
    acronym = lyr.symbology.valueField
    outshp = acronym + '.shp'
    fields = arcpy.ListFields(inshp)
    newFields = [u'COLONY_NAM', acronym]
    dropFields = [f.name for f in fields if not f.required and f.name not in newFields]
    arcpy.CopyFeatures_management(inshp, outshp)
    arcpy.DeleteField_management(outshp, dropFields)
    arcpy.AddField_management(outshp, "Species", "TEXT")
    arcpy.CalculateField_management(outshp, "Species", "'''" + lyr.name + "'''", "PYTHON")
    print outshp + " shape file created"
    

for lyr in layers:
    acronym = lyr.symbology.valueField
    lyr.replaceDataSource('L:\\Data\\Barentsportal\\Seabird\\', 'SHAPEFILE_WORKSPACE', acronym)
    
species_dictionary = {}

for lyr in layers:
    if not lyr.isGroupLayer:
        species_dictionary[lyr.symbology.valueField] = lyr.name

species_dictionary = {
"URLOM":"Brünnich's guillemot",
"LACAN":"Common gull",
"SOSPE":"King eider",
"LAARG":"Herring gull",
"PHCAR":"Great cormorant",
"LASAB":"Sabine's gull",
"MOBAS":"Northern gannet",
"ANANS":"Greylag goose",
"BRBER":"Light-bellied brent goose",
"BRLEU":"Barnacle goose",
"URAAL":"Common guillemot",
"ANBRA":"Pink-footed goose",
"RITRI":"Black-legged kittiwake",
"LAMAR":"Greater black-backed gull",
"SOMOL":"Common eider",
"PAEBU":"Ivory gull",
"ALALL":"Little auk",
"STPAS":"Arctic tern",
"LAFUS":"Lesser black-backed gull",
"LAHYP":"Glaucous gull",
"CEGRY":"Black guillemot",
"FRARC":"Atlantic puffin",
"PHARI":"European shag",
"ALTOR":"Razorbill",
"FUGLA":"Northern fulmar",

}

import csv

class UnicodeCsvReader(object):
    def __init__(self, f, encoding="utf-8", **kwargs):
        self.csv_reader = csv.reader(f, **kwargs)
        self.encoding = encoding

    def __iter__(self):
        return self

    def next(self):
        # read and split the csv row into fields
        row = self.csv_reader.next() 
        # now decode
        return [unicode(cell, self.encoding) for cell in row]

    @property
    def line_num(self):
        return self.csv_reader.line_num


class UnicodeDictReader(csv.DictReader):
    def __init__(self, f, encoding="utf-8", fieldnames=None, **kwds):
        csv.DictReader.__init__(self, f, fieldnames=fieldnames, **kwds)
        self.reader = UnicodeCsvReader(f, encoding=encoding, **kwds)

import os
def getFileName(infile):
    basename = os.path.basename(infile) #get filename with extension seperately
    (fileName, extension) = os.path.splitext(basename)
    return fileName
    

birds_dict = []
with open('birds_dictionary.csv', 'rb') as csvfile:
    reader = UnicodeDictReader(csvfile, delimiter = ';')
    for row in reader:
        birds_dict.append(row)


filelist= glob.glob('L:\\Data\\Barentsportal\\Seabird\\*.shp')
for inshp in filelist:
    for row in birds_dict:
        if getFileName(inshp) in row.values():
            for key,value in row.iteritems():
                if not key == 'Acronym':
                    arcpy.AddField_management(inshp, key, 'TEXT')
                    arcpy.CalculateField_management(inshp, key, "'''" + value.encode('utf8') + "'''", "PYTHON")
                    print key + " field added to " + inshp


for row in birds_dict:
    if 'ALALL' in row.values():
        for key,value in row.iteritems():
            print value.encode('utf8')


reader = UnicodeCsvReader(open('birds_dictionary.csv'), delimiter = ';')


'''
FISH AND MAMMALS IMR
'''

imrNames = {'Harp seal coat shedding' : 'gronlandsel_haarfelling',
'Harp seal birthing areas' : 'gronlandsel_kaste',
'Harp seal distribution' : 'gronlandsel_utbredelse',
'Grey seal high density' : 'havert_hoy_tetthet',
'Grey seal moderate density' : 'havert_moderat_tetthet',
'Grey seal distribution' : 'havert_utbredelse',
'Walrus distribution' : 'Hvalross_45W80E',
'Hooded seal distribution' : 'klappmyss_utbredelse',
'Ringed seal distribution' : 'Ringsel_80W80E',
'Harbour seal high concentration' : 'steinkobbe_hoy_konsentrasjon',
'Harbour seal distribution' : 'steinkobbe_utbredelse',
'Bearded seal distribution' : 'Storkobbe_80W80E',
'Beluga whale distribution' : 'hvithval_utbredelse',
'Bottlenose feeding' : 'nebbhval_naeringsvandring',
'Bottlenose distribution' : 'nebbhval_utbredelse',
'Fin whale distribution' : 'finnhval_utbredelse',
'Harbour porpoise distribution' : 'nise_utbredelse',
'Humpback whale distribution' : 'knolhval_utbredelse',
'Killer whale overwintering' : 'spekkhogger_overvintring',
'Killer whale high concentration' : 'spekkhogger_hoy_kons',
'Killer whale distribution' : 'spekkhogger_utbredelse',
'Long-finned pilot whale distribution' : 'grindhval_utbredelse',
'Narwhal distribution' : 'narhval_utbredelse',
'Minke whale feeding' : 'vaagehval_naeringsvandring',
'Minke whale distribution' : 'vaagehval_utbredelse',
'Sperm whale  feeding' : 'spermhval_naeringsvandring',
'Sperm whale distribution' : 'spermhval_utbredelse'}


for key,value in imrNames.iteritems():
    for layer in layers:
        layer.name = layer.name.replace(value, key)

arcpy.RefreshTOC()
mxd.save()

fish = {
'Anglerfish distribution' : u'breiflabb_utbredelse',
'Blue ling distribution' : u'Blålange utbredelse',
'Blue whiting juvenile' : u'Kolmule ung',
'Blue whiting distribution' : u'Kolmule utbredelse',
'Capelin spawning' : u'Lodde gyteområde',
'Capelin feeding' : u'Lodde næringsområder',
'Capelin winter' : u'Lodde overvintring',
'Coastal cod north of 62dg spawning' : u'Norsk kysttorsk (nord av 62°) gyteområder',
'Coastal cod north of 62dg distribution' : u'Norsk kysttorsk (nord av 62°) utbredelse',
'Cyclopterus lumpus spawning' : u'Rognkjeks Rognkall gyte',
'Cyclopterus lumpus distribution' : u'Rognkjeks Rognkall Utbredelse',
'Deep-sea redfish spawning' : u'Snabeluer gyteområder',
'Deep-sea redfish distribution' : u'Snabeluer utbredelse',
'Galeus melanostomus' : u'Haagjel',
'Golden redfish spawning' : u'Vanlig Uer Gyteområder',
'Golden redfish distribution' : u'Vanlig Uer utbredelse',
'Goldsinny distribution' : u'Bergnebb utbredelse',
'Greater forkbeard distribution' : u'Skjellbrosme utbredelse',
'Greenland halibut juvenile' : u'Blåkveite utbredelse ung',
'Greenland halibut spawning' : u'Blåkveite gyteområder',
'Greenland halibut adult' : u'Blåkveite voksen',
'Greenland shark distribution' : u'Håkjerring utbredelse',
'Haddock spawning' : u'Hyse gyte',
'Haddock distribution' : u'Hyse utbredelse',
'Halibut spawning' : u'Kveite gyteområder',
'Halibut distribution' : u'Kveite utbredelse',
'Herring grows up' : u'NVG Sild oppvekstområder',
'Herring old' : u'NVG Sild voksen overvintring',
'Herring spawning' : u'NVG Sild gyteområder',
'Herring feeding' : u'NVG Sild næringsområder',
'Horse mackerel distribution' : u'Taggmakrell utbredelse',
'Lamna nasus distribution' : u'Håbrann utbredelse',
'Ling distribution' : u'Lange utbredelse',
'Mackerel distribution' : u'Makrell utbredelse',
'Macrourus berglax distribution' : u'Isgalt utbredelse',
'North East Arctic saithe grows up (1-3yrs)' : u'NEA Sei oppvekstområder',
'North East Arctic saithe spawning' : u'NEA Sei gyteområder',
'North East Arctic saithe feeding' : u'NEA Sei næringsområder',
'North East Arctic cod spawning' : u'NEA Torsk gyteområder',
'North East Arctic cod juvenile' : u'NEA Torsk ungfisk',
'North East Arctic cod winter' : u'NEA Torsk overvintring',
'North East Arctic cod feeding' : u'NEA Torsk næringsområder',
'Norway pout distribution' : u'Øyepål utbredelse',
'Polar cod spawning' : u'Polartorsk gyte',
'Polar cod distribution' : u'Polartorsk utbredelse',
'Roundnose grenadier distribution' : u'Skolest utbredelse',
'Spurdog distribution' : u'Pigghå utbredelse',
'Tusk distribution' : u'Brosme utbredelse',
'Velvet belly distribution' : u'Svarthå utbredelse',
}

fishEn = []
for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if sublayer.isGroupLayer:
                fishEn.append(sublayer.name)


dataSource = []
for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if not sublayer.isGroupLayer and sublayer.supports('SERVICEPROPERTIES'):
                servProp = sublayer.serviceProperties
                dataSource.append(servProp.get('Name', 'N/A').replace("fisk:", ""))


fishDict = dict(zip(fishEn, dataSource))

fishDict = {u'Anglerfish distribution': u'breiflabb_utbredelse',
 u'Blue ling distribution': u'blaalange_utbredelse',
 u'Blue whiting distribution': u'kolmule_utbredelse',
 u'Blue whiting juvenile': u'kolmule_ung',
 u'Capelin feeding': u'lodde_naering',
 u'Capelin spawning': u'lodde_gyte',
 u'Capelin winter': u'lodde_overvintring',
 u'Coastal cod north of 62dg distribution': u'kysttorsk_n_62g_utbredelse',
 u'Coastal cod north of 62dg spawning': u'kysttorsk_n_62g_gyte',
 u'Cyclopterus lumpus distribution': u'rognkjeks_rognkall_utbredelse',
 u'Cyclopterus lumpus spawning': u'rognkjeks_rognkall_gyte',
 u'Deep-sea redfish distribution': u'snabeluer_utbredelse',
 u'Deep-sea redfish spawning': u'snabeluer_gyte',
 u'Galeus melanostomus': u'haagjel',
 u'Golden redfish distribution': u'vanliguer_utbredelse',
 u'Golden redfish spawning': u'vanliguer_gyte',
 u'Goldsinny distribution': u'bergnebb_utbredelse',
 u'Greater forkbeard distribution': u'skjellbrosme_utbredelse',
 u'Greenland halibut adult': u'blaakveite_voksen',
 u'Greenland halibut juvenile': u'blaakveite_ung',
 u'Greenland halibut spawning': u'blaakveite_gyte',
 u'Greenland shark distribution': u'haakjerring_utbredelse',
 u'Haddock distribution': u'hyse_utbredelse',
 u'Haddock spawning': u'hyse_gyte',
 u'Halibut distribution': u'kveite_utbredelse',
 u'Halibut spawning': u'kveite_gyte',
 u'Herring feeding': u'nvg_sild_naering',
 u'Herring grows up': u'nvg_sild_oppvekst',
 u'Herring old': u'nvg_sild_voksen_overvintring',
 u'Herring spawning': u'nvg_sild_gyte',
 u'Horse mackerel distribution': u'taggmakrell_utbredelse',
 u'Lamna nasus distribution': u'haabrann_utbredelse',
 u'Ling distribution': u'lange_utbredelse',
 u'Mackerel distribution': u'makrell_utbredelse',
 u'Macrourus berglax distribution': u'isgalt_utbredelse',
 u'North East Arctic cod feeding': u'torsk_nea_naering',
 u'North East Arctic cod juvenile': u'torsk_nea_ung',
 u'North East Arctic cod spawning': u'torsk_nea_gyte',
 u'North East Arctic cod winter': u'torsk_nea_overvintring',
 u'North East Arctic saithe feeding': u'sei_nea_naering',
 u'North East Arctic saithe grows up (1-3yrs)': u'sei_nea_oppvekst',
 u'North East Arctic saithe spawning': u'sei_nea_gyte',
 u'Norway pout distribution': u'oyepaal_utbredelse',
 u'Polar cod distribution': u'polartorsk_utbredelse',
 u'Polar cod spawning': u'polartorsk_gyte',
 u'Roundnose grenadier distribution': u'skolest_utbredelse',
 u'Spurdog distribution': u'pigghaa_utbredelse',
 u'Tusk distribution': u'brosme_utbredelse',
 u'Velvet belly distribution': u'svarthaa_utbredelse'}

mxd = arcpy.mapping.MapDocument("Biodiversity-dev.mxd")
layers = arcpy.mapping.ListLayers(mxd)
arcpy.RefreshTOC()

for key,value in fishDict.iteritems():
    for layer in layers:
        layer.name = layer.name.replace(value, key)

arcpy.RefreshTOC()
mxd.save()

# find and remove layers not in list 
for df in arcpy.mapping.ListDataFrames(mxd):
    for lyr in arcpy.mapping.ListLayers(mxd, "", df):
        if lyr.name == 'Fish':
            for sublyr in lyr:
                if not sublyr.name in fishDict:
                    arcpy.mapping.RemoveLayer(df, sublyr)

mxd.save()
import glob
import os
lyrFiles = glob.glob('C:\\Data\\Barentsportal\\imr\\whales\\*.lyr')

#Define outputfile name
'''
def getFileName(infile):
    basename = os.path.basename(infile) #get filename with extension seperately
    (fileName, extension) = os.path.splitext(basename)
    return fileName
'''    
# change layers symbology of Whales
for df in arcpy.mapping.ListDataFrames(mxd):
    for lyr in arcpy.mapping.ListLayers(mxd, "", df):
        if lyr.name == 'Whales':
            lyrFiles = glob.glob('C:\\Data\\Barentsportal\\imr\\whales\\*.lyr')
            for sublyr in lyr:
                for lyrFile in lyrFiles:
                    if getFileName(lyrFile) == sublyr.name.split()[-1]:
                        sourceLyr = arcpy.mapping.Layer(lyrFile)
                        arcpy.mapping.UpdateLayer(df, sublyr, sourceLyr, True)

# change layers symbology of seals
for df in arcpy.mapping.ListDataFrames(mxd):
    for lyr in arcpy.mapping.ListLayers(mxd, "", df):
        if lyr.name == 'Seals':
            lyrFiles = glob.glob('C:\\Data\\Barentsportal\\imr\\seals\\*.lyr')
            for sublyr in lyr:
                for lyrFile in lyrFiles:
                    if getFileName(lyrFile) == sublyr.name.split()[-1]:
                        sourceLyr = arcpy.mapping.Layer(lyrFile)
                        arcpy.mapping.UpdateLayer(df, sublyr, sourceLyr, True)
                    if getFileName(lyrFile) == sublyr.name.split()[-2]:
                        sourceLyr = arcpy.mapping.Layer(lyrFile)
                        arcpy.mapping.UpdateLayer(df, sublyr, sourceLyr, True)
                        

# change layers symbology of Fish
for df in arcpy.mapping.ListDataFrames(mxd):
    for lyr in arcpy.mapping.ListLayers(mxd, "", df):
        if lyr.name == 'Fish':
            lyrFiles = glob.glob('C:\\Data\\Barentsportal\\imr\\fish\\*.lyr')
            for sublyr in lyr:
                for lyrFile in lyrFiles:
                    if getFileName(lyrFile) == sublyr.name.split()[-1]:
                        sourceLyr = arcpy.mapping.Layer(lyrFile)
                        arcpy.mapping.UpdateLayer(df, sublyr, sourceLyr, True)

# save layers to file
for df in arcpy.mapping.ListDataFrames(mxd):
    for lyr in arcpy.mapping.ListLayers(mxd, "", df):
        if lyr.name == 'Fish':
            for sublyr in lyr:
                out_layer = 'C:\\Data\\Barentsportal\\imr\\sort\\' + sublyr.name + '.lyr'
                arcpy.SaveToLayerFile_management(sublyr, out_layer)

df = arcpy.mapping.ListDataFrames(mxd, "www.barentsportal.com")[0]
targetGroupLayer = arcpy.mapping.ListLayers(mxd, "Fish_sorted", df)[0]
lyrFiles = glob.glob('C:\\Data\\Barentsportal\\imr\\sort\\*.lyr')
lyrFiles.sort()
for lyr in lyrFiles:
    addLayer = arcpy.mapping.Layer(lyr)
    arcpy.mapping.AddLayerToGroup(df, targetGroupLayer, addLayer, "BOTTOM")

mxd.save()



def multipleReplace(text, wordDict):
    """
    take a text and replace words that match the key in a dictionary
    with the associated value, return the changed text
    """
    for key in wordDict:
        text = text.replace(key, wordDict[key])
    return text

wordDict = {" " : "_",
            u"å": "aa",
            u"ø": "o",
            u'æ': 'ae',
            u'(': ''
            }

for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if sublayer.isGroupLayer:
                for subsub in sublayer:
                    names = subsub.name.lower()
                    names = multipleReplace(names, wordDict)
                    print names.encode('latin1')


mxd = arcpy.mapping.MapDocument("\\\willem2\\data\\Barentsportal\\Biodiversity.mxd")
mxd.findAndReplaceWorkspacePaths(r"\\willem\data\Barentsportal",r"\\willem2\data\Barentsportal")


for layer in layers:
    if not layer.isGroupLayer:
        print layer.dataSource.encode('utf8')


mxd = arcpy.mapping.MapDocument(r"E:\NP_Ortofoto_Svalbard_WMTS_25833_B.mxd")
mxd.findAndReplaceWorkspacePaths(r"E:\data", r"\\wilem3\data")
mxd.save()
del mxd


folderPath = r"E:\Data\Basisdata"
for filename in os.listdir(folderPath):
    fullpath = os.path.join(folderPath, filename)
    if os.path.isfile(fullpath):
        basename, extension = os.path.splitext(fullpath)
        if extension.lower() == ".mxd":
            mxd = arcpy.mapping.MapDocument(fullpath)
            mxd.findAndReplaceWorkspacePaths(r"E:\Data", r"\\willem3\Data")
            mxd.save()
del mxd

