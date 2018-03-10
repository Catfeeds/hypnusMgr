package com.catt.hypnus.service.impl.base.customerMgr;


import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusAccountConsumeDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAccountConsume;
import com.catt.hypnus.service.base.customerMgr.CusAccountConsumeBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cusAccountConsumeBaseServiceImpl")
public class CusAccountConsumeBaseServiceImpl extends
        BaseServiceImpl<CusAccountConsume, Long> implements CusAccountConsumeBaseService {

    @Resource(name = "cusAccountConsumeDaoImpl")
    private CusAccountConsumeDao cusAccountConsumeDao;

    @Resource
    public void setBaseDao(CusAccountConsumeDao cusAccountConsumeDao) {
        super.setBaseDao(cusAccountConsumeDao);
    }

}
