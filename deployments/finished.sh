#!/bin/bash

docker login  -u developer -p Fh7FSgEQ6hMn8MB7Q4URnh76eEDdIXAg https://docker.biyong001.com/

if [ "${EVN}" = "pre" ];then
    docker tag pre-phoenix-developer:${VERSION}-${BUILD_ID} docker.biyong001.com/pre/phoenix-developer:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/pre/phoenix-developer:${VERSION}-${BUILD_ID}
else
    docker tag phoenix-developer:${VERSION}-${BUILD_ID} docker.biyong001.com/phoenix/phoenix-developer:${VERSION}-${BUILD_ID}
    docker push docker.biyong001.com/phoenix/phoenix-developer:${VERSION}-${BUILD_ID}
fi