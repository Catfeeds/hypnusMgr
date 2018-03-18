#!/bin/bash

BASEDIR=$(dirname $0)
cd $BASEDIR

#将错误输出到log文件中
nohup java -Dproject-hypnus-service-impl -jar project-hypnus-service-impl.jar >/dev/null 2>out.log &

