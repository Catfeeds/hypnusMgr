package com.catt.hypnus.repository.dao.factoryMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import org.springframework.stereotype.Repository;


@Repository("factoryInfoDaoImpl")
public class FactoryInfoDaoImpl extends BaseDaoImpl<FactoryInfo, Long>
        implements FactoryInfoDao {

}
