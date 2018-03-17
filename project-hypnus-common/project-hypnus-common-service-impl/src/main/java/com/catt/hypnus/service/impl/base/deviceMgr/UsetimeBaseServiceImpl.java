package com.catt.hypnus.service.impl.base.deviceMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.service.base.deviceMgr.UsetimeBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("usetimeBaseServiceImpl")
public class UsetimeBaseServiceImpl extends
        BaseServiceImpl<Usetime, Long> implements UsetimeBaseService {

    @Resource(name = "usetimeDaoImpl")
    private UsetimeDao usetimeDao;

    @Resource
    public void setBaseDao(UsetimeDao usetimeDao) {
        super.setBaseDao(usetimeDao);
    }

}
