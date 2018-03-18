package com.catt.hypnus.repository.form.deviceMgr;

import java.io.Serializable;

/**
 * @author lyz
 * @date 2018/3/18 11:23
 * @desc
 **/
public class DeviceForm implements Serializable
{
    private String snId;

    private String factoryMobile;

    private String userMobile;

    public String getSnId() {
        return snId;
    }

    public void setSnId(String snId) {
        this.snId = snId;
    }

    public String getFactoryMobile() {
        return factoryMobile;
    }

    public void setFactoryMobile(String factoryMobile) {
        this.factoryMobile = factoryMobile;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }
}
