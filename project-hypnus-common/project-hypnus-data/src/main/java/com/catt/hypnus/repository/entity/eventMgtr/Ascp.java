package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * ascp实体类
 * AUTO-S滴定压力设置事件记录
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "ASCP")
public class Ascp extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * ascp_id
	 * </pre>
	 */
	private Long ascpId;
	/**
	 * <pre>
	 * starttime
	 * </pre>
	 */
	private String starttime;
	/**
	 * <pre>
	 * device_id
	 * </pre>
	 */
	private String deviceId;
	/**
	 * <pre>
	 * ascp_inpresure
	 * </pre>
	 */
	private Integer ascpInpresure;
	/**
	 * <pre>
	 * ascp_expressure
	 * </pre>
	 */
	private Integer ascpExpressure;
	/**
	 * <pre>
	 * ascp_recordtime
	 * </pre>
	 */
	private Date ascpRecordtime;

	@Column(name = "ASCP_ID")
	public Long getAscpId() {
		return ascpId;
	}

	public void setAscpId(Long ascpId) {
		this.ascpId = ascpId;
	}

	@Column(name = "STARTTIME", length = 19)
	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	@Column(name = "DEVICE_ID", length = 24)
	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	@Column(name = "ASCP_INPRESURE")
	public Integer getAscpInpresure() {
		return ascpInpresure;
	}

	public void setAscpInpresure(Integer ascpInpresure) {
		this.ascpInpresure = ascpInpresure;
	}

	@Column(name = "ASCP_EXPRESSURE")
	public Integer getAscpExpressure() {
		return ascpExpressure;
	}

	public void setAscpExpressure(Integer ascpExpressure) {
		this.ascpExpressure = ascpExpressure;
	}

	@Column(name = "ASCP_RECORDTIME")
	public Date getAscpRecordtime() {
		return ascpRecordtime;
	}

	public void setAscpRecordtime(Date ascpRecordtime) {
		this.ascpRecordtime = ascpRecordtime;
	}

}

