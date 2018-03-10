package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

/**
 * 代理商申请表实体类
 * 
 * @author chen chusheng
 * @date 2017-06-14 10:32:49
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "t_agent_info")
public class AgentInfo extends BaseEntity {

	private static final long serialVersionUID = 1L;

	//审核状态
	public static final Integer audit_wait = 1;//待审核
	public static final Integer audit_pass = 2;//审核通过
	public static final Integer audit_fail = 3;//审核不通过

	//代理商级别
	public static final int agency_total = 1;//总代理
	public static final int agency_province = 2;//省级代理
	public static final int agency_city = 3;//市级代理
	public static final int agency_region = 4;//区级代理

	/**
	 * 代理商级别<p><br>
	 *  1-总代理 2-省级代理 3-市级代理 4-区级代理
	 */
	private Integer agencyLevel;
	/**
	 * 状态<p><br>
	 * 1-待审核 2-通过 3-不通过
	 */
	private Integer status;
	/**
	 * 用户标识
	 */
	private Long cusId;
	/**
	 * 代理商地区
	 */
	private String site;
	/**
	 * 申请时间
	 */
	private Date applyTime;
	/**
	 * 审核时间
	 */
	private Date auditTime;
	/**
	 * 审核人
	 */
	private Long auditStaffId;
	/**
	 * 所属省份编码
	 */
	private String provinceId;
	/**
	 * 所属省份名称
	 */
	private String provinceName;
	/**
	 * 所属城市编码
	 */
	private String cityId;
	/**
	 * 所属城市名称
	 */
	private String cityName;
	/**
	 * 所属区/县编码
	 */
	private String regionId;
	/**
	 * 所属区/县名称
	 */
	private String regionName;
	/**
	 * 原因
	 */
	private String cause;

	/**
	 * 申请备注
	 */
	private String applyRemark;

	//枚举翻译
	private String agencyLevelName;
	private String statusName;

	@Column(name = "i_agency_level")
	public Integer getAgencyLevel() {
		return agencyLevel;
	}

	public void setAgencyLevel(Integer agencyLevel) {
		this.agencyLevel = agencyLevel;
	}

	@Column(name = "i_status")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "i_cus_id")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "s_site", length = 128)
	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	@Column(name = "d_apply_time")
	public Date getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}

	@Column(name = "d_audit_time")
	public Date getAuditTime() {
		return auditTime;
	}

	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
	}

	@Column(name = "i_audit_staff_id")
	public Long getAuditStaffId() {
		return auditStaffId;
	}

	public void setAuditStaffId(Long auditStaffId) {
		this.auditStaffId = auditStaffId;
	}

	@Column(name = "s_province_id", length = 32)
	public String getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}

	@Column(name = "s_province_name", length = 128)
	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	@Column(name = "s_city_id", length = 32)
	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	@Column(name = "s_city_name", length = 128)
	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	@Column(name = "s_region_id", length = 32)
	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	@Column(name = "s_region_name", length = 128)
	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	@Column(name = "s_cause", length = 128)
	public String getCause() {
		return cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	@Transient
	public String getAgencyLevelName() {
		return agencyLevelName;
	}

	public void setAgencyLevelName(String agencyLevelName) {
		this.agencyLevelName = agencyLevelName;
	}

	@Transient
	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	@Column(name = "S_APPLY_REMARK")
	public String getApplyRemark() {
		return applyRemark;
	}

	public void setApplyRemark(String applyRemark) {
		this.applyRemark = applyRemark;
	}
}

