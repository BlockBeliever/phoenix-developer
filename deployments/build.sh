#!/bin/bash

ls
pwd
npm install

if [ "${EVN}" = "pre" ];then
    echo "pre"
    cp -f ./.env.pre ./.env.production
    npm run build:prod
else
    echo "pro"
    npm run build:prod
fi