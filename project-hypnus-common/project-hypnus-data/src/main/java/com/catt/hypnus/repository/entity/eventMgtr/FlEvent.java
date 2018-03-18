package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * fl_event实体类
 * 气流受限事件记录
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "FL_EVENT")
public class FlEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * fl_id
	 * </pre>
	 */
	private Long flId;
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
	 * fl_duration
	 * </pre>
	 */
	private Long flDuration;
	/**
	 * <pre>
	 * fl_recordtime
	 * </pre>
	 */
	private Date flRecordtime;

	@Column(name = "FL_ID")
	public Long getFlId() {
		return flId;
	}

	public void setFlId(Long flId) {
		this.flId = flId;
	}

	@Column(name = "DEVICE_ID", length = 32)
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

	@Column(name = "FL_DURATION")
	public Long getFlDuration() {
		return flDuration;
	}

	public void setFlDuration(Long flDuration) {
		this.flDuration = flDuration;
	}

	@Column(name = "FL_RECORDTIME")
	public Date getFlRecordtime() {
		return flRecordtime;
	}

	public void setFlRecordtime(Date flRecordtime) {
		this.flRecordtime = flRecordtime;
	}

}

