package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.hypnus.repository.entity.userMgr.UserInfo;

import java.io.Serializable;

/**
 * @author lyz
 * @date 2018/4/3 22:17
 * @desc
 **/
public class RegisterParam implements Serializable
{
    private String deviceId;

    private UserInfo userInfo;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
