#!/bin/bash

MONGO_SERVICE="0.0.0.0:$DB_PORT"
echo "Wait for POSTGRES=${MONGO_SERVICE}"

wait4ports -q -s 5 -t 20 tcp://${MONGO_SERVICE}

yarn run build 

if [ $STAGE == "int-test" ]
    then
        yarn run test:int
else
    then 
        yarn run prod