package com.catt.hypnus.service.impl.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:36
 * @Desc:
 **/
@Service("factoryServiceImpl")
@Transactional
public class FactoryServiceImpl implements FactoryService
{
    @Resource(name = "factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        return factoryInfoDao.queryList(phone,pageable);
    }

    @Override
    public void addFactoryInfo(FactoryInfo info) {
        info.init();
        factoryInfoDao.saveOrUpdate(info);
    }

    @Override
    public void updateFactoryInfo(FactoryInfo info) {
        factoryInfoDao.saveOrUpdate(info);
    }

    @Override
    public void deleteFactory(Long id) {
        FactoryInfo info = factoryInfoDao.find(id);
        factoryInfoDao.remove(info);
    }

    @Override
    public void updatePassword(Long id, String password) {
        FactoryInfo info = factoryInfoDao.find(id);
        info.updatePwd(password);
        factoryInfoDao.saveOrUpdate(info);
    }
}
