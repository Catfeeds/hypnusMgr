package com.catt.hypnus.service.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;

import java.util.Map;

/**
 * 用户信息接口
 * 作者：runtime
 * 时间：2017-02-27
 */
public interface DeviceService {
    /**
     * 分页查询设备列表
     * @param pageable
     * @return
     */
    Page<Map> findPage(DeviceForm deviceForm,Pageable pageable);

    Page<Map> findRelPage(DeviceForm deviceForm,Long sysUserId,Pageable pageable);

    void bindUser(Long id,Long userId);

    void bindFactory(Long id,Long factoryId);

    void unbindUser(Long id);

    void unbindFactory(Long id);

}

