package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * csr_event实体类
 * 陈-施呼吸事件记录
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "CSR_EVENT")
public class CsrEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * csr_id
	 * </pre>
	 */
	private Long csrId;
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
	 * csr_duration
	 * </pre>
	 */
	private Long csrDuration;
	/**
	 * <pre>
	 * csr_recordtime
	 * </pre>
	 */
	private Date csrRecordtime;

	@Column(name = "CSR_ID")
	public Long getCsrId() {
		return csrId;
	}

	public void setCsrId(Long csrId) {
		this.csrId = csrId;
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

	@Column(name = "CSR_DURATION")
	public Long getCsrDuration() {
		return csrDuration;
	}

	public void setCsrDuration(Long csrDuration) {
		this.csrDuration = csrDuration;
	}

	@Column(name = "CSR_RECORDTIME")
	public Date getCsrRecordtime() {
		return csrRecordtime;
	}

	public void setCsrRecordtime(Date csrRecordtime) {
		this.csrRecordtime = csrRecordtime;
	}

}

