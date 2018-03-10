package com.catt.hypnus.security.shiro.validate.impl;

import com.catt.common.base.pojo.search.Filter;
import com.catt.common.module.security.repository.entity.Staff;
import com.catt.common.module.security.service.StaffService;
import com.catt.common.service.validator.CaptchaService;
import com.catt.common.util.collections.CollectionUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.common.web.security.shiro.token.ExtAuthenticationToken;
import com.catt.common.web.security.shiro.validate.ObtainUserData;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 账号密码登录时获取用户信息
 *
 * @author 邹佳：zoujia@gdcattsoft.com
 * @version 1.0
 * @date 2016年3月25日
 * @since jdk版本：jdk1.8
 */
@Service("obtainDataStaff4Admin")
public class ObtainStaff implements ObtainUserData {

    @Resource(name = "staffServiceImpl")
    private StaffService staffService;

    @Resource(name = "captchaServiceImpl")
    private CaptchaService captchaService;

    @Override
    public Staff getUser(ExtAuthenticationToken token) {
        String username = token.getUsername();
        String password = (token.getPassword() == null ? "" : new String(token.getPassword()));
        String captchaId = token.getCaptchaId();
        String captcha = token.getCaptcha();

        // 首页验证验证码，验证错误直接返回
        if (token.isCaptcha() && !captchaService.isValid(captchaId, captcha)) {
            throw new UnsupportedTokenException();
        }

        // 账号密码非空检查
        if (StringUtil.isBlank(username) || StringUtil.isBlank(password)) {
            throw new UnknownAccountException();
        }

        // 排除已经删除的账号
        List<Filter> filters = new ArrayList<>();
        filters.add(Filter.eq("account", username));
        filters.add(Filter.eq("isDel", false));

        List<Staff> list = staffService.findList(null, filters, null);
        Staff first = CollectionUtil.getFirst(list);
        if (first == null) {
            throw new UnknownAccountException();
        }

        return first;
    }

}
