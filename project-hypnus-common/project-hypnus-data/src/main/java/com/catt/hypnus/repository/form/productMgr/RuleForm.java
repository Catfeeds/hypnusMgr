package com.catt.hypnus.repository.form.productMgr;

import java.io.Serializable;

/**
 * 补贴规则表单
 *
 * @author zj
 * @version V1.0
 * @date 2017/2/11
 */
public class RuleForm implements Serializable {

    /**
     * <pre>
     * 客户类型
     * 1-店主
     * 2-主管
     * </pre>
     */
    private Integer cusType;

    /**
     * <pre>
     * 规则类型
     * 1-注册
     * 2-邀请
     * 3-销售
     * 多个以英文逗号分割
     * </pre>
     */
    private String type;

    /**
     * <pre>
     * 奖励类型
     * 1-代金券
     *  2-现金
     * </pre>
     */
    private Integer rewardType;

    /**
     * <pre>
     * 规则状态
     * 1-有效
     * 2-无效
     * </pre>
     */
    private Integer status;

    public Integer getCusType() {
        return cusType;
    }

    public void setCusType(Integer cusType) {
        this.cusType = cusType;
    }

    public Integer getRewardType() {
        return rewardType;
    }

    public void setRewardType(Integer rewardType) {
        this.rewardType = rewardType;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
