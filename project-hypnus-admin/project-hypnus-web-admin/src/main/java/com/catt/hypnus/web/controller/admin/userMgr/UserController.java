package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.Message;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;
import com.catt.hypnus.repository.form.userMgr.UserForm;
import com.catt.hypnus.service.base.userMgr.UserInfoBaseService;
import com.catt.hypnus.service.userMgr.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:42
 * @Desc:
 **/
@Controller
@RequestMapping(value="/admin/userMgr")
public class UserController
{

    /**
     * 经销商首页
     */
    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex() {
        return "/admin/user/index";
    }


    @RequestMapping(value="/add.html",method = RequestMethod.GET)
    public String toAdd(){
        return "/admin/user/register";
    }

    @RequestMapping(value="/edit.html")
    public String toEdit(Long id, HttpServletRequest request, Model model){
        UserInfo info = userInfoBaseService.find(id);
        model.addAttribute("info",info);
        return "/admin/user/register";
    }

    @RequestMapping(value="/delete",method = RequestMethod.DELETE)
    public Message delete(Long id,HttpServletRequest request){
        userInfoBaseService.delete(id);
        return Message.success("", new Object[0]);
    }

    /**
     * 获取用户分页数据
     *
     * @param pageable
     * @return
     */
    @RequestMapping(value = {"/getPage"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> getPageShopOwner(UserForm form, Pageable pageable, @CurrentUser Long id) {
        return userService.queryList(form.getPhone(),pageable);
    }

    @Resource(name="userServiceImpl")
    private UserService userService;

    @Resource(name="userInfoBaseServiceImpl")
    private UserInfoBaseService userInfoBaseService;

}
