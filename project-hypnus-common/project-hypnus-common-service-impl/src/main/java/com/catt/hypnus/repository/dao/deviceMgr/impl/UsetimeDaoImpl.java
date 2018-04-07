package com.catt.hypnus.repository.dao.deviceMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository("usetimeDaoImpl")
public class UsetimeDaoImpl extends BaseDaoImpl<Usetime, Long>
        implements UsetimeDao {


    @Override
    public Page<Map> findPage(String deviceId, String startTime, String endTime, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        sql.append(baseSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND t.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (StringUtil.isNotBlank(startTime)) {
            sql.append(" AND t.starttime = :startTime ");
            param.put("startTime", startTime);
        }
        sql.append(" order by t.starttime desc");
        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }


    public List<Map> findMapList(String deviceId, String startTime, String endTime) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        sql.append(baseSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND t.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (StringUtil.isNotBlank(startTime)) {
            sql.append(" AND t.record_time >= :startTime ");
            param.put("startTime", startTime);
        }
        if (StringUtil.isNotBlank(endTime)) {
            sql.append(" AND t.record_time <= :endTime ");
            param.put("endTime", endTime);
        }
        sql.append(" order by t.record_time asc");
        return this.findListBySql(sql.toString(), param, Map.class);
    }

    public List<Map> findList(String deviceId, Date startTime, Date endTime) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        sql.append(baseSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND t.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (startTime != null && endTime != null) {
            sql.append(" AND (t.record_time between :startTime ");
            param.put("startTime", startTime);
            sql.append(" AND  :endTime )");
            param.put("endTime", endTime);
        }
        sql.append(" order by t.record_time asc");
        return this.findListBySql(sql.toString(), param, Map.class);
    }

    public StringBuffer baseSql() {
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT t.device_id as deviceId,t.starttime,t.end_time as endTime,t.mode,t.breathrate_pos as breathratePos,t.breath_fit as breathFit,t.breath_rate as breathRate,");
        sql.append("t.breath_ratio as breathRatio,t.cure_delay as cureDelay,t.data_version as dataVersion,t.dep_level as depLevel,t.dep_type as depType,");
        sql.append("t.dileak_pos as dileakPos,t.exhale_sensitive as exhaleSensitive,t.intime_pos as intimePos,t.mv_pos as mvPos,t.m_pressure_1 as presure1,t.m_pressure_2 as presure2,t.peroid,");
        sql.append("t.pressure_pos as presurePos,t.pressure_support as presureSupport,t.record_time as recordTime,t.start_pressure as startPresure from usetime t ");
        sql.append("WHERE 1=1 ");
        return sql;
    }

    public List<Map> findSumPeroid(String deviceId, Date startTime, Date endTime) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        Map result = null;
        sql.append(sumSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND u.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (startTime != null && endTime != null) {
            sql.append(" AND (u.end_time between :startTime ");
            param.put("startTime", startTime);
            sql.append(" AND  :endTime )");
            param.put("endTime", endTime);
        }
        sql.append(" GROUP BY DATE_FORMAT(DATE_ADD(u.end_time, INTERVAL 12 HOUR), '%Y-%m-%d')");
        List<Map> relultList = this.findListBySql(sql.toString(), param, Map.class);
        return relultList;
    }

    public StringBuffer sumSql() {
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT DATE_FORMAT(DATE_ADD(u.end_time, INTERVAL 12 HOUR), '%Y-%m-%d') as dayTime,  SUM(u.peroid) as sumPeroid  from usetime u ");
        sql.append(" WHERE 1=1 ");
        return sql;
    }
}
