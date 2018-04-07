package com.catt.hypnus.repository.dao.eventMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsrEvent;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * csr_eventDao接口
 *
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
public interface CsrEventDao extends BaseDao<CsrEvent, Long> {
    List<Map> findCsrEventByDeviceId(String deviceId, Date startTime, Date endTime);

}
