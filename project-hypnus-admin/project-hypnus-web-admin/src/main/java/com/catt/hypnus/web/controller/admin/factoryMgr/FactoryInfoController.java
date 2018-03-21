package com.catt.hypnus.web.controller.admin.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.Message;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.repository.form.factoryMgr.FactoryForm;
import com.catt.hypnus.service.base.factoryMgr.FactoryInfoBaseService;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Objects;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:42
 * @Desc:
 **/
@Controller
@RequestMapping(value="/admin/factoryMgr")
public class FactoryInfoController
{

    /**
     * 经销商首页
     */
    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex() {
        return "/admin/factory/index";
    }


    @RequestMapping(value="/add.html",method = RequestMethod.GET)
    public String toAdd(){
        return "/admin/factory/addEdit";
    }

    @RequestMapping(value="/editPwd.html")
    public String toUpdatePws(Long id,Model model) {
        model.addAttribute("id",id);
        return "/admin/factory/pwd";
    }

    @RequestMapping(value = "/pwd", method = RequestMethod.POST)
    @ResponseBody
    public Message updatePwd(Long id,String password){
        factoryService.updatePassword(id,password);
        return Message.success("", new Object[0]);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Message save(FactoryInfo factoryInfo) {
        if(Objects.isNull(factoryInfo.getId())){
            factoryService.addFactoryInfo(factoryInfo);
        }else{
            factoryService.updateFactoryInfo(factoryInfo);
        }
        return Message.success("", new Object[0]);
    }

    @RequestMapping(value="/edit.html")
    public String toEdit(Long id, HttpServletRequest request, Model model){
        FactoryInfo info = factoryInfoBaseService.find(id);
        model.addAttribute("info",info);
        return "/admin/factory/addEdit";
    }

    @RequestMapping(value="/delete",method = RequestMethod.DELETE)
    public Message delete(Long id,HttpServletRequest request){
        factoryService.deleteFactory(id);
        return Message.success("", new Object[0]);
    }

    /**
     * 获取经销商分页数据
     *
     * @param pageable
     * @return
     */
    @RequestMapping(value = {"/getPage"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> getPageShopOwner(FactoryForm factoryForm, Pageable pageable, @CurrentUser Long id) {
        return factoryService.queryList(factoryForm.getFactoryMobile(),pageable);
    }

    @Resource(name="factoryServiceImpl")
    private FactoryService factoryService;

    @Resource(name="factoryInfoBaseServiceImpl")
    private FactoryInfoBaseService factoryInfoBaseService;

}
