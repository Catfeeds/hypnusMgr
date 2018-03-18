package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * leak_event实体类
 * 漏气事件记录
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "LEAK_EVENT")
public class LeakEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * leak_id
	 * </pre>
	 */
	private Long leakId;
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
	 * volume_leak
	 * </pre>
	 */
	private Integer volumeLeak;
	/**
	 * <pre>
	 * leak_duration
	 * </pre>
	 */
	private Long leakDuration;
	/**
	 * <pre>
	 * leak_recordtime
	 * </pre>
	 */
	private Date leakRecordtime;

	@Column(name = "LEAK_ID")
	public Long getLeakId() {
		return leakId;
	}

	public void setLeakId(Long leakId) {
		this.leakId = leakId;
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

	@Column(name = "VOLUME_LEAK")
	public Integer getVolumeLeak() {
		return volumeLeak;
	}

	public void setVolumeLeak(Integer volumeLeak) {
		this.volumeLeak = volumeLeak;
	}

	@Column(name = "LEAK_DURATION")
	public Long getLeakDuration() {
		return leakDuration;
	}

	public void setLeakDuration(Long leakDuration) {
		this.leakDuration = leakDuration;
	}

	@Column(name = "LEAK_RECORDTIME")
	public Date getLeakRecordtime() {
		return leakRecordtime;
	}

	public void setLeakRecordtime(Date leakRecordtime) {
		this.leakRecordtime = leakRecordtime;
	}

}

