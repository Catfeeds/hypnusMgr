#!/bin/bash

#进入脚本所在目录
BASEDIR=$(dirname $0)
cd $BASEDIR

echo "启动admin主后台开始"
sh project-hypnus-service-impl/startup.sh
echo "启动admin主后台结束"


