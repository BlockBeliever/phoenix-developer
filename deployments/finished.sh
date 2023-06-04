#!/bin/bash

docker login  -u flct -p flctEHAcRqW12 https://docker.flct.io/

if [ "${EVN}" = "pre" ];then
    docker tag pre-phoenix-developer:${VERSION}-${BUILD_ID} docker.flct.io/flct/pre-phoenix-developer:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/pre-phoenix-developer:${VERSION}-${BUILD_ID}
else
    docker tag phoenix-developer:${VERSION}-${BUILD_ID} docker.flct.io/flct/phoenix-developer:${VERSION}-${BUILD_ID}
    docker push docker.flct.io/flct/phoenix-developer:${VERSION}-${BUILD_ID}
fi