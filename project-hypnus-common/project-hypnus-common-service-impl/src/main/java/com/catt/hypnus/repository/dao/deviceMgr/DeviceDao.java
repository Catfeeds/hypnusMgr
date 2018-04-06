package com.catt.hypnus.repository.dao.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.deviceMgr.Device;

import java.util.Map;

/**
 * 设备表Dao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-14 20:05:38
 */
public interface DeviceDao extends BaseDao<Device, Long> {

    Page<Map> queryList(String snId, String userMobile, String factoryMobile, Pageable pageable);

    Page<Map> queryRelPageList(String snId, Long userId, Pageable pageable);

    Device findDeviceByDeviceId(String deviceId);

    Map findByDeviceId(String deviceId);

}
