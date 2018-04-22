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
        if (startTime != null && endTime != null) {
            sql.append(" AND (DATE_FORMAT(DATE_ADD(t.end_time, INTERVAL 12 HOUR), '%Y-%m-%d') BETWEEN :startTime ");
            param.put("startTime", startTime);
            sql.append(" AND  :endTime )");
            param.put("endTime", endTime);
        }
        sql.append(" order by t.record_time asc");


        System.out.println("小喇叭，就睇下你咩料："+sql.toString());


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











    /**
     * 查询当天使用记录
     *
     * @param deviceId
     * @param todayString
     * @return
     */
    public List<Map> findListByToday(String deviceId,String todayString ) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        sql.append(baseSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND t.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (todayString != null) {
            sql.append(" AND t.startTime = :startTime");
            param.put("startTime", todayString);
        }
        sql.append(" order by t.record_time asc");


        System.out.println("小喇叭！DAO的SQL：" + sql.toString());



        return this.findListBySql(sql.toString(), param, Map.class);
    }

    public List<Map> findListByTimeStr(String deviceId, String startTime, String endTime) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        sql.append(baseSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND t.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (StringUtil.checkStr(startTime)&&StringUtil.checkStr(endTime)) {
            sql.append(" AND (DATE_FORMAT(DATE_SUB(t.end_time, INTERVAL 12 HOUR), '%Y-%m-%d') BETWEEN :startTime ");
            param.put("startTime", startTime);
            sql.append(" AND  :endTime )");
            param.put("endTime", endTime);
        }
        sql.append(" ORDER by t.end_time asc");
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

    /**
     * 周期中使用，时间全部延后12小时
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    public List<Map> findSumPeroid(String deviceId, String startTime, String endTime) {
        StringBuffer sql = new StringBuffer();
        Map param = new HashMap<>();
        Map result = null;
        sql.append(sumSql());
        if (StringUtil.isNotBlank(deviceId)) {
            sql.append(" AND u.device_id = :deviceId ");
            param.put("deviceId", deviceId);
        }
        if (startTime != null && endTime != null) {
            sql.append(" AND (DATE_FORMAT(DATE_ADD(u.end_time, INTERVAL 12 HOUR), '%Y-%m-%d') BETWEEN :startTime ");
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
