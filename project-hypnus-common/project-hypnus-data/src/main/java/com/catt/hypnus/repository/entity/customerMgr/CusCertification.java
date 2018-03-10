package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户实名认证实体类
 * 
 * @author chen chusheng
 * @date 2017-03-08 15:56:06
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "t_cus_certification")
public class CusCertification extends BaseEntity {

	private static final long serialVersionUID = 1L;

	public static final String TABLE_NAME = "T_CUS_CERTIFICATION";
	public static final String COLUMN_NAME_HOLD = "S_HOLDPHOTO_PATH";
	public static final String COLUMN_NAME_POSITIVE = "S_CARDPOSITIVE_PATH";
	public static final String COLUMN_NAME_INVERSE = "S_CARDINVERSE_PATH";

	
	/**
	 * 用户标识
	 */
	private Long cusId;
	/**
	 * 认证状态<p><br>
	 * 1-待审核 2-已认证 3-待修改 10-未提交
	 */
	private Integer status;
	/**
	 * 真实姓名<p><br>
	 * 需要可逆加密
	 */
	private String realName;
	/**
	 * 电话号码<p><br>
	 * 需要可逆加密
	 */
	private String mobile;
	/**
	 * 身份证号码<p><br>
	 * 需要可逆加密
	 */
	private String idCard;
	/**
	 * 持证照片
	 */
	private String holdphotoPath;
	/**
	 * 身份证正面
	 */
	private String cardpositivePath;
	/**
	 * 身份证反面
	 */
	private String cardinversePath;
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

	@Column(name = "i_cus_id")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "i_status")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "s_real_name", length = 32)
	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	@Column(name = "s_mobile", length = 32)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "s_id_card", length = 64)
	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	@Column(name = "s_holdphoto_path", length = 256)
	public String getHoldphotoPath() {
		return holdphotoPath;
	}

	public void setHoldphotoPath(String holdphotoPath) {
		this.holdphotoPath = holdphotoPath;
	}

	@Column(name = "s_cardpositive_path", length = 256)
	public String getCardpositivePath() {
		return cardpositivePath;
	}

	public void setCardpositivePath(String cardpositivePath) {
		this.cardpositivePath = cardpositivePath;
	}

	@Column(name = "s_cardinverse_path", length = 256)
	public String getCardinversePath() {
		return cardinversePath;
	}

	public void setCardinversePath(String cardinversePath) {
		this.cardinversePath = cardinversePath;
	}

	@Column(name = "i_created_id")
	public Long getCreatedId() {
		return createdId;
	}

	public void setCreatedId(Long createdId) {
		this.createdId = createdId;
	}

	@Column(name = "s_created_name", length = 32)
	public String getCreatedName() {
		return createdName;
	}

	public void setCreatedName(String createdName) {
		this.createdName = createdName;
	}

	@Column(name = "s_remark", length = 1024)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	/**
	 * 认证状态<p><br>
	 * 1-待审核 2-已认证 3-待修改 10-未提交
	 */
	public enum Status {

		/**
		 * 未提交
		 */
		UnSubmit(10, "未提交"),
		/**
		 * 待审核
		 */
		WaitForAudit (1, "待审核"),
		/**
		 * 已认证
		 */
		Certificated(2, "已认证"),
		/**
		 * 待修改
		 */
		WaitForEdit(3, "待修改");

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
}

