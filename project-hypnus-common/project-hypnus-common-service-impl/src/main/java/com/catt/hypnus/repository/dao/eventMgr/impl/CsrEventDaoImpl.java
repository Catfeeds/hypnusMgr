package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.eventMgr.CsrEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsrEvent;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository("csrEventDaoImpl")
public class CsrEventDaoImpl extends BaseDaoImpl<CsrEvent, Long>
		implements CsrEventDao {

	public List<Map> findCsrEventByDeviceId(String deviceId, Date startTime, Date endTime){

		StringBuffer sql = new StringBuffer();
		Map param = new HashMap<>();
		Map result = null;
		sql.append(baseSql());
		if (StringUtil.isNotBlank(deviceId)) {
			sql.append(" AND u.device_id = :deviceId ");
			param.put("deviceId", deviceId);
		}
		if (startTime != null && endTime != null) {
			sql.append(" AND (u.record_time between :startTime ");
			param.put("startTime", startTime);
			sql.append(" AND  :endTime )");
			param.put("endTime", endTime);
		}
		sql.append(" GROUP BY DATE_FORMAT(u.record_time, '%Y-%m-%d')");
		sql.append(" order by u.record_time asc");
		List<Map> relultList = this.findListBySql(sql.toString(), param, Map.class);
		return relultList;
	}

	public StringBuffer baseSql() {
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT DATE_FORMAT(u.record_time,'%Y-%m-%d') as dayTime,count(p.csr_id) as apneaSum,SUM(u.peroid)/3600 as peroidSum from csr_event p LEFT JOIN usetime u on(p.starttime=u.starttime)");
		sql.append("WHERE 1=1 ");
		return sql;
	}

}
