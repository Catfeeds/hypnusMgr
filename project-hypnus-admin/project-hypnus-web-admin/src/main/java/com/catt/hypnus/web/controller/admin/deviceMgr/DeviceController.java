package com.catt.hypnus.web.controller.admin.deviceMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.controller.BaseController;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * <pre>
 * Description:Admin公共Controller
 * Author: Chen zeming
 * Version:
 * Since: Ver 1.1
 * date: 2015-10-09 09:23:12
 * </pre>
 */
@Controller
@RequestMapping(value = "/admin/deviceMgr")
public class DeviceController extends BaseController {

    // 设备信息
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;

    /**
     * 设备首页
     */
    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex() {
        return "/admin/device/index";
    }


    /**
     * 获取设备分页数据
     *
     * @param pageable
     * @return
     */
    @RequestMapping(value = {"/getPageDevice"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Device> getPageShopOwner(Pageable pageable) {
        return deviceService.findPage(pageable);
    }

}
