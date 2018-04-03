package com.catt.hypnus.web.controller.admin.authCode.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Random;

/**
 * @Author:lyz
 * @Date: 2018/3/26 20:19
 * @Desc:
 **/
@Service(value="smsService")
public class SmsService
{
    public String smsAuthCode(String phone) {
        String msg = "短信验证码:"+buildRandomString()+",10分钟内有效,请勿泄露";
        String uriString = UriComponentsBuilder.fromUriString(SMS_URL).buildAndExpand(msg,phone).toUriString();
        String result = restTemplate.getForObject(uriString,String.class);
        String[] codeArray = result.split(",");
        if(!codeArray[0].equals("0")){
            throw new RuntimeException("发送验证码失败,原因为:"+codeArray[1]);
        }
        return msg;
    }

    private String buildRandomString(){
        String base = "1234567890";
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        for(int i=0;i< 6;i++){
            int number = random.nextInt(base.length());
            buffer.append(base.charAt(number));
        }
        return buffer.toString();
    }

    private static final String SMS_URL = "http://web.1xinxi.cn/asmx/smsservice.aspx?name=zebinliu&pwd=1B059A436F66327DB90801D7BA94&content={msg}&mobile={mobile}&sign=和普乐&type=pt";
    @Autowired
    private RestTemplate restTemplate;
}
