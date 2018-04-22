package com.catt.hypnus.service.impl.deviceMgr;


import com.aliyuncs.exceptions.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.DateUtil;
import com.catt.hypnus.repository.dao.deviceMgr.BindLogInfoDao;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.dao.userMgr.UserInfoDao;
import com.catt.hypnus.repository.entity.deviceMgr.BindLogInfo;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.repository.entity.userMgr.DeviceShadowDTO;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.impl.iot.ShadowDeviceHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
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
    public Device findDeviceByDeviceId(String deviceId) {
        return deviceDao.findDeviceByDeviceId(deviceId);
    }

    @Override
    public void bindUser(String deviceId, Long userId) {
        Device device = this.findDeviceById(deviceId);
        device.bindUser(userId);
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildBindUserLog(userId, deviceId);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void bindFactory(String deviceId, Long factoryId) {
        Device device = this.findDeviceById(deviceId);
        device.bindFactory(factoryId);
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildBindFactoryLog(factoryId, deviceId);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void unbindUser(String deviceId) {
        Device device = this.findDeviceById(deviceId);
        Long userId = device.getCusId();
        device.unbindUser();
        deviceDao.saveOrUpdate(device);
        BindLogInfo log = BindLogInfo.buildUnBindUserLog(userId, deviceId);
        bindLogInfoDao.saveOrUpdate(log);
    }

    @Override
    public void unbindFactory(String deviceId) {
        Device device = this.findDeviceById(deviceId);
        Long factoryId = device.getFactoryId();
        device.unbindFactory();
        BindLogInfo log = BindLogInfo.buildUnBindFactoryLog(factoryId, deviceId);
        deviceDao.saveOrUpdate(device);
        bindLogInfoDao.saveOrUpdate(log);
    }

    public Device findDeviceById(String deviceId) {
        Map map = deviceDao.findByDeviceId(deviceId);
        Device device = null;
        if (map != null) {
            device = new Device();
            device.setDeviceId(MapUtil.getString(map, "deviceId"));
            device.setSnId(MapUtil.getString(map, "snId"));
            device.setModel(MapUtil.getString(map, "model"));
            device.setFactoryId(MapUtil.getLong(map, "factoryId"));
            device.setCusId(MapUtil.getLong(map, "cusId"));
            device.setId(MapUtil.getLong(map,"id"));
            Date productDate = DateUtil.parseDate(MapUtil.getString(map, "productDate"));
            device.setProductdate(productDate);
        }
        return device;
    }


    public DeviceShadowDTO getShadowDevice(String deviceName) throws ClientException, IntrospectionException, InstantiationException, IllegalAccessException, InvocationTargetException {
        DeviceShadowDTO shadow = ShadowDeviceHandler.getShadowDevice(deviceName);
        return shadow;
    }

    public boolean updateShadowDevice(DeviceShadowDTO shadow, String deviceName) throws InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException, ClientException {
        return ShadowDeviceHandler.updateShadowDevice(shadow, deviceName);
    }
}
