package com.catt.hypnus.repository.form.productMgr;

import java.io.Serializable;
import java.util.List;

/**
 * Description:App/微信商城使用---商品信息from
 * Created by 2017-03-10  10:29.
 * author: Zhou mingxiang
 */
public class ProductFromApp implements Serializable {
    /**
     * <pre>
     * 商品中文名称
     * </pre>
     */
    private String zhName;

    /**
     * 当前登录人员标识
     */
    private Long cusId;

    /**
     * 商品分类标识
     */
    private Long cateId;

    /**
     * 是否上架
     */
    private Integer isInShop;

    /**
     * 是否微信商城调用
     */
    private boolean isWechat;

    /**
     * 商品分类集合
     */
    private List<Long> cateList;

    /**
     * 使用类型 1-普通  2-进货清单
     */
    private Integer useType;

    public String getZhName() {
        return zhName;
    }

    public void setZhName(String zhName) {
        this.zhName = zhName;
    }

    public Long getCusId() {
        return cusId;
    }

    public void setCusId(Long cusId) {
        this.cusId = cusId;
    }

    public Long getCateId() {
        return cateId;
    }

    public void setCateId(Long cateId) {
        this.cateId = cateId;
    }

    public Integer getIsInShop() {
        return isInShop;
    }

    public void setIsInShop(Integer isInShop) {
        this.isInShop = isInShop;
    }

    public boolean isWechat() {
        return isWechat;
    }

    public void setWechat(boolean wechat) {
        isWechat = wechat;
    }

    public List<Long> getCateList() {
        return cateList;
    }

    public void setCateList(List<Long> cateList) {
        this.cateList = cateList;
    }

    public Integer getUseType() {
        return useType;
    }

    public void setUseType(Integer useType) {
        this.useType = useType;
    }
}
