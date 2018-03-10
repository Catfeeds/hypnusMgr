#!/bin/bash

#进入脚本所在目录
BASEDIR=$(dirname $0)
cd $BASEDIR

unzip hypnusMgr.war -d hypnusMgr
unzip hypnusMobile.war -d hypnusMobile
unzip hypnusWechatShop.war -d hypnusWechatShop

