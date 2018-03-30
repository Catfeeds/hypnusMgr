package com.catt.hypnus.web.controller.admin.authCode.service;

import org.springframework.stereotype.Service;

/**
 * @Author:lyz
 * @Date: 2018/3/26 20:19
 * @Desc:
 **/
@Service(value="smsService")
public class SmsService
{
    public String smsAuthCode(String phone) {
        return "123456";
    }
}
