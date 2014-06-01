#!/bin/sh

set -o nounset
set -o errexit

DIR=~/backup/psql
[ ! $DIR ] && mkdir -p $DIR || :
LIST=$(psql -l | awk '{ print $1}' | grep -vE '^-|^List|^Name|template[0|1]')
for d in $LIST
do
  pg_dump $d | gzip -c >  $DIR/$d.out.gz
done

pg_dump -C -h test_database -U username -t table dbname | psql -h prod_database -U username dbname
