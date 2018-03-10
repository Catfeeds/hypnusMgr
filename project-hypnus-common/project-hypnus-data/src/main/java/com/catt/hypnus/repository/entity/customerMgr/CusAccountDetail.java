package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 账户明细记录实体类
 *
 * @author 周明祥
 * @version V1.0
 * @date 2017-02-10 14:30:14
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_ACCOUNT_DETAIL")
public class CusAccountDetail extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * 用户标识
     * </pre>
     */
    private Long cusId;
    /**
     * <pre>
     * 交易类型
     * 1-余额消费
     * 2-余额退款
     * 3-提现 4-销售提成 5-会员注册奖励 6-店主注册奖励 7-店主邀请奖励 8-店主销售奖励 9-主管管理奖励 10-返利提成到账
     * </pre>
     */
    private Integer type;
    /**
     * <pre>
     * 交易金额(单位：元)
     * </pre>
     */
    private Double money;
    /**
     * <pre>
     * 交易后余额
     * </pre>
     */
    private Double leftMoney;
    /**
     * <pre>
     * 交易流水号
     * 根据【交易类型】保存不同数据：余额消费：保存订单标识余额退款：保存退款单标识提现：保存提现记录标识销售提成：会员注册奖励、店主注册奖励、店主邀请奖励、店主销售奖励、主管管理奖励：保存结算记录标识
     * </pre>
     */
    private String relId;
    /**
     * <pre>
     * 创建人员标识
     * 创建人员标识
     * </pre>
     */
    private Long createdId;
    /**
     * <pre>
     * 创建人员名称
     * 创建人员名称
     * </pre>
     */
    private String createdName;

    public CusAccountDetail() {
    }

    public CusAccountDetail(Long cusId, Integer type, Double money, Double leftMoney, String relId) {
        this.cusId = cusId;
        this.type = type;
        this.money = money;
        this.leftMoney = leftMoney;
        this.relId = relId;
    }

    @Column(name = "I_CUS_ID")
    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    @Column(name = "I_TYPE")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Column(name = "I_MONEY")
    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    @Column(name = "I_LEFT_MONEY")
    public Double getLeftMoney() {
        return leftMoney;
    }

    public void setLeftMoney(Double leftMoney) {
        this.leftMoney = leftMoney;
    }

    @Column(name = "S_REL_ID", length = 64)
    public String getRelId() {
        return relId;
    }

    public void setRelId(String relId) {
        this.relId = relId;
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

    /**
     *  交易类型
     * 1-余额消费
     * 2-余额退款
     * 3-提现 4-销售提成 5-会员注册奖励 6-店主注册奖励 7-店主邀请奖励 8-店主销售奖励 9-主管管理奖励 10-返利提成到账
     */
    public enum Type {

        /**
         * 余额消费
         */
        RemainderConsume(1, "余额消费"),
        /**
         * 余额退款
         */
        RemainderReturn(2, "余额退款"),
        /**
         * 提现
         */
        Withdrawals(3, "提现"),
        /**
         * 销售提成
         */
        SalesCommissions(4, "销售提成"),
        /**
         * 会员注册奖励
         */
        CusRegisterBonus(5, "会员注册奖励"),
        /**
         * 店主注册奖励
         */
        ShopkeeperRegisterBonus(6, "店主注册奖励"),
        /**
         * 店主邀请奖励
         */
        ShopkeeperInviteBonus(7, "店主邀请奖励"),
        /**
         * 店主销售奖励
         */
        ShopkeeperSaleBonus(8, "店主销售奖励"),
        /**
         * 主管管理奖励
         */
        LeaderMgrBonus(9, "主管管理奖励"),
        /**
         * 返利提成到账
         */
        RebateMoneyToAccount(10, "返利提成到账");

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

