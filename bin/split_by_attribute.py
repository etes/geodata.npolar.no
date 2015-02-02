import arcpy, re

arcpy.env.overwriteOutput = True

Input = arcpy.GetParameterAsText(0)
Flds = "%s" % (arcpy.GetParameterAsText(1))
OutWorkspace = arcpy.GetParameterAsText(2)


myre = re.compile(";")
FldsSplit = myre.split(Flds)

sort = "%s A" % (FldsSplit[0])
rows = arcpy.SearchCursor(Input, "", "", Flds, sort)

for row in rows:
    var = []
    for r in range(len(FldsSplit)):
        var.append(row.getValue(FldsSplit[r]))
    Query = ''
    Name = ''
    for x in range(len(var)):
        if x == 0:
            fildz = FldsSplit[x]
            Name = var[x] + "_"
            Query += (""" "%s" = '%s'""" % (fildz, var[x]))
        if x > 0:
            fildz = FldsSplit[x]
            Name += var[x] + "_"
            Query += (""" AND "%s" = '%s' """ % (fildz, var[x]))
    OutputShp = OutWorkspace + r"\%s.shp" % (Name)
    arcpy.Select_analysis(Input, OutputShp, Query)


fc = "E:/Data/NP/SvalbardTema/etrs89/miljo/sjopattedyrobservasjoner/sjopattedyrObservasjoner.shp"

# Create a list of string fields
# field_names = [f.name for f in arcpy.ListFields(fc)]
field = arcpy.ListFields(fc, 'Art')[0]
fieldvalues = []
rows = arcpy.SearchCursor(fc)
for row in rows:
    if not row.getValue(field.name) in fieldvalues:
        fieldvalues.append(row.getValue(field.name))
