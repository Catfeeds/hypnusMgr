package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户团队关联表实体类
 * 
 * @author 袁幸成
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_ALLOT_REL")
public class CusAllotRel extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 团队标识
	 */
	private Long teamId;
	/**
	 * 店主标识
	 */
	private Long cusId;
	/**
	 * 创建人员标识<p><br>
	 * 创建人员标识
	 */
	private Long createdId;
	/**
	 * 创建人员名称<p><br>
	 * 创建人员名称
	 */
	private String createdName;

	@Column(name = "I_TEAM_ID")
	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	@Column(name = "I_CUS_ID")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "I_CREATED_ID")
	public Long getCreatedId() {
		return createdId;
	}

	public void setCreatedId(Long createdId) {
		this.createdId = createdId;
	}

	@Column(name = "S_CREATED_NAME", length = 32)
	public String getCreatedName() {
		return createdName;
	}

	public void setCreatedName(String createdName) {
		this.createdName = createdName;
	}

}

