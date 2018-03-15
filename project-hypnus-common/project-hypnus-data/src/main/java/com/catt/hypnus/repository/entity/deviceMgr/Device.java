package com.catt.hypnus.repository.entity.deviceMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 设备表实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-14 20:05:38
 */
@Entity
@JsonAutoDetect
@Table(name = "device_info")
public class Device extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * 设备标识
     * device_id
     * </pre>
     */
    private String deviceId;
    /**
     * <pre>
     * 设备序列号
     * sn_id
     * </pre>
     */
    private String snId;
    /**
     * <pre>
     * 设备型号
     * model
     * </pre>
     */
    private String model;
    /**
     * <pre>
     * 生产日期
     * productDate
     *
     * </pre>
     */
    private Date productdate;
    /**
     * <pre>
     * 经销商标识
     * </pre>
     */
    private Long factoryId;
    /**
     * <pre>
     * 用户标识
     * </pre>
     */
    private Long cusId;

    @Column(name = "DEVICE_ID", length = 32)
    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Column(name = "SN_ID", length = 16)
    public String getSnId() {
        return snId;
    }

    public void setSnId(String snId) {
        this.snId = snId;
    }

    @Column(name = "MODEL", length = 16)
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }


    public Date getProductdate() {
        return productdate;
    }

    public void setProductdate(Date productdate) {
        this.productdate = productdate;
    }

    @Column(name = "FACTORY_ID", length = 32)
    public Long getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Long factoryId) {
        this.factoryId = factoryId;
    }

    @Column(name = "CUS_ID", length = 32)
    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

}

