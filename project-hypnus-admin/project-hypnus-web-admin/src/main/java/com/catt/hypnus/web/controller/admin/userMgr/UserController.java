package com.catt.hypnus.web.controller.admin.userMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.DateUtil;
import com.catt.common.util.lang.StringUtil;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Map;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:42
 * @Desc:
 **/
@Controller
@RequestMapping(value="/admin/userMgr")
public class UserController
{

    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex() {
        return "/admin/user/index";
    }


    @RequestMapping(value="/add.html",method = RequestMethod.GET)
    public String toAdd(){
        return "/admin/user/register";
    }

    @RequestMapping(value="/editPwd.html")
    public String toUpdatePws(Long id,Model model) {
        model.addAttribute("id",id);
        return "/admin/user/pwd";
    }

    @RequestMapping(value="/edit.html")
    public String toEdit(Long id, HttpServletRequest request, Model model){
        UserInfo info = userInfoBaseService.find(id);
        model.addAttribute("info",info);
        return "/admin/user/addEdit";
    }

    @RequestMapping(value = {"/check"}, method = RequestMethod.POST)
    @ResponseBody
    public Message checkIsUser(@CurrentUser Long id){
        try{
            UserInfo info = userService.findByRelUserId(id);
            if(Objects.isNull(info)){
                return Message.success("-1");
            }
            return Message.success(String.valueOf(info.getId()));
        }catch (Exception e){
            return Message.success("-1");
        }
    };

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

    @RequestMapping(value = {"/searchCus"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> searchCus(UserForm form, Pageable pageable){
        return userService.queryListNonBind(form.getPhone(),pageable);
    }

    @RequestMapping(value = "/pwd", method = RequestMethod.POST)
    @ResponseBody
    public Message updatePwd(Long id,String password){
        try {
            userService.updatePassword(id,password);
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        }
        return Message.success();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Message save(@RequestParam Map<String, Object> param) {
        try {
            Long id = MapUtil.getLong(param, "id");
            String email = MapUtil.getString(param, "email");
            String birthStr = MapUtil.getString(param, "birthday");
            Integer height = MapUtil.getInteger(param, "height");
            Integer weight = MapUtil.getInteger(param, "weight");
            String address = MapUtil.getString(param, "address");
            UserInfo info = userInfoBaseService.find(id);
            if (StringUtil.checkObj(birthStr)) {
                try {
                    info.setBirthday(DateUtil.parseDate(birthStr, "yyyy-MM-dd"));
                    info.setEmail(email);
                    info.setHeight(height);
                    info.setWeight(weight);
                    info.setAddress(address);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            userService.updateUserInfo(info);
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        }
        return Message.success();
    }

    @RequestMapping(value="/delete",method = RequestMethod.DELETE)
    public Message delete(Long id,HttpServletRequest request){
        userInfoBaseService.delete(id);
        return Message.success("", new Object[0]);
    }


    @Resource(name="userServiceImpl")
    private UserService userService;

    @Resource(name="userInfoBaseServiceImpl")
    private UserInfoBaseService userInfoBaseService;

}
