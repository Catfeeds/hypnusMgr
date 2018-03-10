package com.catt.hypnus.repository.form.orderMgr;

import java.io.Serializable;
import java.util.Date;

/**
 * Description:订单from
 * Created by 2017-02-22  10:22.
 * author: Zhou mingxiang
 */
public class CusOrderFrom implements Serializable {

    public static final Integer ORDER_TYPE_COMMON = 1; //普通订单
    public static final Integer ORDER_TYPE_AGENT = 2;   //代理订单

    /**
     * 订单编号
     */
    private String orderCode;
    /**
     * 购买用户
     */
    private String buyUser;
    /**
     * 开始时间
     */
    private Date startTime;
    /**
     * 结束时间
     */
    private Date endTime;
    /**
     * 状态
     */
    private Integer status;
    /**
     * 购买用户ID
     */
    private Long cusId;

    /**
     * 订单类型
     */
    private Integer orderType;

    /**
     * 店主标识
     */
    private Long shopkeeperId;
    /**
     * 店主名称
     */
    private String shopKeeperName;

    /**
     * 厂家标识
     */
    private Long factoryId;

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public String getBuyUser() {
        return buyUser;
    }

    public void setBuyUser(String buyUser) {
        this.buyUser = buyUser;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    public Long getShopkeeperId() {
        return shopkeeperId;
    }

    public void setShopkeeperId(Long shopkeeperId) {
        this.shopkeeperId = shopkeeperId;
    }

    public String getShopKeeperName() {
        return shopKeeperName;
    }

    public void setShopKeeperName(String shopKeeperName) {
        this.shopKeeperName = shopKeeperName;
    }

    public Long getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Long factoryId) {
        this.factoryId = factoryId;
    }
}
