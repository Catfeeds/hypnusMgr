package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseUserEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户信息实体类
 * 
 * @author runtime
 * @date 2017-02-10 09:47:36
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_INFO")
public class CusInfo extends BaseUserEntity {
	/**
	 * 用于从附件表获取附件
	 */
	public static final String TABLE_NAME = "T_CUS_INFO";
	public static final String PHOTO = "S_PHOTO";
	private static final long serialVersionUID = 1L;
	
	/**
	 * 用户密码<p><br>
	 * MD5加密
	 */
	private String pwd;
	/**
	 * 支付密码<p><br>
	 * 系统设定支付密码，md5加密保存
	 */
	private String payPwd;
	/**
	 * 手机号码
	 */
	private String mobile;
	/**
	 * 用户类型<p><br>
	 * 10-注册用户<br>1-店主<br>2-主管<br>3-主管&店主<br>4-总代<br>5-区代<br>6-省代<br>7-市代
	 */
	private Integer type;
	/**
	 * 用户状态<p><br>
	 * 1-正常<br>2-冻结
	 */
	private Integer status;
	/**
	 * 用户级别<p><br>
	 * 1-一级<br>2-二级<br>3-三级
	 */
	private Integer level;
	/**
	 * 用户头像<p><br>
	 * 附件表关联字段标识，值固定为空
	 */
	private String photo;
	/**
	 * 微信标识
	 */
	private String weixId;
	/**
	 * 用户昵称
	 */
	private String nickname;
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
	 * 删除标识<p><br>
	 * 1-是<br>2-否
	 */
	private Integer delFlag;
	/**
	 * 邀请码
	 */
	private String invitationNo;
	/**
	 * 邀请用户<p><br>
	 * 邀请这个用户的标识
	 */
	private Long invitationId;
//	/**
//	 * 是否结算同步<p><br>
//	 * 1-否<br>2-是
//	 */
//	private Integer settlementSyn;
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

	/**
	 * 邀请全路径
	 */
	private String invitationPath;

	@Column(name = "S_PWD", length = 128)
	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	@Column(name = "S_PAY_PWD", length = 128)
	public String getPayPwd() {
		return payPwd;
	}

	public void setPayPwd(String payPwd) {
		this.payPwd = payPwd;
	}

	@Column(name = "S_MOBILE", length = 64)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "I_TYPE")
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Column(name = "I_STATUS")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "I_LEVEL")
	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	@Column(name = "S_PHOTO", length = 128)
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@Column(name = "I_WEIX_ID", length = 128)
	public String getWeixId() {
		return weixId;
	}

	public void setWeixId(String weixId) {
		this.weixId = weixId;
	}

	@Column(name = "S_NICKNAME", length = 128)
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
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

	@Column(name = "I_DEL_FLAG")
	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}

	@Column(name = "S_INVITATION_NO", length = 128)
	public String getInvitationNo() {
		return invitationNo;
	}

	public void setInvitationNo(String invitationNo) {
		this.invitationNo = invitationNo;
	}

	@Column(name = "I_INVITATION_ID")
	public Long getInvitationId() {
		return invitationId;
	}

	public void setInvitationId(Long invitationId) {
		this.invitationId = invitationId;
	}

//	@Column(name = "I_SETTLEMENT_SYN")
//	public Integer getSettlementSyn() {
//		return settlementSyn;
//	}
//
//	public void setSettlementSyn(Integer settlementSyn) {
//		this.settlementSyn = settlementSyn;
//	}

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

	@Column(name = "S_INVITATION_PATH", length = 4000)
	public String getInvitationPath() {
		return invitationPath;
	}

	public void setInvitationPath(String invitationPath) {
		this.invitationPath = invitationPath;
	}

	/**
	 * 用户类型枚举
	 */
	public enum Type {

		/**
		 * 注册用户
		 */
		RegistUser(10, "注册用户"),


		/**
		 * 店主
		 */
		ShopOwner (1, "店主"),
		/**
		 * 主管
		 */
		Director(2, "主管"),
		/**
		 * 主管&店主
		 */
//		ShopOwnerAndDirector(3, "主管&店主"),
		/**
		 * 总代
		 */
		TotalAgent (4, "总代"),
		/**
		 * 区代
		 */
		AreaAgent (5, "区代"),
		/**
		 * 省代
		 */
		ProvinceAgent(6, "省代"),
		/**
		 * 市代
		 */
		CityAgent(7, "市代");

		/**
		 * 枚举值
		 */
		private Integer value;

		/**
		 * 枚举中文
		 */
		private String name;

		/**
		 * 构造方法
		 *
		 * @param value 枚举值
		 * @param name  枚举中文
		 */
		Type(Integer value, String name) {
			this.value = value;
			this.name = name;
		}

		/**
		 * 由数字得是否多实例枚举对象
		 *
		 * @param value 枚举值
		 * @return 返回中文
		 */
		public static Type getEnum(int value) {
			Type[] source = Type.values();
			for (int i = 0; i < source.length; i++) {
				if (source[i].getValue() == value) {
					return source[i];
				}
			}
			return null;
		}

		/**
		 * 取值
		 *
		 * @return 返回枚举值
		 */
		public int getValue() {
			return this.value;
		}

		/**
		 * 取中文名称
		 *
		 * @return 返回枚举中文
		 */
		public String getName() {
			return this.name;
		}

	}

	/**
	 * 用户状态类型枚举
	 * 1-正常 2-冻结
	 */
	public enum Status {
		NORMALUSE(1, "正常"),
		DISABLE(2, "冻结");

		private Integer value;
		private String name;

		Status(Integer value, String name) {
			this.value = value;
			this.name = name;
		}
		/**
		 * 由数字得是否多实例枚举对象
		 *
		 * @param value 枚举值
		 * @return 返回中文
		 */
		public static Status getEnum(int value) {
			Status[] source = Status.values();
			for (int i = 0; i < source.length; i++) {
				if (source[i].getValue() == value) {
					return source[i];
				}
			}
			return null;
			//throw new Exception("枚举:\" + value + \"不支持。");

		}


		public Integer getValue() {
			return value;
		}

		public void setValue(Integer value) {
			this.value = value;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}
}

