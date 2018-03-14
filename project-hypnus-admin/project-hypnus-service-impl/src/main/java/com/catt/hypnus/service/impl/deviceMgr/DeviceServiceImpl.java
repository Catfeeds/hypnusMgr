package com.catt.hypnus.service.impl.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 系统缓存业务接口实现
 *
 * @author runtime
 * @version V1.0
 * @date 2016-03-14 15:26:28
 */
@Service("deviceServiceImpl")
public class DeviceServiceImpl implements DeviceService {

    @Resource(name = "cacheManager")
    private DeviceDao deviceDao;

    public Page<Device> findPage(Pageable pageable) {
        return deviceDao.findPage(pageable);

    }


}
