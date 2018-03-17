package com.catt.hypnus.repository.dao.deviceMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.deviceMgr.BindLogInfoDao;
import com.catt.hypnus.repository.entity.deviceMgr.BindLogInfo;
import org.springframework.stereotype.Repository;


@Repository("bindLogInfoDaoImpl")
public class BindLogInfoDaoImpl extends BaseDaoImpl<BindLogInfo, Long>
        implements BindLogInfoDao {

}
