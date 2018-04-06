package com.catt.hypnus.repository.dao.eventMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.eventMgtr.HypopneaEvent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * hypopnea_eventDao接口
 * 
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
public interface HypopneaEventDao extends BaseDao<HypopneaEvent, Long> {
    List<Map> findHypopneaEventByDeviceId(String deviceId, Date startTime, Date endTime);


}
