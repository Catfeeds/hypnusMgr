package com.catt.hypnus.repository.entity.common;

import com.catt.common.base.repository.entity.LongBaseEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 应用系统 实体.
 *
 * 2016-07-28 20:16:34
 *
 * @author liujieming
 * @version Ver 1.0.0
 * @since JDK V1.8
 */
@Entity
@Table(name = "T_PUB_SYS")
public class PubSys extends LongBaseEntity {

    //region 属性变量
    /**
     * <pre>
     * 系统名称.S_SYS_NAME
     * </pre>
     */
    private String sysName;
    /**
     * <pre>
     * 系统类型.I_TYPE
     * 1-系统  2-子系统.
     * </pre>
     */
    private Long type;
    /**
     * <pre>
     * 系统所属单位名称.S_SYS_DOMAIN
     * </pre>
     */
    private String sysDomain;
    /**
     * <pre>
     * 所属行业.I_INDUSTRY
     * </pre>
     */
    private Long industry;
    /**
     * <pre>
     * 上级标识.I_PARENT_ID
     * </pre>
     */
    private Long parentId;
    /**
     * <pre>
     * 全路径.S_ALL_PATH
     * </pre>
     */
    private String allPath;
    /**
     * <pre>
     * 备注.S_REMARK
     * </pre>
     */
    private String remark;
    //endregion

    //region get/set 方法
    /**
     * <pre>
     * 获取系统名称.
     * </pre>
     * @return String sysName.
     */
    @JsonProperty
    @Size(max = 128)
    @NotNull
    @Column(name = "S_SYS_NAME" , length = 128 , nullable = false)
    public String getSysName() {
        return this.sysName;
    }

    /**
    * 设置系统名称.
     * @param sysName 系统名称.
     */
    public void setSysName(String sysName) {
        this.sysName = sysName;
    }

    /**
     * <pre>
     * 获取系统类型.
     * 1-系统  2-子系统.
     * </pre>
     * @return Long type.
     */
    @JsonProperty
    @Column(name = "I_TYPE")
    public Long getType() {
        return this.type;
    }

    /**
    * 设置系统类型.
     * <pre>
     * 1-系统  2-子系统.
     * </pre>
     * @param type 系统类型.
     */
    public void setType(Long type) {
        this.type = type;
    }

    /**
     * <pre>
     * 获取系统所属单位名称.
     * </pre>
     * @return String sysDomain.
     */
    @JsonProperty
    @Size(max = 128)
    @NotNull
    @Column(name = "S_SYS_DOMAIN" , length = 128 , nullable = false)
    public String getSysDomain() {
        return this.sysDomain;
    }

    /**
    * 设置系统所属单位名称.
     * @param sysDomain 系统所属单位名称.
     */
    public void setSysDomain(String sysDomain) {
        this.sysDomain = sysDomain;
    }

    /**
     * <pre>
     * 获取所属行业.
     * </pre>
     * @return Long industry.
     */
    @JsonProperty
    @Column(name = "I_INDUSTRY")
    public Long getIndustry() {
        return this.industry;
    }

    /**
    * 设置所属行业.
     * @param industry 所属行业.
     */
    public void setIndustry(Long industry) {
        this.industry = industry;
    }

    /**
     * <pre>
     * 获取上级标识.
     * </pre>
     * @return Long parentId.
     */
    @JsonProperty
    @Column(name = "I_PARENT_ID")
    public Long getParentId() {
        return this.parentId;
    }

    /**
    * 设置上级标识.
     * @param parentId 上级标识.
     */
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    /**
     * <pre>
     * 获取全路径.
     * </pre>
     * @return String allPath.
     */
    @JsonProperty
    @Size(max = 512)
    @Column(name = "S_ALL_PATH" , length = 512)
    public String getAllPath() {
        return this.allPath;
    }

    /**
    * 设置全路径.
     * @param allPath 全路径.
     */
    public void setAllPath(String allPath) {
        this.allPath = allPath;
    }

    /**
     * <pre>
     * 获取备注.
     * </pre>
     * @return String remark.
     */
    @JsonProperty
    @Size(max = 1024)
    @Column(name = "S_REMARK" , length = 1024)
    public String getRemark() {
        return this.remark;
    }

    /**
    * 设置备注.
     * @param remark 备注.
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    //endregion
}