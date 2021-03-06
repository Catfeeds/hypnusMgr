package com.catt.hypnus.repository.entity.factoryMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.apache.commons.codec.digest.DigestUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * factory_info实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-15 22:25:18
 */
@Entity
@JsonAutoDetect
@Table(name = "FACTORY_INFO")
public class FactoryInfo extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * name
     * </pre>
     */
    private String name;
    /**
     * <pre>
     * password
     * </pre>
     */
    private String password;
    /**
     * <pre>
     * connector
     * </pre>
     */
    private String connector;
    /**
     * <pre>
     * phone
     * </pre>
     */
    private String phone;
    /**
     * <pre>
     * email
     * </pre>
     */
    private String email;
    /**
     * <pre>
     * status
     * </pre>
     */
    private Integer status;

    private Integer groupId;
    /**
     * <pre>
     * ddress
     * </pre>
     */
    private String address;
    /**
     * <pre>
     * avater
     * </pre>
     */
    private String headPath;

    /**
     * 关联系统用户标识
     */
    private Long relUserId;

    public void relSystemUser(Long userId){
        this.relUserId = userId;
    }

    public void updatePwd(String password){
        this.password = DigestUtils.md5Hex(password);
    }

    public void init(){
        this.password = DigestUtils.md5Hex("888888");
        this.status =1 ;
        this.groupId =1;
    }

    @Column(name = "NAME", length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "PASSWORD", length = 32)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "CONNECTOR", length = 32)
    public String getConnector() {
        return connector;
    }

    public void setConnector(String connector) {
        this.connector = connector;
    }

    @Column(name = "PHONE", length = 16)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(name = "EMAIL", length = 100)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "STATUS")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Column(name = "ADDRESS", length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "HEAD_PATH", length = 100)
    public String getHeadPath() {
        return headPath;
    }

    public void setHeadPath(String headPath) {
        this.headPath = headPath;
    }




    @Column(name = "REL_USER_ID")
    public Long getRelUserId() {
        return relUserId;
    }

    public void setRelUserId(Long relUserId) {
        this.relUserId = relUserId;
    }

    @Column(name = "GROUP_ID")
    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }
}

