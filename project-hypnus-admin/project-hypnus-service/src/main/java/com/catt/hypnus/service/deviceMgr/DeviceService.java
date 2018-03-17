package com.catt.hypnus.service.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.customerMgr.CusInfo;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.form.customerMgr.CusInfoForm;
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

}

