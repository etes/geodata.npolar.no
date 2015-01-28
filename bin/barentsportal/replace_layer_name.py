# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# exportWFS.py
# Created on: 2013-09-03 10:33:09.00000
# author: Norwegian Polar Institute
# Description: fetches map data from IMR WFS 
# ---------------------------------------------------------------------------
import arcpy

mxd = arcpy.mapping.MapDocument("E:/Data/Barentsportal/Polarbear/Biodiversity.mxd")
layers = arcpy.mapping.ListLayers(mxd)[0]
arcpy.RefreshTOC()

lyrdict = {'punkter_month__01' : 'January',
'punkter_month__02' : 'February',
'punkter_month__03' : 'March',
'punkter_month__04' : 'April',
'punkter_month__05' : 'May',
'punkter_month__06' : 'June',
'punkter_month__07' : 'July',
'punkter_month__08' : 'August',
'punkter_month__09' : 'September',
'punkter_month__10' : 'October',
'punkter_month__11' : 'November',
'punkter_month__12' : 'December'}

for key,value in lyrdict.iteritems():
    for layer in layers:
        layers.name = layers.name.replace(key,value)

arcpy.RefreshTOC()
mxd.save()

toNorsk = {
'12 August 1553' : '12 August 1553',
'15 July 1556' : '15 juli 1556',
'17 June 1580' : '17 juni 1580',
'15 July 1580' : '15 juli 1580',
'17 June 1584' : '17 juni 1584',
'15 July 1584' : '15 juli 1584',
'15 July 1594' : '15 juli 1594',
'29 July 1594' : '29 juli 1594',
'20 May 1596' : '20 mai 1596',
'3 June 1596' : '3 juni 1596',
'29 July 1596' : '29 juli 1596',
'17 June 1596' : '17 juni 1596',
'15 July 1596' : '15 juli 1596',
'17 June 1597' : '17 juni 1597',
'25 March 1801' : '25 mars 1801',
'22 April 1801' : '22 April 1801',
'20 May 1801' : '20 mai 1801',
'17 June 1801' : '17 juni 1801',
'15 July 1801' : '15 juli 1801',
'12 August 1801' : '12 August 1801',
'25 March 1866' : '25 mars 1866',
'22 April 1866' : '22 April 1866',
'20 May 1866' : '20 mai 1866',
'17 June 1866' : '17 juni 1866',
'15 July 1866' : '15 juli 1866',
'12 August 1866' : '12 August 1866',
'9 September 1866' : '9 September 1866',
'14 January 1900' : '14 januar 1900',
'28 January 1900' : '28 januar 1900',
'11 February 1900' : '11 februar 1900',
'25 February 1900' : '25 februar 1900',
'11 March 1900' : '11 mars 1900',
'25 March 1900' : '25 mars 1900',
'8 April 1900' : '8 April 1900',
'22 April 1900' : '22 April 1900',
'6 May 1900' : '6 mai 1900',
'20 May 1900' : '20 mai 1900',
'3 June 1900' : '3 juni 1900',
'17 June 1900' : '17 juni 1900',
'1 July 1900' : '1 juli 1900',
'15 July 1900' : '15 juli 1900',
'29 July 1900' : '29 juli 1900',
'12 August 1900' : '12 August 1900',
'26 August 1900' : '26 August 1900',
'9 September 1900' : '9 September 1900',
'23 September 1900' : '23 September 1900',
'7 October 1900' : '7 oktober 1900',
'21 October 1900' : '21 oktober 1900',
'11 November 1900' : '11 November 1900',
'18 November 1900' : '18 November 1900',
'2 December 1900' : '2 desember 1900',
'14 January 1917' : '14 januar 1917',
'28 January 1917' : '28 januar 1917',
'11 February 1917' : '11 februar 1917',
'25 February 1917' : '25 februar 1917',
'11 March 1917' : '11 mars 1917',
'25 March 1917' : '25 mars 1917',
'8 April 1917' : '8 April 1917',
'22 April 1917' : '22 April 1917',
'6 May 1917' : '6 mai 1917',
'20 May 1917' : '20 mai 1917',
'3 June 1917' : '3 juni 1917',
'17 June 1917' : '17 juni 1917',
'1 July 1917' : '1 juli 1917',
'15 July 1917' : '15 juli 1917',
'29 July 1917' : '29 juli 1917',
'12 August 1917' : '12 August 1917',
'26 August 1917' : '26 August 1917',
'9 September 1917' : '9 September 1917',
'23 September 1917' : '23 September 1917',
'7 October 1917' : '7 oktober 1917',
'21 October 1917' : '21 oktober 1917',
'4 November 1917' : '4 November 1917',
'18 November 1917' : '18 November 1917',
'2 December 1917' : '2 desember 1917',
'16 December 1917' : '16 desember 1917',
'30 December 1917' : '30 desember 1917',
}

mxd = arcpy.mapping.MapDocument("E:/Data/NP/SvalbardTema/Havis.mxd")
layers = arcpy.mapping.ListLayers(mxd)[0]
arcpy.RefreshTOC()
for key,value in dict.iteritems():
    for layer in layers:
        layers.name = layers.name.replace(key,value)

arcpy.RefreshTOC()
mxd.save()


## looking inside grouplayers
import arcpy
mxdPath = r"E:\Data\Barentsportal\Biodiversity-dev.mxd"
mxd = arcpy.mapping.MapDocument(mxdPath)
layers = arcpy.mapping.ListLayers(mxd)

whales = {'Beluga whale distribution' : u'Hvithval utbredelse',
'Bottlenose feeding' : u'Nebbhvafol N�ringsvandring',
'Bottlenose distribution' : u'Nebbhval utbredelse',
'Fin whale distribution' : u'Finnhval utbredelse',
'Harbour porpoise distribution' : u'Nise utbredelse',
'Humpback whale distribution' : u'Kn�lhval utbredelsesomr�der',
'Killer whale overwintering' : u'Spekkhogger overvintring',
'Killer whale high concentration' : u'Spekkhogger h�y konsentrasjon',
'Killer whale distribution' : u'Spekkhogger utbredelse',
'Long-finned pilot whale distribution' : u'Grindhval utbredelse',
'Narwhal distribution' : u'Narhval utbredelse',
'Minke whale feeding' : u'V�gehval n�ringsvandring',
'Minke whale distribution' : u'V�gehval utbredelse',
'Sperm whale  feeding' : u'Spermhval n�ringsvandring',
'Sperm whale distribution' : u'Spermhval utbredelse',
}
for layer in layers:
    for key,value in whales.iteritems():
        if layer.isGroupLayer:
            for subLayer in layer:
                if subLayer.name == value:
                    layer.name = layer.name.replace('Institute of Marine Research - WMS server', key)


for layer in layers:
    if layer.isGroupLayer:
        for subLayer in layer:
            print "This layer is in a group layer: " + str(subLayer.name)
            
            
for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if sublayer.isGroupLayer:
                print sublayer.name

fish = {
'Anglerfish distribution' : u'Breiflabb utbredelse',
'Blue ling distribution' : u'Bl�lange utbredelse',
'Blue whiting juvenile' : u'Kolmule ung',
'Blue whiting distribution' : u'Kolmule utbredelse',
'Capelin spawning' : u'Lodde gyteomr�de',
'Capelin feeding' : u'Lodde n�ringsomr�der',
'Capelin winter' : u'Lodde overvintring',
'Coastal cod north of 62dg spawning' : u'Norsk kysttorsk (nord av 62�) gyteomr�der',
'Coastal cod north of 62dg distribution' : u'Norsk kysttorsk (nord av 62�) utbredelse',
'Cyclopterus lumpus spawning' : u'Rognkjeks Rognkall gyte',
'Cyclopterus lumpus distribution' : u'Rognkjeks Rognkall Utbredelse',
'Deep-sea redfish spawning' : u'Snabeluer gyteomr�der',
'Deep-sea redfish distribution' : u'Snabeluer utbredelse',
'Galeus melanostomus' : u'Haagjel',
'Golden redfish spawning' : u'Vanlig Uer Gyteomr�der',
'Golden redfish distribution' : u'Vanlig Uer utbredelse',
'Goldsinny distribution' : u'Bergnebb utbredelse',
'Greater forkbeard distribution' : u'Skjellbrosme utbredelse',
'Greenland halibut juvenile' : u'Bl�kveite utbredelse ung',
'Greenland halibut spawning' : u'Bl�kveite gyteomr�der',
'Greenland halibut adult' : u'Bl�kveite voksen',
'Greenland shark distribution' : u'H�kjerring utbredelse',
'Haddock spawning' : u'Hyse gyte',
'Haddock distribution' : u'Hyse utbredelse',
'Halibut spawning' : u'Kveite gyteomr�der',
'Halibut distribution' : u'Kveite utbredelse',
'Herring grows up' : u'NVG Sild oppvekstomr�der',
'Herring old' : u'NVG Sild voksen overvintring',
'Herring spawning' : u'NVG Sild gyteomr�der',
'Herring feeding' : u'NVG Sild n�ringsomr�der',
'Horse mackerel distribution' : u'Taggmakrell utbredelse',
'Lamna nasus distribution' : u'H�brann utbredelse',
'Ling distribution' : u'Lange utbredelse',
'Mackerel distribution' : u'Makrell utbredelse',
'Macrourus berglax distribution' : u'Isgalt utbredelse',
'North East Arctic saithe grows up (1-3yrs)' : u'NEA Sei oppvekstomr�der',
'North East Arctic saithe spawning' : u'NEA Sei gyteomr�der',
'North East Arctic saithe feeding' : u'NEA Sei n�ringsomr�der',
'North East Arctic cod spawning' : u'NEA Torsk gyteomr�der',
'North East Arctic cod juvenile' : u'NEA Torsk ungfisk',
'North East Arctic cod winter' : u'NEA Torsk overvintring',
'North East Arctic cod feeding' : u'NEA Torsk n�ringsomr�der',
'Norway pout distribution' : u'�yep�l utbredelse',
'Polar cod spawning' : u'Polartorsk gyte',
'Polar cod distribution' : u'Polartorsk utbredelse',
'Roundnose grenadier distribution' : u'Skolest utbredelse',
'Spurdog distribution' : u'Piggh� utbredelse',
'Tusk distribution' : u'Brosme utbredelse',
'Velvet belly distribution' : u'Svarth� utbredelse',
}

for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if sublayer.isGroupLayer:
                print sublayer.name
                
for layer in layers:
    if layer.isGroupLayer and str(layer.name) == 'Fish':
        for sublayer in layer:
            if sublayer.isGroupLayer:
                for subsub in sublayer:
                    print subsub.name.encode('latin-1')
                    
for layer in layers:
    for key,value in fish.iteritems():
        if layer.isGroupLayer:
            for subLayer in layer:
                if subLayer.name == value:
                    layer.name = layer.name.replace('Institute of Marine Research - WMS server', key)
