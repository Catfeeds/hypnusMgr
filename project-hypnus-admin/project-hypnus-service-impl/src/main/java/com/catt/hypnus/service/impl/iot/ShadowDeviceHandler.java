package com.catt.hypnus.service.impl.iot;

import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.iot.model.v20170420.*;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.catt.common.module.exception.pojo.BaseException;
import com.catt.common.util.collections.MapUtil;
import com.catt.hypnus.repository.entity.DeviceShadow;
import com.catt.hypnus.repository.entity.userMgr.DeviceShadowDTO;
import com.gci.common.util.lang.StringUtil;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.*;

/**
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/4/1
 */
public class ShadowDeviceHandler {
    private static String productKey = "TeapvKrZpFA";
    private static String accessKey = "LTAI5hvCHzOiuJ3f";
    private static String accessSecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";

    public static DeviceShadow getShadowDevice(String deviceName) throws ClientException, InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException {
        try {
            DefaultProfile.addEndpoint("cn-shanghai",
                    "cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        IClientProfile profile = DefaultProfile.getProfile("cn-shanghai", accessKey, accessSecret);
        DefaultAcsClient client = new DefaultAcsClient(profile); //初始化SDK客户端

        QueryDeviceByNameRequest queryDeviceByNameRequest = new QueryDeviceByNameRequest();
        queryDeviceByNameRequest.setDeviceName(deviceName);
        queryDeviceByNameRequest.setProductKey(productKey);

        GetDeviceShadowRequest getDeviceShadowRequest = new GetDeviceShadowRequest();
        getDeviceShadowRequest.setDeviceName(deviceName);
        getDeviceShadowRequest.setProductKey(productKey);

        GetDeviceShadowResponse getDeviceShadowResponse = client.getAcsResponse(getDeviceShadowRequest);
        String shadowJSON = getDeviceShadowResponse.getShadowMessage();
        if (!StringUtil.checkStr(shadowJSON)) {
            throw BaseException.errorByErrInfo("没有找到此影子设备");
        }
        Map shadow = (Map) JSONObject.parse(shadowJSON);
        Map state = (Map) shadow.get("state");
        Map reported = (Map) state.get("reported");
        DeviceShadow deviceShadow = (DeviceShadow) MapUtil.convertMap(DeviceShadow.class, reported);
//        DeviceShadowDTO deviceShadowDTO = (DeviceShadowDTO) MapUtil.convertMap(DeviceShadowDTO.class, reported);
        //获取影子设备当前状态
        BatchGetDeviceStateRequest request2 = new BatchGetDeviceStateRequest();
        request2.setProductKey(productKey);
        List<String> names = new ArrayList<String>();
        names.add(deviceName);
        request2.setDeviceNames(names);
        BatchGetDeviceStateResponse response2 = client.getAcsResponse(request2);
        if (response2 != null && response2.getSuccess() != false) {
            deviceShadow.setCur_state(response2.getDeviceStatusList().get(0).getStatus());
        } else {
            BaseException.errorByErrInfo("查询设备失败！ " + response2.getErrorMessage());
        }

        return deviceShadow;
    }

    public static boolean updateShadowDevice(DeviceShadowDTO deviceShadow, String deviceName) throws ClientException, InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException {
        try {
            DefaultProfile.addEndpoint("cn-shanghai",
                    "cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        IClientProfile profile = DefaultProfile.getProfile("cn-shanghai", accessKey, accessSecret);
        DefaultAcsClient client = new DefaultAcsClient(profile); //初始化SDK客户端
        //先读取影子设备信息
        GetDeviceShadowRequest getDeviceShadowRequest = new GetDeviceShadowRequest();
        getDeviceShadowRequest.setDeviceName(deviceName);
        getDeviceShadowRequest.setProductKey(productKey);
        GetDeviceShadowResponse getDeviceShadowResponse = client.getAcsResponse(getDeviceShadowRequest);
        String shadowJSON = getDeviceShadowResponse.getShadowMessage();
        Map shadow = (Map) JSONObject.parse(shadowJSON);

        JSONObject shadowObject = null;
        shadowObject = JSONObject.parseObject(getDeviceShadowResponse.getShadowMessage());
        Long shadowVersion = shadowObject.getLong("version");
      //  Map desired = MapUtil.convertBean(deviceShadow);
        Map attMap = new LinkedHashMap();
        attMap.put("language", 1);
        Map shadowMessMap = new HashMap();
        Map state = new HashMap();
        state.put("desired", attMap);
        shadowMessMap.put("method", "update");
        shadowMessMap.put("state", state);
        shadowVersion++;
        shadowMessMap.put("version", shadowVersion);

        UpdateDeviceShadowRequest updateDeviceShadowRequest = new UpdateDeviceShadowRequest();
        updateDeviceShadowRequest.setDeviceName(deviceName);
        updateDeviceShadowRequest.setProductKey(productKey);
        String shadowMessage = JSONObject.toJSONString(shadowMessMap);
        updateDeviceShadowRequest.setShadowMessage(shadowMessage);
        UpdateDeviceShadowResponse updateDeviceShadowResponse = client.getAcsResponse(updateDeviceShadowRequest);
        return updateDeviceShadowResponse.getSuccess();

    }

    public static boolean updateShadowDeviceMap(Map devicePro, String deviceName) throws ClientException, InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException {
        try {
            DefaultProfile.addEndpoint("cn-shanghai",
                    "cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        IClientProfile profile = DefaultProfile.getProfile("cn-shanghai", accessKey, accessSecret);
        DefaultAcsClient client = new DefaultAcsClient(profile); //初始化SDK客户端
        //先读取影子设备信息
        GetDeviceShadowRequest getDeviceShadowRequest = new GetDeviceShadowRequest();
        getDeviceShadowRequest.setDeviceName(deviceName);
        getDeviceShadowRequest.setProductKey(productKey);
        GetDeviceShadowResponse getDeviceShadowResponse = client.getAcsResponse(getDeviceShadowRequest);
        String shadowJSON = getDeviceShadowResponse.getShadowMessage();

        JSONObject shadowObject = null;
        shadowObject = JSONObject.parseObject(getDeviceShadowResponse.getShadowMessage());
        Long shadowVersion = shadowObject.getLong("version");
        //  Map desired = MapUtil.convertBean(deviceShadow);
        //应该要进行一下安全验证，不然有风险
      //  Map attMap = new LinkedHashMap();
      //  attMap.put("language", 1);
        Map shadowMessMap = new HashMap();
        Map state = new HashMap();
        state.put("desired", devicePro);
        shadowMessMap.put("method", "update");
        shadowMessMap.put("state", state);
        shadowVersion++;
        shadowMessMap.put("version", shadowVersion);

        UpdateDeviceShadowRequest updateDeviceShadowRequest = new UpdateDeviceShadowRequest();
        updateDeviceShadowRequest.setDeviceName(deviceName);
        updateDeviceShadowRequest.setProductKey(productKey);
        String shadowMessage = JSONObject.toJSONString(shadowMessMap);
        updateDeviceShadowRequest.setShadowMessage(shadowMessage);
        UpdateDeviceShadowResponse updateDeviceShadowResponse = client.getAcsResponse(updateDeviceShadowRequest);
        return updateDeviceShadowResponse.getSuccess();
    }

}
