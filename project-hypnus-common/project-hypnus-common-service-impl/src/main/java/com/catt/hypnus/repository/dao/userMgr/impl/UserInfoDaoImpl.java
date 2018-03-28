package com.catt.hypnus.repository.dao.userMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


@Repository("userInfoDaoImpl")
public class UserInfoDaoImpl extends BaseDaoImpl<UserInfo, Long>
		implements UserInfoDao {

	@Override
	public Page<Map> queryList(String phone, Pageable pageable) {
		StringBuffer sb = new StringBuffer();
		Map param = new HashMap();
		sb.append("select * from user_info where 1=1 ");
		if(StringUtil.isNotBlank(phone)){
			sb.append(" and phone = :phone");
			param.put("phone",phone);
		}
		return this.findPageBySql(sb.toString(),param,pageable,Map.class);
	}

	@Override
	public Page<Map> queryListByNonBind(String phone, Pageable pageable) {
		StringBuffer sb = new StringBuffer();
		Map param = new HashMap();
		sb.append("select * from user_info where i_id not in ( select cus_id from device_info where cus_id != null) ");
		if(StringUtil.isNotBlank(phone)){
			sb.append(" and phone = :phone");
			param.put("phone",phone);
		}
		return this.findPageBySql(sb.toString(),param,pageable,Map.class);
	}
}
