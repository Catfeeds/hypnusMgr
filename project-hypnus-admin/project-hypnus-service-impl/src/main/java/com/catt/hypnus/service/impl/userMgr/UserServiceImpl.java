package com.catt.hypnus.service.impl.userMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Map;

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
    public void addUserInfo(UserInfo info) {
        info.init();
        userInfoDao.saveOrUpdate(info);
    }

    @Override
    public void updateUserInfo(UserInfo info) {
        userInfoDao.saveOrUpdate(info);
    }

    @Override
    public void deleteUser(Long id) {
        UserInfo info = userInfoDao.find(id);
        userInfoDao.remove(info);
    }

    @Override
    public void updatePassword(Long id, String password) {
        UserInfo info = userInfoDao.find(id);
        info.updatePwd(password);
        userInfoDao.saveOrUpdate(info);
    }

    @Resource(name="userInfoDaoImpl")
    private UserInfoDao userInfoDao;
}
