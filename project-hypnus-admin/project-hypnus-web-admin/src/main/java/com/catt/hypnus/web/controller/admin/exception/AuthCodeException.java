package com.catt.hypnus.web.controller.admin.exception;

import java.io.Serializable;

/**
 * @Author:lyz
 * @Date: 2018/3/26 20:06
 * @Desc:
 **/
public class AuthCodeException extends  RuntimeException implements Serializable
{
    private static final long serialVersionUID = -2636570100582381774L;

    private String msg;
    public AuthCodeException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public AuthCodeException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
