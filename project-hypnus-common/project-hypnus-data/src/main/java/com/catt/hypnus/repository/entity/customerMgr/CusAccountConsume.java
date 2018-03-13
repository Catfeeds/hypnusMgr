package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.annotation.SafeLock;
import com.catt.common.base.repository.entity.BaseEntity;
import com.catt.common.base.repository.listener.SafeLockListener;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

/**
 * 账户信息实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2017-02-10 14:30:14
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_ACCOUNT_CONSUME")
@EntityListeners({SafeLockListener.class})
@SafeLock(lockFields = {"cusId", "giveMoney", "salesMoney", "totalMoney", "getMoney", "remainderMoney", "applyMoney"})
public class CusAccountConsume extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * 用户标识
     * </pre>
     */
    private Long cusId;
    /**
     * <pre>
     * 累计赠送金额
     * (单位：元)
     * </pre>
     */
    private Double giveMoney;
    /**
     * <pre>
     * 累计销售提成金额
     * (单位：元)
     * </pre>
     */
    private Double salesMoney;
    /**
     * <pre>
     * 累计账户总金额
     * =累计赠送金额 + 累计销售提成金额
     * </pre>
     */
    private Double totalMoney;
    /**
     * <pre>
     * 累计提现总金额
     * </pre>
     */
    private Double getMoney;
    /**
     * <pre>
     * 账户余额
     * </pre>
     */
    private Double remainderMoney;
    /**
     * <pre>
     * 申请提现金额
     * </pre>
     */
    private Double applyMoney;
    /**
     * <pre>
     * 校验字段
     * 用于验证数据是否被异常修改
     * </pre>
     */
    private String validNo;
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

    /**
     * <pre>
     * 待收提成 (未到账收益)
     * </pre>
     */
    private Double unAcceptMoney = 0.0;

    /**
     * <pre>
     * 厂家返利未到账
     * </pre>
     */
    private Double reciveRebateMoney = 0.0;

    @Column(name = "I_CUS_ID")
    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    @Column(name = "I_GIVE_MONEY")
    public Double getGiveMoney() {
        return giveMoney;
    }

    public void setGiveMoney(Double giveMoney) {
        this.giveMoney = giveMoney;
    }

    @Column(name = "I_SALES_MONEY")
    public Double getSalesMoney() {
        return salesMoney;
    }

    public void setSalesMoney(Double salesMoney) {
        this.salesMoney = salesMoney;
    }

    @Column(name = "I_TOTAL_MONEY")
    public Double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Column(name = "I_GET_MONEY")
    public Double getGetMoney() {
        return getMoney;
    }

    public void setGetMoney(Double getMoney) {
        this.getMoney = getMoney;
    }

    @Column(name = "I_REMAINDER_MONEY")
    public Double getRemainderMoney() {
        return remainderMoney;
    }

    public void setRemainderMoney(Double remainderMoney) {
        this.remainderMoney = remainderMoney;
    }

    @Column(name = "I_APPLY_MONEY")
    public Double getApplyMoney() {
        return applyMoney;
    }

    public void setApplyMoney(Double applyMoney) {
        this.applyMoney = applyMoney;
    }

    @Column(name = "S_VALID_NO", length = 256)
    public String getValidNo() {
        return validNo;
    }

    public void setValidNo(String validNo) {
        this.validNo = validNo;
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

    @Column(name = "I_UNACCEPT_MONEY")
    public Double getUnAcceptMoney() {
        return unAcceptMoney;
    }

    public void setUnAcceptMoney(Double unAcceptMoney) {
        this.unAcceptMoney = unAcceptMoney;
    }

    @Column(name = "I_RECIVE_REBATE_MONEY")
    public Double getReciveRebateMoney() {
        return reciveRebateMoney;
    }

    public void setReciveRebateMoney(Double reciveRebateMoney) {
        this.reciveRebateMoney = reciveRebateMoney;
    }
}

