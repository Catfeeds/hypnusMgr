package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.web.Message;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/22 19:39
 * @Desc:
 **/
@Controller
@RequestMapping("/user")
public class UserRegisterController
{

    @RequestMapping(value="/register.html",method = RequestMethod.GET)
    public String toRegister(){
        return "/admin/user/register";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Message save(UserInfo userInfo) {
        userService.addUserInfo(userInfo);
        return Message.success("", new Object[0]);
    }

    @RequestMapping(value="/image")
    @ResponseBody
    public String hehe(@RequestParam(value="file")MultipartFile file){
        return "haha";
    }

    @Resource(name="userServiceImpl")
    private UserService userService;
}
