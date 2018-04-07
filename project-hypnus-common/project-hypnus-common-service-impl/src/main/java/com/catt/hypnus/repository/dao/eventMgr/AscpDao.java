package com.catt.hypnus.repository.dao.eventMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.eventMgtr.Ascp;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * ascpDao接口
 * 
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
public interface AscpDao extends BaseDao<Ascp, Long> {

    List<Map> findAscpEventByDeviceId(String deviceId, Date startTime, Date endTime);

}
