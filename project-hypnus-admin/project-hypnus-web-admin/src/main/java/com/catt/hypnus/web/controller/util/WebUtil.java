package com.catt.hypnus.web.controller.util;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @Author:lyz
 * @Date: 2018/3/26 20:14
 * @Desc:
 **/
public class WebUtil
{
    public static void addSessionAttribute(ServletRequest request, String key, Object value) {
        HttpSession session =((HttpServletRequest)request).getSession(true);
        session.setAttribute(key,value);
    }

    public static void removeSessionAttribute(ServletRequest request,String key) {
        HttpSession session =((HttpServletRequest)request).getSession(true);
        session.removeAttribute(key);
    }

    public static Object getSessionAttribute(ServletRequest request,String key) {
        HttpSession session =((HttpServletRequest)request).getSession(true);
        return session.getAttribute(key);
    }
}
