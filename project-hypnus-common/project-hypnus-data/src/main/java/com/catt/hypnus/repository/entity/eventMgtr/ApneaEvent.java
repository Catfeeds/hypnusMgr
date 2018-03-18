package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * apnea_event实体类
 * 记录睡眠呼吸暂停事件
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "APNEA_EVENT")
public class ApneaEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * apnea_id
	 * </pre>
	 */
	private Long apneaId;
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
	 * apnea_duration
	 * </pre>
	 */
	private Long apneaDuration;
	/**
	 * <pre>
	 * apnea_recordtime
	 * </pre>
	 */
	private Date apneaRecordtime;

	@Column(name = "APNEA_ID")
	public Long getApneaId() {
		return apneaId;
	}

	public void setApneaId(Long apneaId) {
		this.apneaId = apneaId;
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

	@Column(name = "APNEA_DURATION")
	public Long getApneaDuration() {
		return apneaDuration;
	}

	public void setApneaDuration(Long apneaDuration) {
		this.apneaDuration = apneaDuration;
	}

	@Column(name = "APNEA_RECORDTIME")
	public Date getApneaRecordtime() {
		return apneaRecordtime;
	}

	public void setApneaRecordtime(Date apneaRecordtime) {
		this.apneaRecordtime = apneaRecordtime;
	}

}

