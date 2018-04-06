package com.catt.hypnus.repository.entity.deviceMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 绑定设备日志表实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-17 12:45:04
 */
@Entity
@JsonAutoDetect
@Table(name = "BIND_LOG_INFO")
public class BindLogInfo extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * 用户标识
     * 普通用户，经销商
     * </pre>
     */
    private Long userId;
    /**
     * <pre>
     * 设备标识
     * </pre>
     */
    private String deviceId;
    /**
     * <pre>
     * 类型
     * 绑定类型：1-普通用户2-经销商用户
     * </pre>
     */
    private Integer type;
    /**
     * <pre>
     * 状态
     * 绑定状态：1-绑定2-解绑
     * </pre>
     */
    private Integer status;
    /**
     * <pre>
     * 解绑时间
     * </pre>
     */
    private Date unbindDate;

    public BindLogInfo(){

    }

    public BindLogInfo(Long userId,String deviceId){
        this.userId = userId;
        this.deviceId = deviceId;
    }

    public static BindLogInfo buildBindUserLog(Long userId,String deviceId){
        BindLogInfo info = new BindLogInfo(userId,deviceId);
        info.setStatus(1);
        info.setType(1);
        return info;
    }
    public static BindLogInfo buildBindFactoryLog(Long userId,String deviceId){
        BindLogInfo info = new BindLogInfo(userId,deviceId);
        info.setStatus(1);
        info.setType(2);
        return info;
    }
    public static BindLogInfo buildUnBindUserLog(Long userId,String deviceId){
        BindLogInfo info = new BindLogInfo(userId,deviceId);
        info.setStatus(2);
        info.setType(1);
        info.setUnbindDate(new Date());
        return info;
    }
    public static BindLogInfo buildUnBindFactoryLog(Long userId,String deviceId){
        BindLogInfo info = new BindLogInfo(userId,deviceId);
        info.setType(2);
        info.setStatus(2);
        info.setUnbindDate(new Date());
        return info;
    }

    @Column(name = "USER_ID")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Column(name = "DEVICE_ID")
    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Column(name = "TYPE")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Column(name = "STATUS")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Column(name = "D_UNBIND_DATE")
    public Date getUnbindDate() {
        return unbindDate;
    }

    public void setUnbindDate(Date unbindDate) {
        this.unbindDate = unbindDate;
    }

}

