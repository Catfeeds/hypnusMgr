package com.catt.hypnus.repository.form.deviceMgr;

import java.io.Serializable;
import java.util.Date;

/**
 * @author runtime
 * @date 2018/3/20 11:23
 * @desc
 **/
public class UsetimeForm implements Serializable
{
    private String deviceId;

    private String startTime;

    private Date endTime;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
