package com.catt.hypnus.repository.form.userMgr;

import java.io.Serializable;

/**
 * @author lyz
 * @date 2018/3/19 20:58
 * @desc
 **/
public class UserForm implements Serializable
{
    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
