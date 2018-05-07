package com.catt.hypnus.repository.dao.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * usetimeDao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-17 17:09:14
 */
public interface UsetimeDao extends BaseDao<Usetime, Long> {
    /**
     * 分页查询使用记录
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @param pageable
     * @return
     */
    Page<Map> findPage(String deviceId, String startTime, String endTime, Pageable pageable);

    /**
     * 使用记录列表
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findMapList(String deviceId, String startTime, String endTime);

    /**
     * 日期查询使用记录
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findList(String deviceId, Date startTime, Date endTime);


    /**
     * 获取设备信息，工作参数数据（设备详情统计数据）
     *
     * @param deviceId
     * @param todayString
     * @return
     */
    Map getStatisticsDataWorkParam(String deviceId,String todayString);

    /**
     * 获取设备信息，工作参数数据（设备详情统计数据）
     *
     * @param deviceId
     * @param starttime
     * @param endtime
     * @return
     */
    List<Map>  getStatisticsDataWorkParamPeriod(String deviceId,String starttime, String endtime);

    /**
     * 统计数据中使用，全部提前12小时统计
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findListByTimeStr(String deviceId, String startTime, String endTime);

    /**
     * 使用时长计算
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findSumPeroid(String deviceId, String startTime, String endTime);



    /**
     * 获取呼吸事件数据（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getBreathEventData(String deviceId,String startTime,String endTime);

    /**
     * 获取使用信息数据：初次进入详情页面默认统计时间为一天（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getStatisticsDataUseInfo(String deviceId, String startTime,String endTime);

    /**
     * 从t_dev_day_statistics表中获取总使用时间，总使用天数，总天数，总漏气量
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getStatisticsDataTotalData(String deviceId, String startTime,String endTime);

}
