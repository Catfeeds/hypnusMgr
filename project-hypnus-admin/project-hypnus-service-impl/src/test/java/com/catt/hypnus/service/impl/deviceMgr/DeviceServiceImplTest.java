package com.catt.hypnus.service.impl.deviceMgr;

import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.service.SpringTest;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/14
 */
public class DeviceServiceImplTest extends SpringTest {
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;


    @Test
    public void findPage() throws Exception {
        Pageable pageable = new Pageable(1, 10);

    }

    @Test
    public void findDeviceById() throws Exception {
        String deviceId = "3633383630355111003C0036";
        Device device = deviceService.findDeviceById(deviceId);
        System.out.println(device.getDeviceId());
    }


}