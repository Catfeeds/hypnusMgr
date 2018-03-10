package com.catt.hypnus.service.impl.base.customerMgr;


import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusAccountDetailDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAccountDetail;
import com.catt.hypnus.service.base.customerMgr.CusAccountDetailBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cusAccountDetailBaseServiceImpl")
public class CusAccountDetailBaseServiceImpl extends
        BaseServiceImpl<CusAccountDetail, Long> implements CusAccountDetailBaseService {

    @Resource(name = "cusAccountDetailDaoImpl")
    private CusAccountDetailDao cusAccountDetailDao;

    @Resource
    public void setBaseDao(CusAccountDetailDao cusAccountDetailDao) {
        super.setBaseDao(cusAccountDetailDao);
    }

}
