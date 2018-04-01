package com.catt.hypnus.web.controller.admin.usetime;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.controller.BaseController;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Map;

/**
 * <pre>
 * Description:使用记录Controller
 * Author: runtime
 * Version:
 * Since: Ver 1.1
 * date: 2018-03-09 09:23:12
 * </pre>
 */
@Controller
@RequestMapping(value = "/admin/usetimeMgr")
public class UsetimeController extends BaseController {

    // 设备信息
    @Resource(name = "usetimeServiceImpl")
    private UsetimeService usetimeService;

    /**
     * 设备首页
     */
    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex(Model model, String deviceId) {
        model.addAttribute("deviceId", deviceId);
        return "/admin/usetime/index";
    }

    /**
     * 获取设备分页数据
     *
     * @param pageable
     * @return
     */
    @RequestMapping(value = {"/getPageUsetime"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> getPageShopOwner(String deviceId, Pageable pageable, @CurrentUser Long id) {
        return usetimeService.findPageMap(deviceId, null, null, pageable);
    }


}
