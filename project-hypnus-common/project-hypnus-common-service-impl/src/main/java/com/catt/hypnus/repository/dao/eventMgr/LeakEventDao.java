package com.catt.hypnus.repository.dao.eventMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.eventMgtr.LeakEvent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * leak_eventDao接口
 * 
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
public interface LeakEventDao extends BaseDao<LeakEvent, Long> {

    List<Map> findLeakEventByDeviceId(String deviceId, Date startTime, Date endTime);

}
