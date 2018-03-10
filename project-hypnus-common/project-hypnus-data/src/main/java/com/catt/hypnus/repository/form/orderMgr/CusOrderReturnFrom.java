package com.catt.hypnus.repository.form.orderMgr;

import java.io.Serializable;
import java.util.Date;

/**
 * Description:退货from
 * Created by 2017-02-23  8:55.
 * author: Zhou mingxiang
 */
public class CusOrderReturnFrom implements Serializable {

    /**
     * 退款用户
     */
    private String returnUser;
    /**
     * 状态
     */
    private Integer status;
    /**
     * 退货时间---开始时间
     */
    private Date startTime;
    /**
     * 退货时间---结束时间
     */
    private Date endTime;

    /**
     * 厂家标识
     */
    private Long factoryId;

    public String getReturnUser() {
        return returnUser;
    }

    public void setReturnUser(String returnUser) {
        this.returnUser = returnUser;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Long getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Long factoryId) {
        this.factoryId = factoryId;
    }
}
