package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 厂家信息表实体类
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_FACTORY_INFO")
public class FactoryInfo extends BaseEntity {

	private static final long serialVersionUID = 1L;


	/**
	 * 厂家名称
	 */
	private String factoryName;
	/**
	 * 购买须知
	 */
	private String purchaseNotes;
	/**
	 * 删除标识<p><br>
	 * 1-是 2-否
	 */
	private Integer delFlag;
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
	/**
	 * 备注<p><br>
	 * 备注
	 */
	private String remark;

	@Column(name = "S_FACTORY_NAME", length = 128)
	public String getFactoryName() {
		return factoryName;
	}

	public void setFactoryName(String factoryName) {
		this.factoryName = factoryName;
	}

	@Column(name = "S_PURCHASE_NOTES")
	public String getPurchaseNotes() {
		return purchaseNotes;
	}

	public void setPurchaseNotes(String purchaseNotes) {
		this.purchaseNotes = purchaseNotes;
	}

	@Column(name = "I_DEL_FLAG")
	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
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

	@Column(name = "S_REMARK", length = 1024)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}

