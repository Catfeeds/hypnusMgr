package com.catt.hypnus.repository.form.settlementMgr;


import java.io.Serializable;

/**
 * 商家账户信息相关操作入参
 *
 * @author runtime
 * @version V1.0
 * @date 2017-2-16 15:14:02
 */
public class BusinessHandlerForm implements Serializable {

    /**
     * 用户标识（必填）
     */
    private Long cusId;

    /**
     * 规则标识（必填）
     */
    private Long ruleId;

    /**
     * 销售金额，店主销售奖励或者主管管理奖励时必填
     */
    private Double saleMoney;


    public BusinessHandlerForm() {

    }

    public BusinessHandlerForm(Long cusId, Long ruleId) {
        this.cusId = cusId;
        this.ruleId = ruleId;
    }

    public BusinessHandlerForm(Long cusId, Long ruleId, Double saleMoney) {
        this.cusId = cusId;
        this.ruleId = ruleId;
        this.saleMoney = saleMoney;
    }

    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    public Long getRuleId() {
        return ruleId;
    }

    public void setRuleId(Long ruleId) {
        this.ruleId = ruleId;
    }

    public Double getSaleMoney() {
        return saleMoney;
    }

    public void setSaleMoney(Double saleMoney) {
        this.saleMoney = saleMoney;
    }
}
