package com.catt.hypnus.repository.form.couponMgr;

import java.io.Serializable;
import java.util.Date;

/**
 * Description:代金券领取记录From
 * Created by 2017-03-07  15:32.
 * author: Zhou mingxiang
 */
public class CouponCusFrom implements Serializable {

    /**
     * 代金券名称
     */
    private String couponName;

    /**
     * 领取用户
     */
    private String cusName;

    /**
     * 会员手机号
     */
    private String mobile;

    /**
     * 开始时间
     */
    private Date startTime;
    /**
     * 结束时间
     */
    private Date endTime;

    /**
     * 是否使用
     */
    private Integer isUse;

    public String getCouponName() {
        return couponName;
    }

    public void setCouponName(String couponName) {
        this.couponName = couponName;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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

    public Integer getIsUse() {
        return isUse;
    }

    public void setIsUse(Integer isUse) {
        this.isUse = isUse;
    }
}
