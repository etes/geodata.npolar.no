# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# exportWFS.py
# Created on: 2013-09-03 10:33:09.00000
# author: ermias
# Description: fetches map data from IMR WFS 
# ---------------------------------------------------------------------------

# Import arcpy module
import arcpy
from arcpy import env

# Check out the Data Interoperability Extension
arcpy.CheckOutExtension("DataInteroperability")


# Local variables:
finnhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\finnhval_utbredelse"
grindhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\grindhval_utbredelse"
gronlandsel_haarfelling = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_haarfelling"
gronlandsel_kaste = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_kaste"
gronlandsel_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_utbredelse"
havert_hoy_tetthet = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_hoy_tetthet"
havert_moderat_tetthet = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_moderat_tetthet"
havert_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_utbredelse"
Hvalross_45W80E = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Hvalross_45W80E"
hvithval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\hvithval_utbredelse"
klappmyss_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\klappmyss_utbredelse"
Knolhval_bw = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Knolhval_bw"
knolhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\knolhval_utbredelse"
narhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\narhval_utbredelse"
nebbhval_naeringsvandring = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nebbhval_naeringsvandring"
nebbhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nebbhval_utbredelse"
nise_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nise_utbredelse"
Ringsel_80W80E = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Ringsel_80W80E"
spekkhogger_hoy_kons = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_hoy_kons"
spekkhogger_overvintring = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_overvintring"
spekkhogger_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_utbredelse"
spermhval_naeringsvandring = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spermhval_naeringsvandring"
spermhval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spermhval_utbredelse"
steinkobbe_hoy_konsentrasjon = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\steinkobbe_hoy_konsentrasjon"
steinkobbe_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\steinkobbe_utbredelse"
Storkobbe_80W80E = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Storkobbe_80W80E"
vaagehval_naeringsvandring = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\vaagehval_naeringsvandring"
vaagehval_utbredelse = "Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\vaagehval_utbredelse"
Output_Dataset = "GEODATABASE_FILE,E:\\Data\\Barentsportal\\imr\\imr.gdb,\"RUNTIME_MACROS,\"\"OVERWRITE_GEODB,No,TRANSACTION_TYPE,TRANSACTIONS,TEMPLATEFILE,,SIMPLIFY_GEOM,No,X_ORIGIN,0,Y_ORIGIN,0,XY_SCALE,0,HAS_Z_VALUES,auto_detect,Z_ORIGIN,0,Z_SCALE,0,GRID_1,0\"\",META_MACROS,\"\"DestOVERWRITE_GEODB,No,DestTRANSACTION_TYPE,TRANSACTIONS,DestTEMPLATEFILE,,DestSIMPLIFY_GEOM,No,DestX_ORIGIN,0,DestY_ORIGIN,0,DestXY_SCALE,0,DestHAS_Z_VALUES,auto_detect,DestZ_ORIGIN,0,DestZ_SCALE,0,DestGRID_1,0\"\",METAFILE,GEODATABASE_FILE,COORDSYS,,__FME_DATASET_IS_SOURCE__,false\""

# Process: Quick Export
arcpy.QuickExport_interop("'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\finnhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\grindhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_haarfelling';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_kaste';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\gronlandsel_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_hoy_tetthet';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_moderat_tetthet';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\havert_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Hvalross_45W80E';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\hvithval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\klappmyss_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Knolhval_bw';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\knolhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\narhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nebbhval_naeringsvandring';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nebbhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\nise_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Ringsel_80W80E';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_hoy_kons';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_overvintring';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spekkhogger_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spermhval_naeringsvandring';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\spermhval_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\steinkobbe_hoy_konsentrasjon';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\steinkobbe_utbredelse';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\Storkobbe_80W80E';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\vaagehval_naeringsvandring';'Interoperability Connections\\Connection (2) - Institute of Marine Research - WFS server WFS.fdl\\vaagehval_utbredelse'", Output_Dataset)



# Local variables:
Input_Layer = "'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\sei_nea_gyte';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\sei_nea_naering';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\sei_nea_oppvekst';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\skjellbrosme_utbredelse';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\skolest_utbredelse';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\snabeluer_gyte';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\snabeluer_utbredelse';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\svarthaa_utbredelse';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\taggmakrell_gyte';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\taggmakrell_utbredelse';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\torsk_nea_gyte';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\torsk_nea_naering';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\torsk_nea_overvintring';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\torsk_nea_ung';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\vanliguer_gyte';'Interoperability Connections\\IMR - Fisk - WFS (1).fdl\\vanliguer_utbredelse'"
Output_Dataset = "GEODATABASE_FILE,E:\\Data\\Barentsportal\\imr\\fish.gdb,\"RUNTIME_MACROS,\"\"OVERWRITE_GEODB,Yes,TRANSACTION_TYPE,TRANSACTIONS,TEMPLATEFILE,,SIMPLIFY_GEOM,No,X_ORIGIN,0,Y_ORIGIN,0,XY_SCALE,0,HAS_Z_VALUES,auto_detect,Z_ORIGIN,0,Z_SCALE,0,GRID_1,0\"\",META_MACROS,\"\"DestOVERWRITE_GEODB,Yes,DestTRANSACTION_TYPE,TRANSACTIONS,DestTEMPLATEFILE,,DestSIMPLIFY_GEOM,No,DestX_ORIGIN,0,DestY_ORIGIN,0,DestXY_SCALE,0,DestHAS_Z_VALUES,auto_detect,DestZ_ORIGIN,0,DestZ_SCALE,0,DestGRID_1,0\"\",METAFILE,GEODATABASE_FILE,COORDSYS,,__FME_DATASET_IS_SOURCE__,false\""

# Process: Quick Export
arcpy.QuickExport_interop(Input_Layer, Output_Dataset)
