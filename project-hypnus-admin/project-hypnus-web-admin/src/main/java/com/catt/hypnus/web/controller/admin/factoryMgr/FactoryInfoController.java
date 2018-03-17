package com.catt.hypnus.web.controller.admin.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.form.customerMgr.FactoryInfoFrom;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.repository.form.factoryMgr.FactoryForm;
import com.catt.hypnus.service.factoryMgr.FactoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

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
}
