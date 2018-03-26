package com.catt.hypnus.web.controller.admin.authCode;

import com.catt.hypnus.web.controller.admin.exception.AuthCodeException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/26 20:03
 * @Desc:
 **/
public class AuthCode
{
    private String mobile;

    private String authCode;

    private LocalDateTime sendTime;

    public AuthCode(){};

    private final static int DEFAULT_SECOND = 60;

    private final static int DEFAULT_EXPIRE_MINUTE = 10;

    //判断还隔多少秒可以重发
    public Integer countSurplusTime(){
        Long second =   (Duration.between(this.sendTime,LocalDateTime.now()).toMillis())/1000;
        Integer reSecond = DEFAULT_SECOND - second.intValue();
        return reSecond;
    }

    //判断验证码是否过期，true为已过期
    public void validateCodeExpire(){
        Long second =   Duration.between(this.sendTime,LocalDateTime.now()).toMinutes();
        if(second.intValue()>DEFAULT_EXPIRE_MINUTE){
            throw new AuthCodeException("验证码已经失效！");
        }
    }

    public void validateRightfulForCode(String code){
        if(!Objects.equals(this.authCode,code)){
            throw new AuthCodeException("手机号码跟验证码不匹配！");
        }
    }

    public AuthCode(String mobile,String authCode){
        this.mobile = mobile;
        this.authCode = authCode;
        this.sendTime = LocalDateTime.now();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
