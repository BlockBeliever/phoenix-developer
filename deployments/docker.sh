#!/bin/bash

echo "It is a test"
echo ${BUILD_ID}
echo ${WORKSPACE}
ls -al
ls ./dist 
docker build -f ./deployments/Dockerfile -t coin-develop:1.0.0-${BUILD_ID} .