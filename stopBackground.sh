#!/bin/bash

#进入脚本所在目录
BASEDIR=$(dirname $0)
cd $BASEDIR

echo "停止admin主后台开始"
sh project-hypnus-service-impl/shutdown.sh
echo "停止admin主后台结束"

