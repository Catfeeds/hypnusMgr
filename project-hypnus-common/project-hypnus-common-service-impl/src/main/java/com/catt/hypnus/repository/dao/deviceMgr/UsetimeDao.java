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
     * @param deviceId
     * @param startTime
     * @param endTime
     * @param pageable
     * @return
     */
    Page<Map> findPage(String deviceId, String startTime, String endTime, Pageable pageable);

    /**
     * 使用记录列表
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findMapList(String deviceId, String startTime, String endTime);

    /**
     * 日期查询使用记录
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    List<Map> findList(String deviceId, Date startTime, Date endTime);

}
