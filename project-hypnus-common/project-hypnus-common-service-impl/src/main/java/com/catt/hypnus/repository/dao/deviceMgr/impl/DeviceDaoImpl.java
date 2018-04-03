package com.catt.hypnus.repository.dao.deviceMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


@Repository("deviceDaoImpl")
public class DeviceDaoImpl extends BaseDaoImpl<Device, Long>
		implements DeviceDao {

	@Override
	public Page<Map> queryList(String snId, String userMobile, String factoryMobile, Pageable pageable) {
		StringBuffer sql = new StringBuffer();
		Map param = new HashMap<>();

		sql.append("select d.*,f.phone,f.name,u.phone as userPhone from device d left join factory_info f on d.factory_id = f.i_id left join user_info u on d.cus_id = u.i_id where 1=1 ");
		if (StringUtil.isNotBlank(userMobile)) {
			sql.append(" and u.phone = :userMobile ");
			param.put("userMobile",userMobile);
		}
		if(StringUtil.isNotBlank(factoryMobile)){
			sql.append(" and f.phone = :factoryMobile ");
			param.put("factoryMobile",factoryMobile);
		}
		if(StringUtil.isNotBlank(snId)){
			sql.append(" and d.sn_id like (:snId)");
			param.put("snId",snId+"%");
		}
		sql.append(" order by d_modify_date desc");
		return this.findPageBySql(sql.toString(),param,pageable,Map.class);
	}

	@Override
	public Page<Map> queryRelPageList(String snId, Long userId, Pageable pageable) {
		StringBuffer sql = new StringBuffer();
		Map param = new HashMap<>();

		sql.append("select d.*,f.phone,f.name,u.phone as userPhone from device_info d left join factory_info f on d.factory_id = f.i_id left join user_info u on d.cus_id = u.i_id where (d.cus_id = :userId or d.factory_id = :userId) ");
		param.put("userId",userId);
		if(StringUtil.isNotBlank(snId)){
			sql.append(" and d.sn_id like (:snId)");
			param.put("snId",snId+"%");
		}
		sql.append(" order by d_modify_date desc");

		return this.findPageBySql(sql.toString(),param,pageable,Map.class);
	}

	@Override
	public Device findDeviceByDeviceId(String deviceId) {
		if(deviceId==null){
			return null;
		}else{
			try{
				String jql = "select f from Device f where f.deviceId = :deviceId";
				return (Device) entityManager.createQuery(jql,Device.class).setParameter("deviceId",deviceId).getSingleResult();
			}catch (Exception e){
				return null;
			}

		}
	}
}
