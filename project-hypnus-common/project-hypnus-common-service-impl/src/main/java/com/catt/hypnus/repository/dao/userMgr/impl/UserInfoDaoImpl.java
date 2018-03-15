package com.catt.hypnus.repository.dao.userMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import org.springframework.stereotype.Repository;



@Repository("userInfoDaoImpl")
public class UserInfoDaoImpl extends BaseDaoImpl<UserInfo, Long>
		implements UserInfoDao {

}
