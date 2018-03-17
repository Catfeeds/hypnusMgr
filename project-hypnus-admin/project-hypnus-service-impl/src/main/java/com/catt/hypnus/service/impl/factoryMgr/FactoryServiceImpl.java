package com.catt.hypnus.service.impl.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:36
 * @Desc:
 **/
@Service("factoryServiceImpl")
public class FactoryServiceImpl implements FactoryService
{
    @Resource(name = "factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        return factoryInfoDao.queryList(phone,pageable);
    }
}
