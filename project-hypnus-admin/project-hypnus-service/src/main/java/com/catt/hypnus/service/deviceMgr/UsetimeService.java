package com.catt.hypnus.service.deviceMgr;


import com.catt.hypnus.repository.entity.deviceMgr.Usetime;

import java.io.IOException;
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
     * @param deviceId：设备id
     * @param startTime
     * @param endTime
     * @return
     */
    List<Usetime> findList(String deviceId, String startTime, String endTime);

    Map getDateFromOss(String deviceId, String startTime, int timeType) throws IOException;

}

