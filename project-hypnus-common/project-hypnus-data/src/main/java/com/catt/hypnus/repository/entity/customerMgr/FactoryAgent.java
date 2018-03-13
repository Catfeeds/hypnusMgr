package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 代理商信息实体类
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_FACTORY_AGENT")
public class FactoryAgent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 厂家标识
	 */
	private Long factoryId;
	/**
	 * 代理商名称
	 */
	private String agentName;
	/**
	 * 代理商级别<p><br>
	 * 1-总代 2-区代 3-省代 4-市代
	 */
	private Integer level;
	/**
	 * 公众号id
	 */
	private String appid;
	/**
	 * 创建人员标识<p><br>
	 * 创建人员标识
	 */
	private Date createdId;
	/**
	 * 创建人员名称<p><br>
	 * 创建人员名称
	 */
	private String createdName;
	/**
	 * 备注<p><br>
	 * 备注
	 */
	private String remark;

	@Column(name = "I_FACTORY_ID")
	public Long getFactoryId() {
		return factoryId;
	}

	public void setFactoryId(Long factoryId) {
		this.factoryId = factoryId;
	}

	@Column(name = "S_AGENT_NAME", length = 128)
	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	@Column(name = "I_LEVEL")
	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	@Column(name = "S_APPID", length = 128)
	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	@Column(name = "I_CREATED_ID")
	public Date getCreatedId() {
		return createdId;
	}

	public void setCreatedId(Date createdId) {
		this.createdId = createdId;
	}

	@Column(name = "S_CREATED_NAME", length = 32)
	public String getCreatedName() {
		return createdName;
	}

	public void setCreatedName(String createdName) {
		this.createdName = createdName;
	}

	@Column(name = "S_REMARK", length = 1024)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}

