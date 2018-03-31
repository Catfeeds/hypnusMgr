package com.catt.hypnus.service.impl.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.common.module.security.repository.dao.RoleDao;
import com.catt.common.module.security.repository.dao.StaffDao;
import com.catt.common.module.security.repository.entity.Role;
import com.catt.common.module.security.repository.entity.Staff;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import com.catt.hypnus.service.staff.StaffBuildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:36
 * @Desc:
 **/
@Service("factoryServiceImpl")
@Transactional
public  class FactoryServiceImpl extends BaseServiceImpl<FactoryInfo,Long> implements FactoryService
{
    @Resource(name = "factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Resource(name = "staffDaoImpl")
    private StaffDao staffDao;

    @Resource(name = "roleDaoImpl")
    private RoleDao roleDao;

    @Autowired
    private StaffBuildService staffBuildService;

    @Resource(name="userInfoDaoImpl")
    private UserInfoDao userInfoDao;

    private static final Long roleId = 669060222664310784L;

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
        FactoryInfo old = factoryInfoDao.findByMobile(info.getPhone());
        UserInfo userInfo = userInfoDao.findByMobile(info.getPhone());
        if(Objects.nonNull(old)||Objects.nonNull(userInfo)){
            throw new RuntimeException("该手机号码已经被使用");
        }
        Role role = roleDao.find(roleId);
        Staff staff = staffBuildService.buildNewStaff(info.getPhone(), info.getPassword(), info.getName(),role);
        staffDao.saveOrUpdate(staff);
        info.relSystemUser(staff.getId());

        factoryInfoDao.saveOrUpdate(info);
    }

    @Override
    public void updateFactoryInfo(FactoryInfo info) {
        factoryInfoDao.saveOrUpdate(info);
        FactoryInfo old = factoryInfoDao.findByMobile(info.getPhone());
        if(Objects.nonNull(old)&&!old.getId().equals(info.getId())){
            throw new RuntimeException("该手机号码的经销商已经存在");
        }
        UserInfo userInfo = userInfoDao.findByMobile(info.getPhone());
        if(Objects.nonNull(userInfo)){
            throw new RuntimeException("该手机号码已经被使用");
        }
        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)) {
            oldStaff = staffBuildService.buildUpdateStaff(oldStaff, info.getPassword(), info.getPhone(),info.getName());
            staffDao.saveOrUpdate(oldStaff);
        }
    }

    @Override
    public void deleteFactory(Long id) {
        FactoryInfo info = factoryInfoDao.find(id);
        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)){
            staffDao.remove(oldStaff);
        }
        factoryInfoDao.remove(info);
    }

    @Override
    public void updatePassword(Long id, String password) {
        FactoryInfo info = factoryInfoDao.find(id);
        info.updatePwd(password);
        factoryInfoDao.saveOrUpdate(info);

        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)){
            oldStaff = staffBuildService.buildUpdateStaff(oldStaff,info.getPassword(),info.getPhone(),info.getName());
            staffDao.saveOrUpdate(oldStaff);
        }
    }
}
