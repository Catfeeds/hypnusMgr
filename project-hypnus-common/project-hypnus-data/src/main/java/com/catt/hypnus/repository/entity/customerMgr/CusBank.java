package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 银行卡绑定实体类
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_BANK")
public class CusBank extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 用户标识
	 */
	private Long cusId;
	/**
	 * 开户银行<p><br>
	 * 将常用银行定义为枚举
	 */
	private Integer bankType;
	/**
	 * 开户支行<p><br>
	 * 需进行可逆加密
	 */
	private String branch;
	/**
	 * 账户名称<p><br>
	 * 需进行可逆加密
	 */
	private String bankAccount;
	/**
	 * 银行卡号<p><br>
	 * 需进行可逆加密
	 */
	private String bankCard;
	/**
	 * 开户银行卡省份名称
	 */
	private String provinceName;
	/**
	 * 开户银行卡城市名称
	 */
	private String cityName;
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

	@Column(name = "I_CUS_ID")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "I_BANK_TYPE")
	public Integer getBankType() {
		return bankType;
	}

	public void setBankType(Integer bankType) {
		this.bankType = bankType;
	}

	@Column(name = "S_BRANCH", length = 256)
	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	@Column(name = "S_BANK_ACCOUNT", length = 128)
	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	@Column(name = "S_BANK_CARD", length = 128)
	public String getBankCard() {
		return bankCard;
	}

	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}

	@Column(name = "S_PROVINCE_NAME", length = 128)
	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	@Column(name = "S_CITY_NAME", length = 128)
	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
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

