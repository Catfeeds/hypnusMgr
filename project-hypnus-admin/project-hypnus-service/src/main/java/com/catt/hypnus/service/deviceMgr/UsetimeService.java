package com.catt.hypnus.service.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 使用记录接口
 * 作者：runtime
 * 时间：2018-02-27
 */
public interface UsetimeService {

    /**
     * 查询使用记录
     *
     * @param deviceId：设备id
     * @param startTime
     * @param endTime
     * @return
     */
    List<Usetime> findList(String deviceId, String startTime, String endTime);

    /**
     * 使用记录
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findMapList(String deviceId, String startTime, String endTime);

    /**
     * 按日期查询使用记录
     *
     * @param deviceId
     * @return
     */
    List<Map> findListByDay(String deviceId,Date today);


    /**
     * 获取设备信息，工作参数数据（设备详情统计数据）
     *
     * @param deviceId
     * @return
     */
    Map getStatisticsDataWorkParam(String deviceId,Date today);

    /**
     * 获取设备信息，工作参数数据（设备详情统计数据）
     *
     * @param deviceId
     * @param starttime
     * @param endtime
     * @return
     */
    Map getStatisticsDataWorkParamPeriod(String deviceId,String starttime, String endtime);

    /**
     * 分页查询使用记录
     *
     * @param pageable
     * @return
     */
    Page<Usetime> findPage(Pageable pageable, UsetimeForm usetimeForm);

    /**
     * 统计数据使用，提前12小时
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findListByTimeStr(String deviceId, String startTime, String endTime);

    /**
     * 查询使用记录
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @param pageable
     * @return
     */
    Page<Map> findPageMap(String deviceId, String startTime, String endTime, Pageable pageable);

    Map getDateFromOss(String deviceId, String startTime, String endTime) throws IOException, ParseException;

    Map getDetailFormOss(String deviceId, String startTime) throws IOException, ParseException;
    /**
     * 使用记录数据统计
     *
     * @param deviceId
     * @return
     */
    Map baseStatisticData(String deviceId, String startTime, String endTime);

    /**
     * 呼吸事件等的统计数据
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getEventData(String deviceId, String startTime, String endTime);

    /**
     * AH事件统计
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getHypopneaEventData(String deviceId, String startTime, String endTime);

    Map getApneaData(String deviceId, String startTime, String endTime);


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
     * 获取统计数据页面的潮气量，分钟通气量，呼吸频率，呼吸比（从OSS文件中读取）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getStatisticsDataFromOSS(String deviceId,String startTime,String endTime);

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
     * 获取漏气信息数据（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getLeakInfoData(String deviceId,String startTime,String endTime);

    /**
     * 获取统计图形数据（呼吸事件柱状图）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getStatisticsChartData(String deviceId,String startTime,String endTime);


}

