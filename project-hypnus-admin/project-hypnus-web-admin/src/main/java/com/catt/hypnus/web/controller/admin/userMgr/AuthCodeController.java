package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.web.Message;
import com.catt.hypnus.web.controller.admin.authCode.AuthCode;
import com.catt.hypnus.web.controller.admin.authCode.service.SmsService;
import com.catt.hypnus.web.controller.admin.exception.AuthCodeException;
import com.catt.hypnus.web.controller.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

/**
 * @author lyz
 * @date 2018/3/25 14:32
 * @desc
 **/
@RestController
@RequestMapping(value="/dmz/authCode")
public class AuthCodeController
{
    @RequestMapping(value="/get",method = RequestMethod.POST)
    public Message getAuthCode(HttpServletRequest request,String phone){
        if (phone == null || phone.trim().equals("")) {
            return Message.error("手机号码不能为空");
        }
        AuthCode auth = (AuthCode) WebUtil.getSessionAttribute(request,phone);
        if(Objects.nonNull(auth)&&auth.countSurplusTime()>0){
            return Message.error("请隔"+auth.countSurplusTime()+"s再获取验证码");
        }
        String authCode = smsService.smsAuthCode(phone);
        WebUtil.addSessionAttribute(request,phone,new AuthCode(phone,authCode));
        return Message.success();
    }

    @RequestMapping(value="/validation",method = RequestMethod.POST)
    public Message validation(HttpServletRequest request,String phone,String authCode){
        if (phone == null || phone.trim().equals("")) {
            return Message.error("手机号码不能为空");
        }
        AuthCode auth = (AuthCode) WebUtil.getSessionAttribute(request,phone);
        if(Objects.isNull(auth)){
            return Message.error("请先发送验证码");
        }
        try{
            auth.validateCodeExpire();
            auth.validateRightfulForCode(authCode);
            WebUtil.removeSessionAttribute(request,phone);
        }catch (AuthCodeException e){
            return Message.error(e.getMsg());
        }
        return Message.success();
    }

    @Autowired
    private SmsService smsService;
}
