package com.catt.hypnus.service.impl.deviceMgr;


import com.aliyuncs.exceptions.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.dao.deviceMgr.BindLogInfoDao;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.DeviceShadow;
import com.catt.hypnus.repository.entity.deviceMgr.BindLogInfo;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.impl.iot.ShadowDeviceHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.Objects;

/**
 * 系统缓存业务接口实现
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-14 15:26:28
 */
@Service("deviceServiceImpl")
@Transactional
public class DeviceServiceImpl implements DeviceService {

    @Resource(name = "deviceDaoImpl")
    private DeviceDao deviceDao;

    @Resource(name = "userInfoDaoImpl")
    private UserInfoDao userInfoDao;

    @Resource(name = "factoryInfoDaoImpl")
    private FactoryInfoDao factoryInfoDao;

    @Resource(name = "bindLogInfoDaoImpl")
    private BindLogInfoDao bindLogInfoDao;

    @Override
    public Page<Map> findPage(DeviceForm deviceForm, Pageable pageable) {
        return deviceDao.queryList(deviceForm.getSnId(), deviceForm.getUserMobile(), deviceForm.getFactoryMobile(), pageable);
    }

    @Override
    public Page<Map> findRelPage(DeviceForm deviceForm, Long sysUserId, Pageable pageable) {
        Long userId;
        UserInfo info = userInfoDao.findByRelUserId(sysUserId);
        if (Objects.nonNull(info)) {
            userId = info.getId();
        } else {
            FactoryInfo factoryInfo = factoryInfoDao.findByRelUserId(sysUserId);
            userId = factoryInfo.getId();
        }
        return deviceDao.queryRelPageList(deviceForm.getSnId(), userId, pageable);
    }

    @Override
    public void bindUser(Long id, Long userId) {
        Device device = deviceDao.find(id);
        device.bindUser(userId);
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildBindUserLog(userId, id);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void bindFactory(Long id, Long factoryId) {
        Device device = deviceDao.find(id);
        device.bindFactory(factoryId);
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildBindFactoryLog(factoryId, id);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void unbindUser(Long id) {
        Device device = deviceDao.find(id);
        Long userId = device.getCusId();
        device.unbindUser();
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildUnBindUserLog(userId, id);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void unbindFactory(Long id) {
        Device device = deviceDao.find(id);
        Long factoryId = device.getFactoryId();
        device.unbindFactory();
        BindLogInfo log = BindLogInfo.buildUnBindFactoryLog(factoryId, id);
        deviceDao.saveOrUpdate(device);
        bindLogInfoDao.saveOrUpdate(log);
    }

    public DeviceShadow getShadowDevice(String deviceName) throws ClientException, IntrospectionException, InstantiationException, IllegalAccessException, InvocationTargetException {
        DeviceShadow shadow = ShadowDeviceHandler.getShadowDevice(deviceName);
        return shadow;
    }

    public boolean updateShadowDevice(DeviceShadow shadow, String deviceName) throws InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException, ClientException {
        return ShadowDeviceHandler.updateShadowDevice(shadow, deviceName);
    }
}
