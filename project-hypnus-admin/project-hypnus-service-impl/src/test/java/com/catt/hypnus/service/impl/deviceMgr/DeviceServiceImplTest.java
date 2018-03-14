package com.catt.hypnus.service.impl.deviceMgr;

import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.service.SpringTest;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import org.junit.Test;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;

import javax.annotation.Resource;


import static org.junit.Assert.*;

/**
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/3/14
 */
public class DeviceServiceImplTest extends SpringTest {
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;


    @Test
    public void findPage() throws Exception {
        Pageable pageable = new Pageable(1, 10);
        Page<Device> page = deviceService.findPage(pageable);
        System.out.println(page.getContent().size());

    }


}