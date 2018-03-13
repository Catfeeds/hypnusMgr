package com.catt.hypnus.repository.form.customerMgr;


import com.catt.hypnus.repository.entity.customerMgr.CusAccountDetail;

import java.io.Serializable;

/**
 * 用户账号资金相关操作入参
 *
 * @author runtime
 * @version V1.0
 * @date 2017-2-16 15:14:02
 */
public class CusAccountHandlerForm implements Serializable {

    /**
     * 用户标识（必填）
     */
    private Long cusId;

    /**
     * 相关金额（必填）
     */
    private Double money;

    /**
     * 交易类型（必填）
     * 1-余额消费
     * 2-余额退款
     * 3-提现 4-销售提成 5-会员注册奖励 6-店主注册奖励 7-店主邀请奖励 8-店主销售奖励 9-主管管理奖励
     */
    private CusAccountDetail.Type type;

    /**
     * 交易流水号
     */
    private String relId;

    /**
     * 空构造方法
     */
    public CusAccountHandlerForm() {

    }

    /**
     * 构造方法
     * @param cusId 用户标识
     * @param money 交易类型
     * @param type 交易类型
     * @param relId 交易流水号
     */
    public CusAccountHandlerForm(Long cusId, Double money, CusAccountDetail.Type type, String relId) {
        this.cusId = cusId;
        this.money = money;
        this.type = type;
        this.relId = relId;
    }

    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public CusAccountDetail.Type getType() {
        return type;
    }

    public void setType(CusAccountDetail.Type type) {
        this.type = type;
    }

    public String getRelId() {
        return relId;
    }

    public void setRelId(String relId) {
        this.relId = relId;
    }
}
