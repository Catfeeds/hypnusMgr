package com.catt.hypnus.service.impl.iot.demo.shadow;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.catt.hypnus.service.impl.iot.util.AliyunWebUtils;
import com.catt.hypnus.service.impl.iot.util.LogUtil;
import com.catt.hypnus.service.impl.iot.util.SignUtil;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class Hypnus4ShadowTest {
    /**设备端查询影子method*/
    private static final String SHADOW_METHOD_REPLY = "reply";
    /**服务端下发method*/
    private static final String SHADOW_METHOD_CONTROL = "control";
    private static final String AUTH_RESULT_SUCCESS_KEY = "code";
    private static final String RESULT_CODE_SUCCESS = "200";
    private static final String RESULT_CODE_NO_SHADOW = "407";
    private static final String RESULT_STATUS_SUCCESS = "success";
    /**
     * 认证服务器地址 每个区域不一样
     */
    private static String authUrl = "https://iot-auth.cn-shanghai.aliyuncs.com/auth/devicename";
    /**
     * 设备key和secret信息
     */
    private static String deviceName = "363338363035511100290036";
    private static String productKey = "TeapvKrZpFA";
    private static String deviceSecret = "8y0a3eyV15qLlIXgtbIrfdOOTvOkQUDG";
    /**
     * 设备影子topic
     */
    private static String shadowAckTopic = "/shadow/get/" + productKey + "/" + deviceName;
    private static String shadowUpdateTopic = "/shadow/update/" + productKey + "/" + deviceName;
    /**
     * 影子版本号
     */
    private static long shadowVersion = 0;
    /**
     * 根据属性key-value 生成shadow json格式数据
     *
     * @param attributeMap
     * @return
     */
    private static String genUpdateShadowMsg(Map<String, Object> attributeMap) {
        Set<String> attSet = attributeMap.keySet();
        Map<String, Object> attMap = new LinkedHashMap<String, Object>();
        for (String attKey : attSet) {
            attMap.put(attKey, attributeMap.get(attKey));
        }

        Map<String, Object> reportedMap = new LinkedHashMap<String, Object>();

        reportedMap.put("reported", attMap);

        Map<String, Object> shadowJsonMap = new LinkedHashMap<String, Object>();
        shadowJsonMap.put("method", "update");

        shadowJsonMap.put("state", reportedMap);


        //shadow version自增
        shadowVersion++;
        shadowJsonMap.put("version", shadowVersion);

        return JSON.toJSONString(shadowJsonMap);
    }
    /**
     * 生成clean shadow json数据
     *
     * @param reportMsg
     * @return
     */
    private static String genCleanShadowMsg(String reportMsg) {
        Map<String, Object> stateMap = new LinkedHashMap<String, Object>();
        if (reportMsg == null || reportMsg.length() == 0) {
            stateMap.put("reported", "null");
        } else {
            JSONObject reportJsonObj = JSON.parseObject(reportMsg);
            Set<String> attSet = reportJsonObj.keySet();
            Map<String, Object> attMap = new LinkedHashMap<String, Object>();
            for (String attKey : attSet) {
                attMap.put(attKey, reportJsonObj.getString(attKey));
            }
            stateMap.put("reported", attMap);
        }
        stateMap.put("desired", "null");
        Map<String, Object> cleanShadowMap = new LinkedHashMap<String, Object>();
        cleanShadowMap.put("method", "update");
        cleanShadowMap.put("state", stateMap);
        shadowVersion++;
        cleanShadowMap.put("version", shadowVersion);
        return JSON.toJSONString(cleanShadowMap);
    }
    /**
     * 更新影子reported json数据 ，将language同步更新到reported中
     *
     * @param reportMsg
     * @param language
     * @return
     */
    private static String genUpdateShadowReportdMsg(String reportMsg, String language) {
        Map<String, Object> stateMap = new LinkedHashMap<String, Object>();
        Map<String, Object> attMap = new LinkedHashMap<String, Object>();
        if (reportMsg != null){
            JSONObject reportJsonObj = JSON.parseObject(reportMsg);
            Set<String> attSet = reportJsonObj.keySet();
            for (String attKey : attSet) {
                attMap.put(attKey, reportJsonObj.getString(attKey));
            }
        }
        attMap.put("language", language);
        stateMap.put("reported", attMap);
        Map<String, Object> cleanShadowMap = new LinkedHashMap<String, Object>();
        cleanShadowMap.put("method", "update");
        cleanShadowMap.put("state", stateMap);
        shadowVersion++;
        cleanShadowMap.put("version", shadowVersion);
        return JSON.toJSONString(cleanShadowMap);
    }
    /**
     * 解析出desired信息
     *
     * @param message
     * @param sampleClient
     * @throws Exception
     */
    private static void parseDesiredMsg(MqttMessage message, MqttClient sampleClient) throws Exception {
        JSONObject shadowJsonObj = JSON.parseObject(message.toString());
        JSONObject payloadJsonObj = shadowJsonObj.getJSONObject("payload");
        shadowVersion = shadowJsonObj.getLong("version");

        //测试获取 timestamp
        String timestamp = shadowJsonObj.getString("timestamp");

        LogUtil.print("shadowVersion:" + shadowVersion);
        //解析出desired
        JSONObject stateJsonObj = payloadJsonObj.getJSONObject("state");
        String desiredString = stateJsonObj.getString("desired");
        String reportedString = stateJsonObj.getString("reported");
        LogUtil.print("desiredString:" + desiredString);
        //清空shadow信息
        if (desiredString != null) {
            //TODO 根据desired信息做业务处理
            String language = JSON.parseObject(desiredString).getString("language");
            System.out.println("要换语言喽，呼吸机显示语言：" + language);
            //更新language信息到reported中
            if (language != null){
                String updateShadowReportdMsg = genUpdateShadowReportdMsg(reportedString, language);
                LogUtil.print("updateShadowReportdMsg:" + updateShadowReportdMsg);
                MqttMessage cleanShadowMqttMsg = new MqttMessage(updateShadowReportdMsg.getBytes("UTF-8"));
                message.setQos(1);
                sampleClient.publish(shadowUpdateTopic, cleanShadowMqttMsg);
                LogUtil.print("shadow reported msg update success");
            }
            //清空desired信息
            String cleanShadowMsg = genCleanShadowMsg(reportedString);
            LogUtil.print("cleanShadowMsg:" + cleanShadowMsg);
            MqttMessage cleanShadowMqttMsg = new MqttMessage(cleanShadowMsg.getBytes("UTF-8"));
            message.setQos(1);
            sampleClient.publish(shadowUpdateTopic, cleanShadowMqttMsg);
            LogUtil.print("send clean shadow msg done");
        }else {
            //没有desired信息 呼吸机显示reported状态
            if (reportedString != null){
                System.out.println("开机了，呼吸机显示上一次语言：" + JSON.parseObject(reportedString).getString("language"));

                 //测试 显示timestamp
                System.out.println("开机了，呼吸机显示上一次时间戳：" + timestamp);
            }
        }
    }

    /**
     * 删除影子某个属性
     * 只需要把属性value置为"null"即可
     *
     * @param attributeMap
     * @return
     */
    private static String genDeleteShadowMsg(Map<String, Object> attributeMap) {
        Set<String> attSet = attributeMap.keySet();
        Map<String, Object> attMap = new LinkedHashMap<String, Object>();
        for (String attKey : attSet) {
            attMap.put(attKey, attributeMap.get(attKey));
        }

        Map<String, Object> reportedMap = new LinkedHashMap<String, Object>();
        reportedMap.put("reported", attMap);

        Map<String, Object> shadowJsonMap = new LinkedHashMap<String, Object>();
        shadowJsonMap.put("method", "delete");
        shadowJsonMap.put("state", reportedMap);

        //shadow version自增
        shadowVersion++;

        shadowJsonMap.put("version", shadowVersion);

        return JSON.toJSONString(shadowJsonMap);
    }

    public static void main(String... strings) throws Exception {
        /* 客户端设备 自己的一个标记 */
        String clientId = productKey + "&" + deviceName;
        Map<String, String> params = new HashMap<String, String>(16);
        /** 这个是对应用户在控制台注册的 设备productkey */
        params.put("productKey", productKey);
        /** 这个是对应用户在控制台注册的 设备name */
        params.put("deviceName", deviceName);
        params.put("timestamp", "" + System.currentTimeMillis());
        params.put("clientId", clientId);
        //签名
        params.put("sign", SignUtil.sign(params, deviceSecret, "hmacMD5"));
        //请求资源 mqtt
        params.put("resources", "mqtt");
        String result = AliyunWebUtils.doPost(authUrl, params, 5000, 5000);
        LogUtil.print("result=[" + result + "]");
        JSONObject mapResult;
        try {
            mapResult = JSON.parseObject(result);
        } catch (Exception e) {
            System.out.println("https auth result is invalid json fmt");
            return;
        }
        if (RESULT_CODE_SUCCESS.equals(mapResult.getString(AUTH_RESULT_SUCCESS_KEY))) {
            LogUtil.print("认证成功！" + mapResult.get("data"));
            LogUtil.print("data=[" + mapResult + "]");
        } else {
            System.err.println("认证失败！");
            throw new RuntimeException(
                    "认证失败：" + mapResult.get("code") + "," + mapResult.get("message"));
        }
        JSONObject data = (JSONObject)mapResult.get("data");
        //sign TODO 服务器返回的sign签名 防止域名劫持验证
        //mqtt服务器 TODO
        String targetServer = "ssl://"
                + data.getJSONObject("resources").getJSONObject("mqtt")
                .getString("host")
                + ":" + data.getJSONObject("resources").getJSONObject("mqtt")
                .getString("port");
        String token = data.getString("iotToken");
        String iotId = data.getString("iotId");
        //客户端ID格式:
        /* 设备端自定义的标记，字符范围[0-9][a-z][A-Z] */
        String mqttClientId = clientId;
        /* 认证后得到的云端iotId */
        String mqttUsername = iotId;
        /* 认证后得到的token 有效期7天 */
        String mqttPassword = token;
        System.err.println("mqttclientId=" + mqttClientId);
        connectMqtt(targetServer, mqttClientId, mqttUsername, mqttPassword);
    }
    private static void connectMqtt(String url, String clientId, String mqttUsername,
                                    String mqttPassword) throws Exception {
        MemoryPersistence persistence = new MemoryPersistence();
        SSLSocketFactory socketFactory = createSSLSocket();
        final MqttClient sampleClient = new MqttClient(url, clientId, persistence);
        MqttConnectOptions connOpts = new MqttConnectOptions();
        /* MQTT 3.1.1 */
        connOpts.setMqttVersion(4);
        connOpts.setSocketFactory(socketFactory);
        //设置是否自动重连
        connOpts.setAutomaticReconnect(true);
        //如果是true 那么清理所有离线消息，即qos1 或者 2的所有未接收内容
        connOpts.setCleanSession(false);
        connOpts.setUserName(mqttUsername);
        connOpts.setPassword(mqttPassword.toCharArray());
        connOpts.setKeepAliveInterval(65);
        LogUtil.print(clientId + "进行连接, 目的地: " + url);
        //sampleClient.setManualAcks(true);//不要自动回执ack
        sampleClient.connect(connOpts);
        sampleClient.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable cause) {
                LogUtil.print("连接失败,原因:" + cause);
                cause.printStackTrace();
            }
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                LogUtil.print("接收到消息,来至Topic [" + topic + "] , 内容是:["
                        + new String(message.getPayload(), "UTF-8") + "],  ");
            }
            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {
                //如果是qos 0消息 token.resp是没有回复的
                LogUtil.print("消息发送成功! " + ((token == null || token.getResponse() == null) ? "null"
                        : token.getResponse().getKey()));
            }
        });
        LogUtil.print("连接成功:---");
        //订阅shadow topic
        sampleClient.subscribe(shadowAckTopic, new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                LogUtil.print("收到消息：" + message + ",topic=" + topic);
                JSONObject shadowJsonObj = JSON.parseObject(message.toString());
                String shadowMethod = shadowJsonObj.getString("method");
                JSONObject payloadJsonObj = shadowJsonObj.getJSONObject("payload");
                /* method是reply，解析成功还是失败*/
                if (SHADOW_METHOD_REPLY.equals(shadowMethod)) {
                    String status = payloadJsonObj.getString("status");
                    String stateInfo = payloadJsonObj.getString("state");
                    if (RESULT_STATUS_SUCCESS.equals(status)) {
                        if (stateInfo == null) {
                            System.out.println("update shadow success");
                        } else {
                            //解析出desired信息
                            parseDesiredMsg(message, sampleClient);
                        }
                    } else {
                        JSONObject errorJsonObj = payloadJsonObj.getJSONObject("content");
                        String errorCode = errorJsonObj.getString("errorcode");
                        String errorMsg = errorJsonObj.getString("errormessage");
                        //如果是影子没有内容，上报本次呼吸机状态
                        if (RESULT_CODE_NO_SHADOW.equals(errorCode)){
                            System.out.println("影子是空的，上报当前呼吸机状态！");
                            //更新设备影子
                            Map<String, Object> attMap = new HashMap<String, Object>(128);
                            attMap.put("language", "0");
                            String shadowUpdateMsg = genUpdateShadowMsg(attMap);
                            System.out.println("updateShadowMsg: " + shadowUpdateMsg);
                            MqttMessage shadowMessage = new MqttMessage(shadowUpdateMsg.getBytes("UTF-8"));
                            message.setQos(1);
                            sampleClient.publish(shadowUpdateTopic, shadowMessage);
                        }else {
                            System.out.println("errorCode:" + errorCode);
                            System.out.println("errorMsg:" + errorMsg);
                        }
                    }
                }
                /* method是control，解析出desired和version信息 */
                else if (SHADOW_METHOD_CONTROL.equals(shadowMethod)) {
                    parseDesiredMsg(message, sampleClient);
                }
            }
        });
        //获取影子内容，解析出version信息
        String getShadowInfo = "{\"method\": \"get\"}";
        MqttMessage shadowMessage = new MqttMessage(getShadowInfo.getBytes("UTF-8"));
        shadowMessage.setQos(1);
        sampleClient.publish(shadowUpdateTopic, shadowMessage);
        //等待获取到版本号
        Thread.sleep(1000);

//        //测试 更新设备影子 reported
//        Map<String, Object> attMap = new HashMap<String, Object>(128);
//
//        //my test
//        attMap.put("language", "0");
//        attMap.put("start_pressure","30");
//
//
//        String shadowUpdateMsg = genUpdateShadowMsg(attMap);
//        System.out.println("updateShadowMsg: " + shadowUpdateMsg);
//
//        MqttMessage message = new MqttMessage(shadowUpdateMsg.getBytes("UTF-8"));
//        message.setQos(1);
//        sampleClient.publish(shadowUpdateTopic, message);

//        //删除影子某个属性
//        Map<String, Object> deleteAttMap = new HashMap<String, Object>(128);
//
//        //把属性值设置为"null"
//        deleteAttMap.put("testATT", "null");
//
//        String deleteShadowMsg = genDeleteShadowMsg(deleteAttMap);
//        System.out.println("deleteShadowMsg: " + deleteShadowMsg);
//
//        MqttMessage deleteMessage = new MqttMessage(deleteShadowMsg.getBytes("UTF-8"));
//        deleteMessage.setQos(1);
//        sampleClient.publish(shadowUpdateTopic, deleteMessage);
    }
    private static SSLSocketFactory createSSLSocket() throws Exception {
        SSLContext context = SSLContext.getInstance("TLSV1.2");
        context.init(null, new TrustManager[] {new com.catt.hypnus.service.impl.iot.demo.iothub.ALiyunIotX509TrustManager()}, null);
        SSLSocketFactory socketFactory = context.getSocketFactory();
        return socketFactory;
    }
}
