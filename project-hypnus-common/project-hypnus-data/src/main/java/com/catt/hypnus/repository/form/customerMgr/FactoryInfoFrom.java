package com.catt.hypnus.repository.form.customerMgr;

import java.io.Serializable;

/**
 * Description:厂家管理From
 * Created by 2017-10-20  16:04.
 * author: Zhou mingxiang
 */
public class FactoryInfoFrom implements Serializable{

    /**
     * 厂家标识
     */
    private Long id;

    /**
     * 厂家名称
     */
    private String factoryName;
    /**
     * 购买须知
     */
    private String purchaseNotes;
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


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFactoryName() {
        return factoryName;
    }

    public void setFactoryName(String factoryName) {
        this.factoryName = factoryName;
    }

    public String getPurchaseNotes() {
        return purchaseNotes;
    }

    public void setPurchaseNotes(String purchaseNotes) {
        this.purchaseNotes = purchaseNotes;
    }

    public Long getCreatedId() {
        return createdId;
    }

    public void setCreatedId(Long createdId) {
        this.createdId = createdId;
    }

    public String getCreatedName() {
        return createdName;
    }

    public void setCreatedName(String createdName) {
        this.createdName = createdName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
