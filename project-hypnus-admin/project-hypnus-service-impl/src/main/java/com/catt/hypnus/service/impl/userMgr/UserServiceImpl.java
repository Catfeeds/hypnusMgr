package com.catt.hypnus.service.impl.userMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @author lyz
 * @date 2018/3/19 21:02
 * @desc
 **/
@Service(value="userServiceImpl")
public class UserServiceImpl implements UserService
{
    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        return userInfoDao.queryList(phone,pageable);
    }

    @Resource(name="userInfoDaoImpl")
    private UserInfoDao userInfoDao;
}
