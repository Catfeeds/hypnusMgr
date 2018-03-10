#!/bin/sh

#指定jdk版本
#export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents/Home

if [ $# -lt 1 ];then
	echo "请指定打包的目标环境【dev、demo、prod】"
	exit 2
fi

environment=$1
echo "打包环境【${environment}】"

cd $(dirname $0)
rootDir=$(pwd)
echo "打包根目录【${rootDir}】"
cd ${rootDir}

#安装依赖
mvn clean install -P${environment} || exit

mkdir target
cd target

pkgDirName=pkg$(date +%Y%m%d%H%M%S)
pkgDirPath=${rootDir}/target/${pkgDirName}
pkgWebDirPath=${pkgDirPath}/web
pkgBackDirPath=${pkgDirPath}/background
mkdir ${pkgDirName}

cd ${pkgDirName}
mkdir web
mkdir background

cd ${rootDir}

#打包admin
cd project-hypnus-admin/project-hypnus-web-admin
mvn clean package -P${environment} || exit
cp target/*.war ${pkgWebDirPath}
echo "打包admin结束"
cd ${rootDir}

#打包wechat
cd project-hypnus-mobile/project-hypnus-web-wechatShop
mvn clean package -P${environment} || exit
cp target/*.war ${pkgWebDirPath}
echo "打包wechat结束"
cd ${rootDir}

#打包mobile
cd project-hypnus-mobile/project-hypnus-web-mobile
mvn clean package -P${environment} || exit
cp target/*.war ${pkgWebDirPath}
echo "打包mobile结束"
cd ${rootDir}

#打包admin主后台
cd project-hypnus-admin/project-hypnus-service-impl
mvn clean package -P${environment},releasePackage || exit
cp -R target/project-hypnus-service-impl ${pkgBackDirPath}
echo "打包admin主后台结束"
cd ${rootDir}

#打包mobile主后台
cd project-hypnus-mobile/project-hypnus-service-impl-mobile
mvn clean package -P${environment},releasePackage || exit
cp -R target/project-hypnus-service-impl-mobile ${pkgBackDirPath}
echo "打包mobile主后台结束"
cd ${rootDir}

#打包退款查询后台
cd project-hypnus-background/project-hypnus-returnQuery/project-hypnus-returnQuery-service-impl
mvn clean package -P${environment},releasePackage || exit
cp -R target/project-hypnus-returnQuery-service-impl ${pkgBackDirPath}
echo "打包退款查询后台结束"
cd ${rootDir}

#打包结算后台
cd project-hypnus-background/project-hypnus-settlement/project-hypnus-settlement-service-impl
mvn clean package -P${environment},releasePackage || exit
cp -R target/project-hypnus-settlement-service-impl ${pkgBackDirPath}
echo "打包结算后台结束"
cd ${rootDir}

#打包支付查询后台
cd project-hypnus-background/project-hypnus-payQuery/project-hypnus-payQuery-service-impl
mvn clean package -P${environment},releasePackage || exit
cp -R target/project-hypnus-payQuery-service-impl ${pkgBackDirPath}
echo "打包支付查询后台结束"
cd ${rootDir}

echo "打包【${environment}】任务完成"
