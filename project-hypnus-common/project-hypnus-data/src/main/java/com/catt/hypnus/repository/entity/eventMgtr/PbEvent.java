package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * pb_event实体类
 * 周期行呼吸事件记录
 * @author runtime
 * @date 2018-03-18 12:15:46
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "PB_EVENT")
public class PbEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * pb_id
	 * </pre>
	 */
	private Long pbId;
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
	 * pb_duration
	 * </pre>
	 */
	private Long pbDuration;
	/**
	 * <pre>
	 * pb_recordtime
	 * </pre>
	 */
	private Date pbRecordtime;

	@Column(name = "PB_ID")
	public Long getPbId() {
		return pbId;
	}

	public void setPbId(Long pbId) {
		this.pbId = pbId;
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

	@Column(name = "PB_DURATION")
	public Long getPbDuration() {
		return pbDuration;
	}

	public void setPbDuration(Long pbDuration) {
		this.pbDuration = pbDuration;
	}

	@Column(name = "PB_RECORDTIME")
	public Date getPbRecordtime() {
		return pbRecordtime;
	}

	public void setPbRecordtime(Date pbRecordtime) {
		this.pbRecordtime = pbRecordtime;
	}

}

