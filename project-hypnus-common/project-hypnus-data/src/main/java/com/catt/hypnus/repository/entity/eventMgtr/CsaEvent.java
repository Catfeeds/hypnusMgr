package com.catt.hypnus.repository.entity.eventMgtr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * csa_event实体类
 * 中枢性呼吸暂停事件记录
 * @author runtime
 * @date 2018-03-18 12:15:47
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "CSA_EVENT")
public class CsaEvent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * <pre>
	 * csa_id
	 * </pre>
	 */
	private Long csaId;
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
	 * csa_duration
	 * </pre>
	 */
	private Long csaDuration;
	/**
	 * <pre>
	 * csa_recordtime
	 * </pre>
	 */
	private Date csaRecordtime;

	@Column(name = "CSA_ID")
	public Long getCsaId() {
		return csaId;
	}

	public void setCsaId(Long csaId) {
		this.csaId = csaId;
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

	@Column(name = "CSA_DURATION")
	public Long getCsaDuration() {
		return csaDuration;
	}

	public void setCsaDuration(Long csaDuration) {
		this.csaDuration = csaDuration;
	}

	@Column(name = "CSA_RECORDTIME")
	public Date getCsaRecordtime() {
		return csaRecordtime;
	}

	public void setCsaRecordtime(Date csaRecordtime) {
		this.csaRecordtime = csaRecordtime;
	}

}

