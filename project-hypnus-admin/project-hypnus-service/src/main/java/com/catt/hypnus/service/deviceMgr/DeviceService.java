package com.catt.hypnus.service.deviceMgr;


import com.aliyun.oss.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.DeviceShadow;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * 用户信息接口
 * 作者：runtime
 * 时间：2017-02-27
 */
public interface DeviceService {
    /**
     * 分页查询设备列表
     *
     * @param pageable
     * @return
     */
    Page<Map> findPage(DeviceForm deviceForm, Pageable pageable);

    Page<Map> findRelPage(DeviceForm deviceForm, Long sysUserId, Pageable pageable);

    void bindUser(Long id, Long userId);

    void bindFactory(Long id, Long factoryId);

    void unbindUser(Long id);

    void unbindFactory(Long id);

    /**
     * 查询影子设备参数
     *
     * @param deviceName
     * @return
     */
    DeviceShadow getShadowDevice(String deviceName) throws ClientException, com.aliyuncs.exceptions.ClientException, IntrospectionException, InstantiationException, IllegalAccessException, InvocationTargetException;

    /**
     * 更新影子设备参数
     *
     * @param shadow
     * @param deviceName
     * @return
     */
    boolean updateShadowDevice(DeviceShadow shadow, String deviceName) throws InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException, com.aliyuncs.exceptions.ClientException;

}

