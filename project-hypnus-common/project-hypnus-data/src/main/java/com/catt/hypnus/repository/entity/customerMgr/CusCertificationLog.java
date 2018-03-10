package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 认证审核信息实体
 * 
 * @author chen chusheng
 * @date 2017-03-08 15:56:07
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "t_cus_certification_log")
public class CusCertificationLog extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 单据标识
	 */
	private Long orderId;
	/**
	 * 操作环节<p><br>
	 * 1-创建 2-审核 3-修改
	 */
	private Integer act;
	/**
	 * 操作内容
	 */
	private String content;
	/**
	 * 审核结果<p><br>
	 * 1-通过 2-不通过
	 */
	private Integer auditResult;
	/**
	 * 审核意见
	 */
	private String auditDesc;
	/**
	 * 操作人员标识
	 */
	private Long operatorId;
	/**
	 * 操作人员名称
	 */
	private String operatorName;
	/**
	 * 备注
	 */
	private String remark;

	@Column(name = "i_order_id")
	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	@Column(name = "i_act")
	public Integer getAct() {
		return act;
	}

	public void setAct(Integer act) {
		this.act = act;
	}

	@Column(name = "s_content", length = 512)
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "i_audit_result")
	public Integer getAuditResult() {
		return auditResult;
	}

	public void setAuditResult(Integer auditResult) {
		this.auditResult = auditResult;
	}

	@Column(name = "s_audit_desc", length = 1024)
	public String getAuditDesc() {
		return auditDesc;
	}

	public void setAuditDesc(String auditDesc) {
		this.auditDesc = auditDesc;
	}

	@Column(name = "i_operator_id")
	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}

	@Column(name = "s_operator_name", length = 32)
	public String getOperatorName() {
		return operatorName;
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}

	@Column(name = "s_remark", length = 1024)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}


	/**
	 * 操作环节<p><br>
	 * 1-创建 2-审核 3-修改
	 */
	public enum Act {

		/**
		 * 创建
		 */
		Create(1, "创建"),
		/**
		 * 审核
		 */
		Audit (2, "审核"),
		/**
		 * 修改
		 */
		Edit(3, "修改");

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
		Act(Integer value, String name) {
			this.value = value;
			this.name = name;
		}

		/**
		 * 由数字得是否多实例枚举对象
		 *
		 * @param value 枚举值
		 * @return 返回中文
		 */
		public static Act getEnum(int value) {
			Act[] source = Act.values();
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

