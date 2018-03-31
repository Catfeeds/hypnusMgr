package com.catt.hypnus.service.impl.userMgr;

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
import com.catt.hypnus.service.staff.StaffBuildService;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Objects;

/**
 * @author lyz
 * @date 2018/3/19 21:02
 * @desc
 **/
@Service(value="userServiceImpl")
@Transactional
public class UserServiceImpl extends BaseServiceImpl<UserInfo,Long> implements UserService
{
    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        return userInfoDao.queryList(phone,pageable);
    }

    @Override
    public Page<Map> queryListNonBind(String phone, Pageable pageable) {
        return userInfoDao.queryListByNonBind(phone,pageable);
    }

    @Override
    public void addUserInfo(UserInfo info) {
        info.init();

        Role role = roleDao.find(roleId);
        Staff staff = staffBuildService.buildNewStaff(info.getPhone(),info.getPassword(),info.getPhone(),role);
        staffDao.saveOrUpdate(staff);

        info.relSystemUser(staff.getId());
        userInfoDao.saveOrUpdate(info);
    }

    @Override
    public void updateUserInfo(UserInfo info) {
        userInfoDao.saveOrUpdate(info);

        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)) {
            oldStaff = staffBuildService.buildUpdateStaff(oldStaff, info.getPassword(), info.getPhone(),info.getPhone());
            staffDao.saveOrUpdate(oldStaff);
        }
    }

    @Override
    public void deleteUser(Long id) {
        UserInfo info = userInfoDao.find(id);

        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)){
            staffDao.remove(oldStaff);
        }
        userInfoDao.remove(info);
    }

    @Override
    public void updatePassword(Long id, String password) {
        UserInfo info = userInfoDao.find(id);
        info.updatePwd(password);
        userInfoDao.saveOrUpdate(info);

        Staff oldStaff = staffDao.find(info.getRelUserId());
        if(Objects.nonNull(oldStaff)) {
            oldStaff = staffBuildService.buildUpdateStaff(oldStaff, info.getPassword(), info.getPhone(),info.getPhone());
            staffDao.saveOrUpdate(oldStaff);
        }

    }

    @Override
    public UserInfo findByMobile(String phone) {
        return userInfoDao.findByMobile(phone);
    }

    @Override
    public UserInfo findByRelUserId(Long relUserId) {
        return userInfoDao.findByRelUserId(relUserId);
    }

    @Override
    public boolean checkMobileIsUsed(String phone) {
        UserInfo userInfo = userInfoDao.findByMobile(phone);
        FactoryInfo factoryInfo = factoryInfoDao.findByMobile(phone);
        return Objects.nonNull(userInfo)||Objects.nonNull(factoryInfo);
    }

    @Resource(name="userInfoDaoImpl")
    private UserInfoDao userInfoDao;

    @Resource(name = "staffDaoImpl")
    private StaffDao staffDao;

    @Resource(name = "roleDaoImpl")
    private RoleDao roleDao;

    @Resource(name="factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Autowired
    private StaffBuildService staffBuildService;

    private static final Long roleId = 669060147154255872L;
}
