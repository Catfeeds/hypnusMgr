package com.catt.hypnus.service.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;

import java.io.IOException;
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
    List<Map> findListByDay(String deviceId);


    /**
     * 分页查询使用记录
     *
     * @param pageable
     * @return
     */
    Page<Usetime> findPage(Pageable pageable, UsetimeForm usetimeForm);

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

    Map getDateFromOss(String deviceId, String startTime, int timeType) throws IOException;

    /**
     * 使用记录数据统计
     *
     * @param deviceId
     * @return
     */
    Map baseStatisticData(String deviceId);

    /**
     * 呼吸事件等的统计数据
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getEventData(String deviceId, Date startTime, Date endTime);

    /**
     * AH事件统计
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    Map getHypopneaEventData(String deviceId, Date startTime, Date endTime);

}

