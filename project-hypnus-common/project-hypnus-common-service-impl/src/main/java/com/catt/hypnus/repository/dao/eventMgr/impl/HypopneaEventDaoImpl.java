package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.eventMgr.HypopneaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.HypopneaEvent;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository("hypopneaEventDaoImpl")
public class HypopneaEventDaoImpl extends BaseDaoImpl<HypopneaEvent, Long>
		implements HypopneaEventDao {

	public List<Map> findHypopneaEventByDeviceId(String deviceId, Date startTime, Date endTime) {
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
		sql.append("SELECT DATE_FORMAT(u.record_time,'%Y-%m-%d') as dayTime,count(p.hypopnea_id) as apneaSum,SUM(u.peroid)/3600 as peroidSum from HYPOPNEA_EVENT p LEFT JOIN usetime u on(p.starttime=u.starttime)");
		sql.append("WHERE 1=1 ");
		return sql;
	}

	public List<Map> count(String deviceId, String startTime, String endTime) {
		StringBuffer sql = new StringBuffer();
		Map param = new HashMap<>();
		Map result = null;
		sql.append(sumSql());
		if (StringUtil.isNotBlank(deviceId)) {
			sql.append(" AND u.device_id = :deviceId ");
			param.put("deviceId", deviceId);
		}
		if (StringUtil.checkStr(startTime) && StringUtil.checkStr(endTime)) {
			sql.append(" AND (DATE_FORMAT(DATE_ADD(u.hypopnea_recordtime, INTERVAL 12 HOUR), '%Y-%m-%d') between :startTime ");
			param.put("startTime", startTime);
			sql.append(" AND  :endTime )");
			param.put("endTime", endTime);
		}

		sql.append(" GROUP BY DATE_FORMAT(DATE_ADD(u.hypopnea_recordtime, INTERVAL 12 HOUR), '%Y-%m-%d')");
		List<Map> relultList = this.findListBySql(sql.toString(), param, Map.class);
		return relultList;
	}

	public StringBuffer sumSql() {
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT DATE_FORMAT(DATE_ADD(u.hypopnea_recordtime, INTERVAL 12 HOUR), '%Y-%m-%d') as dayTime,  count(u.hypopnea_id) as count  from HYPOPNEA_EVENT u ");
		sql.append(" WHERE 1=1 ");
		return sql;
	}

}
