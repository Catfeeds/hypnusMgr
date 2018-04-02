package com.catt.hypnus.web.controller.admin.deviceMgr;

import com.aliyuncs.exceptions.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.web.Message;
import com.catt.common.web.controller.BaseController;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.entity.DeviceShadow;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * <pre>
 * Description:Admin公共Controller
 * Author: runtime
 * Version:
 * Since: Ver 1.1
 * date: 2015-10-09 09:23:12
 * </pre>
 */
@Controller
@RequestMapping(value = "/admin/deviceMgr")
public class DeviceController extends BaseController {

    /**
     * 设备首页
     */
    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String toIndex() {
        return "/admin/device/index";
    }

    /**
     * 设备首页
     */
    @RequestMapping(value = {"/list.html"}, method = RequestMethod.GET)
    public String toRelList() {
        return "/admin/device/list";
    }

    /**
     * 设备参数
     */
    @RequestMapping(value = {"/detail.html"}, method = RequestMethod.GET)
    public String toDetail(Model model, String deviceId) {

        model.addAttribute("deviceId", deviceId);
        return "/admin/device/detail";
    }

    /**
     * 设备参数设置
     */
    @RequestMapping(value = {"/paramSet.html"}, method = RequestMethod.GET)
    public String toParamSet(Model model, String deviceId) {
        model.addAttribute("deviceId", deviceId);
        return "/admin/device/deviceDetail";
    }


    @RequestMapping(value = "/selectUserPage/{deviceId}", method = RequestMethod.GET)
    public String toSelectUserPage(@PathVariable("deviceId") String deviceId,
                                   HttpServletRequest request, Model model) {
        model.addAttribute("deviceId", deviceId);
        return "/admin/device/chooseCus";
    }


    @RequestMapping(value = "/selectFactoryPage/{deviceId}", method = RequestMethod.GET)
    public String toSelectFactoryPage(@PathVariable("deviceId") String deviceId,
                                      HttpServletRequest request, Model model) {
        model.addAttribute("deviceId", deviceId);
        return "/admin/device/chooseFactory";
    }

    @RequestMapping(value = {"/getPageList"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> getRelPageList(DeviceForm deviceForm, Pageable pageable, @CurrentUser Long id) {
        return deviceService.findRelPage(deviceForm, id, pageable);
    }

    /**
     * 获取设备分页数据
     *
     * @param pageable
     * @return
     */
    @RequestMapping(value = {"/getPageDevice"}, method = RequestMethod.POST)
    @ResponseBody
    public Page<Map> getPageShopOwner(DeviceForm deviceForm, Pageable pageable, @CurrentUser Long id) {
        return deviceService.findPage(deviceForm, pageable);
    }

    @RequestMapping(value = "/bindFactory", method = RequestMethod.POST)
    @ResponseBody
    public Message bindFactory(Long id, Long factoryId) {
        try {
            deviceService.bindFactory(id, factoryId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/bindUser", method = RequestMethod.POST)
    @ResponseBody
    public Message bindUser(Long id, Long userId) {
        try {
            deviceService.bindUser(id, userId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/unbindUser", method = RequestMethod.POST)
    @ResponseBody
    public Message unbindUser(Long id) {
        try {
            deviceService.unbindUser(id);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/unbindFactory", method = RequestMethod.POST)
    @ResponseBody
    public Message unbindFactory(Long id) {
        try {
            deviceService.unbindFactory(id);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    /**
     * 更新影子设备参数
     *
     * @param deviceShadow
     * @param deviceId
     * @return
     */
    @RequestMapping(value = "/updateShadowDevice", method = RequestMethod.POST)
    @ResponseBody
    public Message updateShadowDevice(DeviceShadow deviceShadow, String deviceId) {
        try {
            deviceService.updateShadowDevice(deviceShadow, deviceId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    /**
     * 获取影子设备参数
     *
     * @param deviceId
     * @return
     * @throws InvocationTargetException
     * @throws IntrospectionException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws ClientException
     */
    @RequestMapping(value = "/getShadowDevice", method = RequestMethod.POST)
    @ResponseBody
    public DeviceShadow getShadowDevice(String deviceId) throws InvocationTargetException, IntrospectionException, InstantiationException, IllegalAccessException, ClientException {
        DeviceShadow deviceShadow = deviceService.getShadowDevice(deviceId);
        return deviceShadow;
    }

    // 设备信息
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;

}
