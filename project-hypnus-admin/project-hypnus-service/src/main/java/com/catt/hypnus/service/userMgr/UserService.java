package com.catt.hypnus.service.userMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;

import java.util.Map;

/**
 * @author lyz
 * @date 2018/3/19 21:01
 * @desc
 **/
public interface UserService
{
    Page<Map> queryList(String phone, Pageable pageable);

    void addUserInfo(UserInfo info);

    void updateUserInfo(UserInfo info);

    void deleteUser(Long id);

    void updatePassword(Long id,String password);
}
