package com.catt.hypnus.repository.entity.userMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * user_info实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-15 22:25:18
 */
@Entity
@JsonAutoDetect
@Table(name = "USER_INFO")
public class UserInfo extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * account
     * </pre>
     */
    private String account;
    /**
     * <pre>
     * assword
     * </pre>
     */
    private String assword;
    /**
     * <pre>
     * head_path
     * </pre>
     */
    private String headPath;
    /**
     * <pre>
     * email
     * </pre>
     */
    private String email;
    /**
     * <pre>
     * phone
     * </pre>
     */
    private String phone;
    /**
     * <pre>
     * birthday
     * </pre>
     */
    private Date birthday;
    /**
     * <pre>
     * height
     * </pre>
     */
    private Integer height;
    /**
     * <pre>
     * weight
     * </pre>
     */
    private Integer weight;
    /**
     * <pre>
     * bmi
     * </pre>
     */
    private Double bmi;
    /**
     * <pre>
     * address
     * </pre>
     */
    private String address;
    /**
     * <pre>
     * regtime
     * </pre>
     */
    private Date regtime;
    /**
     * <pre>
     * lastip
     * </pre>
     */
    private String lastip;
    /**
     * <pre>
     * logtime
     * </pre>
     */
    private Date logtime;
    /**
     * <pre>
     * status
     * </pre>
     */
    private Integer status;

    @Column(name = "ACCOUNT", length = 32)
    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    @Column(name = "ASSWORD", length = 32)
    public String getAssword() {
        return assword;
    }

    public void setAssword(String assword) {
        this.assword = assword;
    }

    @Column(name = "HEAD_PATH", length = 100)
    public String getHeadPath() {
        return headPath;
    }

    public void setHeadPath(String headPath) {
        this.headPath = headPath;
    }

    @Column(name = "EMAIL", length = 100)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "PHONE", length = 16)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(name = "BIRTHDAY")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @Column(name = "HEIGHT")
    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    @Column(name = "WEIGHT")
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    @Column(name = "BMI")
    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    @Column(name = "ADDRESS", length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "REGTIME")
    public Date getRegtime() {
        return regtime;
    }

    public void setRegtime(Date regtime) {
        this.regtime = regtime;
    }

    @Column(name = "LASTIP", length = 64)
    public String getLastip() {
        return lastip;
    }

    public void setLastip(String lastip) {
        this.lastip = lastip;
    }

    @Column(name = "LOGTIME")
    public Date getLogtime() {
        return logtime;
    }

    public void setLogtime(Date logtime) {
        this.logtime = logtime;
    }

    @Column(name = "STATUS")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

}

