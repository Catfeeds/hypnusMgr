package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 提成/返利结算记录表实体类
 * 
 * @author 袁幸成
 * @date 2017-08-22 15:12:48
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_SETTLEMENT_PUSH_RECORD")
public class SettlementPushRecord extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 账户明细记录标识（3-店主提成到账 4-厂家返利到账才不为空）
	 */
	private Long accountDetailId;
	/**
	 * 交易类型
	 * 1-店主待收提成(+)（支付成功后操作） 2-厂家返利待收(+)（支付成功后操作） 3-店主提成到账 4-厂家返利到账 5-店主待收退货 6-厂家待收提成退货
	 */
	private Integer type;
	/**
	 * 返利级别
	 */
	private Integer rebateLevel;
//	/**
//	 * 返利单价（一个订单可存在多个商品，删除该字段）
//	 */
//	private Double unitPrice;
	/**
	 * 金额
	 */
	private Double pushMoney;
	/**
	 * 订单标识
	 */
	private Long orderId;
	/**
	 * 店主标识
	 */
	private Long shopkeeperId;

	@Column(name = "I_ACCOUNT_DETAIL_ID")
	public Long getAccountDetailId() {
		return accountDetailId;
	}

	public void setAccountDetailId(Long accountDetailId) {
		this.accountDetailId = accountDetailId;
	}

	@Column(name = "I_TYPE")
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Column(name = "I_REBATE_LEVEL")
	public Integer getRebateLevel() {
		return rebateLevel;
	}

	public void setRebateLevel(Integer rebateLevel) {
		this.rebateLevel = rebateLevel;
	}

//	@Column(name = "I_UNIT_PRICE")
//	public Double getUnitPrice() {
//		return unitPrice;
//	}
//
//	public void setUnitPrice(Double unitPrice) {
//		this.unitPrice = unitPrice;
//	}

	@Column(name = "I_PUSH_MONEY")
	public Double getPushMoney() {
		return pushMoney;
	}

	public void setPushMoney(Double pushMoney) {
		this.pushMoney = pushMoney;
	}

	@Column(name = "I_ORDER_ID")
	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	@Column(name = "I_SHOPKEEPER_ID")
	public Long getShopkeeperId() {
		return shopkeeperId;
	}

	public void setShopkeeperId(Long shopkeeperId) {
		this.shopkeeperId = shopkeeperId;
	}

    /**
     *  交易类型
     * 1-店主待收提成(+)（支付成功后操作） 2-厂家返利待收(+)（支付成功后操作） 3-店主提成到账 4-厂家返利到账 5-店主待收退货 6-厂家待收提成退货
     */
    public enum Type {

        /**
         * 1-店主待收提成+（支付成功后操作）
         */
        AddUnAcceptMoney(1, "店主待收提成+"),
        /**
         * 2-厂家返利待收+（支付成功后操作）
         */
        AddReciveRebateMoney(2, "厂家返利待收+"),
        /**
         * 3-店主提成到账
         */
        AcceptMoneyToAccount(3, "店主提成到账"),
        /**
         * 4-厂家返利到账
         */
        RebateMoneyToAccount(4, "厂家返利到账"),
        /**
         * 5-店主待收退货
         */
        ReturnUnAcceptMoney(5, "店主待收退货"),
        /**
         * 6-厂家待收提成退货
         */
        ReturnReciveRebateMoney(6, "厂家待收提成退货");

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

}

