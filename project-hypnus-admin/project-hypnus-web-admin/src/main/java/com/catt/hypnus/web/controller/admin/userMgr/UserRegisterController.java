package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.web.Message;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @Author:lyz
 * @Date: 2018/3/22 19:39
 * @Desc:
 **/
@Controller
@RequestMapping("/dmz/user")
public class UserRegisterController
{

    @RequestMapping(value="/register.html",method = RequestMethod.GET)
    public String toRegister(){
        return "/admin/user/register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Message save(UserInfo userInfo) {
        try {
            userService.addUserInfo(userInfo);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        }
    }
    @Resource(name="userServiceImpl")
    private UserService userService;
}
