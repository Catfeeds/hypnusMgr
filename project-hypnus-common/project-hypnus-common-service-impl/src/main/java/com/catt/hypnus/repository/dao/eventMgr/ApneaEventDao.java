package com.catt.hypnus.repository.dao.eventMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.eventMgtr.ApneaEvent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * apnea_eventDao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-18 12:15:47
 */
public interface ApneaEventDao extends BaseDao<ApneaEvent, Long> {
    /**
     * 统计呼吸暂停事件
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findApneaEventByDeviceId(String deviceId, Date startTime, Date endTime);

    /**
     * 呼吸暂停次数
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> count(String deviceId, String startTime, String endTime);

}
