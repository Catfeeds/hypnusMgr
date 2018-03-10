package com.catt.hypnus.repository.form.settlementMgr;


import java.io.Serializable;

/**
 * 商家账户信息相关操作返回的参数，需要返回什么参数，在下面加
 *
 * @author 袁幸成
 * @version V1.0
 * @date 2017-2-16 15:14:11
 */
public class BusinessHandlerBackData implements Serializable {

    /**
     * 店主奖励结算明细标识
     */
    private Long shopDetailId;

    public Long getShopDetailId() {
        return shopDetailId;
    }

    public void setShopDetailId(Long shopDetailId) {
        this.shopDetailId = shopDetailId;
    }
}
