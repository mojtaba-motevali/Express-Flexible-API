#!/bin/bash

if [ $STAGE == "test"]
then
    yarn run test:int 
fi

MONGO_SERVICE="$DB_HOST:$DB_PORT"
echo "Wait for MONGODB=${MONGO_SERVICE}"

WAIT4PORTS_TIMEOUT=20 wait4ports -q  tcp://$MONGO_SERVICE

if [ $STAGE == "test" ]
then
    yarn run test:int
else
    yarn run prod
fi