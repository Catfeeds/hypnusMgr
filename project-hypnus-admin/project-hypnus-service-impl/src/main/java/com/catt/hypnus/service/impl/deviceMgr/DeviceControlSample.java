package com.catt.hypnus.service.impl.deviceMgr;

import com.alibaba.fastjson.JSONObject;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.iot.model.v20170420.BatchGetDeviceStateRequest;
import com.aliyuncs.iot.model.v20170420.BatchGetDeviceStateResponse;
import com.aliyuncs.iot.model.v20170420.GetDeviceShadowRequest;
import com.aliyuncs.iot.model.v20170420.GetDeviceShadowResponse;
import com.aliyuncs.iot.model.v20170420.QueryDeviceRequest;
import com.aliyuncs.iot.model.v20170420.QueryDeviceResponse;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.catt.hypnus.service.impl.deviceMgr.BaseDeviceShadowTool.executeTest;

public class DeviceControlSample {

    public static void main(String[] args) throws IOException {
        String productKey = "TeapvKrZpFA";
        String accessKey = "LTAI5hvCHzOiuJ3f";
        String accessSecret = "FByHanHd0WtP2NBJbUReztPhI5GWoA";
        try {
            DefaultProfile.addEndpoint("cn-shanghai",
                    "cn-shanghai", "Iot", "iot.cn-shanghai.aliyuncs.com");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        IClientProfile profile = DefaultProfile.getProfile("cn-shanghai", accessKey, accessSecret);
        DefaultAcsClient client = new DefaultAcsClient(profile); //初始化SDK客户端


//        PubRequest request = new PubRequest();
//        request.setProductKey("productKey");
//        request.setMessageContent(Base64.encodeBase64String("hello world".getBytes()));
//        request.setTopicFullName("/productKey/deviceName/get");
//        request.setQos(0); //目前支持QoS0和QoS1
//        try {
//            PubResponse response = client.getAcsResponse(request);
//            System.out.println(response.getSuccess());
//            System.out.println(response.getErrorMessage());
//        }catch (Exception e){
//            System.out.println(e.getMessage());
//        }

        GetDeviceShadowRequest getDeviceShadowRequest = new GetDeviceShadowRequest();
        getDeviceShadowRequest.setProductKey(productKey);
        getDeviceShadowRequest.setDeviceName("363338363035511100390036");
        GetDeviceShadowResponse getDeviceShadowResponse = (GetDeviceShadowResponse)executeTest(getDeviceShadowRequest);

        QueryDeviceRequest request = new QueryDeviceRequest();
        request.setProductKey(productKey);
        request.setPageSize(10);
        request.setCurrentPage(0);
        try {
            QueryDeviceResponse response = client.getAcsResponse(request);
            if (response != null && response.getSuccess() != false) {
                System.out.println("查询设备成功！ ");
                List<QueryDeviceResponse.DeviceInfo> temp = response.getData();
                for (QueryDeviceResponse.DeviceInfo d : temp) {
                    System.out.println(d.getDeviceName());
                    //查询状态
                    BatchGetDeviceStateRequest request2 = new BatchGetDeviceStateRequest();
                    request2.setProductKey(d.getProductKey());
                    List<String> names = new ArrayList<String>();
                    names.add(d.getDeviceName());
                    request2.setDeviceNames(names);
                    BatchGetDeviceStateResponse response2 = client.getAcsResponse(request2);
                    if (response2 != null && response2.getSuccess() != false) {
                        System.out.println("state :" + response2.getDeviceStatusList().get(0).getStatus());
                    } else {
                        System.out.println("查询设备失败！requestId:" + response.getRequestId() + "原因：" + response.getErrorMessage());
                    }
                    //查询影子设备值
                    JSONObject shadowObject = null;
                    GetDeviceShadowRequest request3 = new GetDeviceShadowRequest();
                    request3.setProductKey(d.getProductKey());
                    request3.setDeviceName(d.getDeviceName());
                    GetDeviceShadowResponse response3 = client.getAcsResponse(request3);
                    if (response != null && response.getSuccess() != false) {
                        System.out.println("shadowMessage:" + response3.getShadowMessage());
                        if (response3.getShadowMessage() != null) {
                            shadowObject = JSONObject.parseObject(response3.getShadowMessage());
                            System.out.println(request3.getShadowMessage());
                        }
                    } else {
                        System.out.println("获取设备影子失败！requestId:" + response.getRequestId() + "原因：" + response.getErrorMessage());
                    }
                    //更新影子设备状态
//                    if(shadowObject != null)
//                    {
//                        UpdateDeviceShadowRequest request4 = new UpdateDeviceShadowRequest();
//                        request4.setProductKey(d.getProductKey());
//                        request4.setDeviceName(d.getDeviceName());
//
//                        Long shadowVersion =  shadowObject.getLong("version");
//                        Map attMap = new LinkedHashMap();
//                        attMap.put("language", 1);
//                        Map reportedMap = new LinkedHashMap();
//                        reportedMap.put("desired", attMap);
//                        Map shadowJsonMap = new LinkedHashMap();
//                        shadowJsonMap.put("method", "update");
//                        shadowJsonMap.put("state", reportedMap);
//                        shadowVersion++;
//                        shadowJsonMap.put("version", shadowVersion);
//
//                        request4.setShadowMessage(JSON.toJSONString(shadowJsonMap));
//                        UpdateDeviceShadowResponse response4 = client.getAcsResponse(request4);
//                        if (response4 != null && response4.getSuccess() != false) {
//                            System.out.println("更新设备影子成功！");
//                        } else {
//                            System.out.println("更新设备影子失败！requestId:" + response.getRequestId() + "原因：" + response.getErrorMessage());
//                        }
//                    }

                }

            } else {
                System.out.println("查询设备失败！requestId:" + response.getRequestId() + "原因：" + response.getErrorMessage());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


    }


}
