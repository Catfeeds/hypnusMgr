package com.catt.hypnus.service.impl.factoryMgr;

import com.catt.common.base.pojo.search.Filter;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.common.module.security.repository.dao.StaffDao;
import com.catt.common.module.security.repository.entity.Staff;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:36
 * @Desc:
 **/
@Service("factoryServiceImpl")
@Transactional
public class FactoryServiceImpl extends BaseServiceImpl<FactoryInfo,Long> implements FactoryService
{
    @Resource(name = "factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Resource(name="staffDaoImpl")
    private StaffDao staffDao;

    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        return factoryInfoDao.queryList(phone,pageable);
    }

    @Override
    public Page<Map> queryListNonBind(String phone, Pageable pageable) {
        return factoryInfoDao.queryListNonBind(phone,pageable);
    }

    @Override
    public void addFactoryInfo(FactoryInfo info) {
        info.init();
        FactoryInfo oldInfo = this.findOne(Arrays.asList(Filter.eq("phone",info.getPhone())));
        if(Objects.nonNull(oldInfo)){
            throw new RuntimeException("该手机号码的经销商已经存在");
        }
        factoryInfoDao.saveOrUpdate(info);
    }

    @Override
    public void updateFactoryInfo(FactoryInfo info) {
        FactoryInfo oldInfo = this.findOne(Arrays.asList(Filter.eq("phone",info.getPhone())));
        if(Objects.nonNull(oldInfo)&&!oldInfo.getId().equals(info.getId())){
            throw new RuntimeException("该手机号码的经销商已经存在");
        }
        factoryInfoDao.saveOrUpdate(info);
        Staff staff = staffDao.find(info.getRelUserId());
        if(!staff.getAccount().equals(info.getPhone())){
            staff.setAccount(info.getPhone());
            staff.setPhone(info.getPhone());
            staffDao.saveOrUpdate(staff);
        }
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
