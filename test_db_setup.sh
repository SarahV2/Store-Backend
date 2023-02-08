#!/bin/sh

DB_NAME=$(grep POSTGRES_TEST_DB .env | cut -d "=" -f2)
echo ${DB_NAME}
db-migrate db:create $DB_NAME
db-migrate --env test up 