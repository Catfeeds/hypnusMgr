package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 收货地址实体类
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_CONTACT")
public class CusContact extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 用户标识
	 */
	private Long cusId;
	/**
	 * 收货人
	 */
	private String recipients;
	/**
	 * 联系电话
	 */
	private String tel;
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
	 * 详细地址
	 */
	private String address;
	/**
	 * 是否默认<p><br>
	 * 1-是，2-否
	 */
	private Integer isDefault;
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

	@Column(name = "I_CUS_ID")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "S_RECIPIENTS", length = 64)
	public String getRecipients() {
		return recipients;
	}

	public void setRecipients(String recipients) {
		this.recipients = recipients;
	}

	@Column(name = "S_TEL", length = 64)
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@Column(name = "S_PROVINCE_ID", length = 32)
	public String getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}

	@Column(name = "S_PROVINCE_NAME", length = 128)
	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	@Column(name = "S_CITY_ID", length = 32)
	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	@Column(name = "S_CITY_NAME", length = 128)
	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	@Column(name = "S_REGION_ID", length = 32)
	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	@Column(name = "S_REGION_NAME", length = 128)
	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	@Column(name = "S_ADDRESS", length = 256)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "I_IS_DEFAULT")
	public Integer getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Integer isDefault) {
		this.isDefault = isDefault;
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

