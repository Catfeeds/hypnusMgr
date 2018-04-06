package com.catt.hypnus.repository.dao.userMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
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
		sb.append(" order by d_modify_date desc");
		return this.findPageBySql(sb.toString(),param,pageable,Map.class);
	}

	@Override
	public Page<Map> queryListByNonBind(String phone, Pageable pageable) {
		StringBuffer sb = new StringBuffer();
		Map param = new HashMap();
		sb.append("select * from user_info where i_id not in ( select cus_id from device where cus_id != '' group by cus_id) ");
		if(StringUtil.isNotBlank(phone)){
			sb.append(" and phone = :phone");
			param.put("phone",phone);
		}
		sb.append(" order by d_modify_date desc");
		return this.findPageBySql(sb.toString(),param,pageable,Map.class);
	}

	@Override
	public UserInfo findByMobile(String phone) {
		if(phone==null){
			return null;
		}else{
			try{
				String jql = "select f from UserInfo f where f.phone = :phone";
				return (UserInfo) entityManager.createQuery(jql,UserInfo.class).setParameter("phone",phone).getSingleResult();
			}catch (Exception e){
				return null;
			}

		}
	}

	@Override
	public UserInfo findByRelUserId(Long relUserId) {
		if(relUserId==null){
			return null;
		}else{
			try{
				String jql = "select f from UserInfo f where f.relUserId = :relUserId";
				return (UserInfo) entityManager.createQuery(jql,UserInfo.class).setParameter("relUserId",relUserId).getSingleResult();
			}catch (Exception e){
				return null;
			}

		}
	}
}
