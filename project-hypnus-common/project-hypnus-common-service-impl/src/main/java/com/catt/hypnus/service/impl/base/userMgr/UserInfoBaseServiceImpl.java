package com.catt.hypnus.service.impl.base.userMgr;

import javax.annotation.Resource;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.service.base.userMgr.UserInfoBaseService;
import org.springframework.stereotype.Service;

@Service("userInfoBaseServiceImpl")
public class UserInfoBaseServiceImpl extends
		BaseServiceImpl<UserInfo, Long> implements UserInfoBaseService {

	@Resource(name = "userInfoDaoImpl")
	private UserInfoDao userInfoDao;

	@Resource
	public void setBaseDao(UserInfoDao userInfoDao) {
		super.setBaseDao(userInfoDao);
	}

}
