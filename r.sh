#!/bin/bash
case $1 in
d)
    npm run dev
    ;;
b)
    npm run build:prod
    ;;
*)  echo '请输入参数 d（开发者） 活着 b（编译线上）'
    ;;
esac

# migrate -verbose -source file://mysql -path /Users/villian/app/wallet/server/tools/migrations/ -database mysql://root:123456@tcp(127.0.0.1:3306)/wallet?multiStatements=true up                 
