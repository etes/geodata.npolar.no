#!/usr/bin/env python
import os, fnmatch
def find_replace(directory, find, replace, filePattern):
    for path, dirs, files in os.walk(os.path.abspath(directory)):
        for filename in fnmatch.filter(files, filePattern):
            filepath = os.path.join(path, filename)
            print(filepath)
            with open(filepath) as f:
                s = f.read()
            s = s.replace(find, replace)
            with open(filepath, "w") as f:
                f.write(s)

#find_replace(r"viewer", "*.*", 'iquert', "identifier")
find_replace("viewer", "\'http://geodata.npolar.no", "\'//geodata.npolar.no", "*.*")
