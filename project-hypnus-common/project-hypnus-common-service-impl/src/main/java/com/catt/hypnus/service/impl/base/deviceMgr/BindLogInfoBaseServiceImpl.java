package com.catt.hypnus.service.impl.base.deviceMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.deviceMgr.BindLogInfoDao;
import com.catt.hypnus.repository.entity.deviceMgr.BindLogInfo;
import com.catt.hypnus.service.base.deviceMgr.BindLogInfoBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("bindLogInfoBaseServiceImpl")
public class BindLogInfoBaseServiceImpl extends
        BaseServiceImpl<BindLogInfo, Long> implements BindLogInfoBaseService {

    @Resource(name = "bindLogInfoDaoImpl")
    private BindLogInfoDao bindLogInfoDao;

    @Resource
    public void setBaseDao(BindLogInfoDao bindLogInfoDao) {
        super.setBaseDao(bindLogInfoDao);
    }

}
