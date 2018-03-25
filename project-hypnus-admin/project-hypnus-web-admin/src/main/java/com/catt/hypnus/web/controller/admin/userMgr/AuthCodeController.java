package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.web.Message;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
    public Message getAuthCode(String phone){
        return Message.success();
    }

    @RequestMapping(value="/validation",method = RequestMethod.POST)
    public Message validation(String phone,String authCode){
        if(phone==null||phone.equals("")){
            return Message.error("验证失败");
        }else{
            return Message.success();
        }
    }
}
