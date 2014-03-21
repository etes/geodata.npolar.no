#!/bin/sh
pg_dump -C -h test_database -U username -t table dbname | psql -h prod_database -U username dbname
