#!/bin/bash

docker login  -u admin -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/
docker tag coin-develop:1.0.0-${BUILD_ID} docker.biyong001.com/coin/coin-develop:1.0.0-${BUILD_ID}
docker push docker.biyong001.com/coin/coin-develop:1.0.0-${BUILD_ID}