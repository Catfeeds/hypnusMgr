package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * apcp_event实体类
 * apap模式设置滴定压力事件
 * @author runtime
 * @version V1.0
 * @date 2018-03-18 12:15:47
 */
@Entity
@JsonAutoDetect
@Table(name = "APCP_EVENT")
public class ApcpEvent extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * apapdd_id
     * </pre>
     */
    private Long apapddId;
    /**
     * <pre>
     * device_id
     * </pre>
     */
    private String deviceId;
    /**
     * <pre>
     * starttime
     * </pre>
     */
    private String starttime;
    /**
     * <pre>
     * apap_inpressure
     * </pre>
     */
    private Long apapInpressure;
    /**
     * <pre>
     * apap_recordtime
     * </pre>
     */
    private Date apapRecordtime;

    @Column(name = "APAPDD_ID")
    public Long getApapddId() {
        return apapddId;
    }

    public void setApapddId(Long apapddId) {
        this.apapddId = apapddId;
    }

    @Column(name = "DEVICE_ID", length = 24)
    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Column(name = "STARTTIME", length = 19)
    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    @Column(name = "APAP_INPRESSURE")
    public Long getApapInpressure() {
        return apapInpressure;
    }

    public void setApapInpressure(Long apapInpressure) {
        this.apapInpressure = apapInpressure;
    }

    @Column(name = "APAP_RECORDTIME")
    public Date getApapRecordtime() {
        return apapRecordtime;
    }

    public void setApapRecordtime(Date apapRecordtime) {
        this.apapRecordtime = apapRecordtime;
    }

}

