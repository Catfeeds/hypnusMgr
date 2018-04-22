package com.catt.hypnus.service.impl.iot;

import com.aliyuncs.exceptions.ClientException;
import com.catt.hypnus.repository.entity.userMgr.DeviceShadowDTO;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;

/**
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/4/1
 */
public class ShadowDeviceTest {
    public static void main(String[] args) throws ClientException, IntrospectionException, InstantiationException, IllegalAccessException, InvocationTargetException {
        DeviceShadowDTO shadow = ShadowDeviceHandler.getShadowDevice("CP70100505S");
//        System.out.println(shadow.getAi_alarm());
//        shadow.setAi_alarm("1");
//        ShadowDeviceHandler.updateShadowDevice(shadow,"363338363035511100390036");
        shadow = ShadowDeviceHandler.getShadowDevice("CP70100505S");
        System.out.println(shadow.getAi_alarm());
    }
}
