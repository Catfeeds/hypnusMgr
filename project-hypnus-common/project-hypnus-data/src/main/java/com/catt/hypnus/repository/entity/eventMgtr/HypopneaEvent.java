package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * hypopnea_event实体类
 * 低通气事件记录
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "HYPOPNEA_EVENT")
public class HypopneaEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * hypopnea_id
	 * </pre>
	 */
	private Long hypopneaId;
	/**
	 * <pre>
	 * starttime
	 * 开始时间
	 * </pre>
	 */
	private String starttime;
	/**
	 * <pre>
	 * device_id
	 * 设备标识
	 * </pre>
	 */
	private String deviceId;
	/**
	 * <pre>
	 * hypopnea_duration
	 * 持续时间
	 * </pre>
	 */
	private Long hypopneaDuration;
	/**
	 * <pre>
	 * hypopnea_recordtime
	 * 记录时间
	 * </pre>
	 */
	private Date hypopneaRecordtime;

	@Column(name = "HYPOPNEA_ID")
	public Long getHypopneaId() {
		return hypopneaId;
	}

	public void setHypopneaId(Long hypopneaId) {
		this.hypopneaId = hypopneaId;
	}

	@Column(name = "STARTTIME", length = 19)
	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	@Column(name = "DEVICE_ID", length = 32)
	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	@Column(name = "HYPOPNEA_DURATION")
	public Long getHypopneaDuration() {
		return hypopneaDuration;
	}

	public void setHypopneaDuration(Long hypopneaDuration) {
		this.hypopneaDuration = hypopneaDuration;
	}

	@Column(name = "HYPOPNEA_RECORDTIME")
	public Date getHypopneaRecordtime() {
		return hypopneaRecordtime;
	}

	public void setHypopneaRecordtime(Date hypopneaRecordtime) {
		this.hypopneaRecordtime = hypopneaRecordtime;
	}

}

