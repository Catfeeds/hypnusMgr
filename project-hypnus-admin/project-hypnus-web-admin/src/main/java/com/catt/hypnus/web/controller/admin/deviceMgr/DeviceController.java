package com.catt.hypnus.web.controller.admin.deviceMgr;

import com.aliyuncs.exceptions.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.util.lang.DateUtil;
import com.catt.common.web.Message;
import com.catt.common.web.controller.BaseController;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.entity.DeviceShadow;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
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
    public String toDetail(Model model, String deviceId,String createDateDay, String endDateDay) {
        model.addAttribute("createDateDay", DateUtil.format(DateUtil.addDays(new Date(), -1), "yyyy-MM-dd"));
        model.addAttribute("endDateDay", DateUtil.format(new Date(), "yyyy-MM-dd"));
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
    public Message bindFactory(String deviceId, Long factoryId) {
        try {
            deviceService.bindFactory(deviceId, factoryId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/bindUser", method = RequestMethod.POST)
    @ResponseBody
    public Message bindUser(String deviceId, Long userId) {
        try {
            deviceService.bindUser(deviceId, userId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/unbindUser", method = RequestMethod.POST)
    @ResponseBody
    public Message unbindUser(String deviceId) {
        try {
            deviceService.unbindUser(deviceId);
            return Message.success();
        } catch (RuntimeException e) {
            return Message.error(e.getMessage());
        } catch (Exception e) {
            return Message.error("系统异常");
        }
    }

    @RequestMapping(value = "/unbindFactory", method = RequestMethod.POST)
    @ResponseBody
    public Message unbindFactory(String deviceId) {
        try {
            deviceService.unbindFactory(deviceId);
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
    public Message updateShadowDevice(@RequestBody Map deviceShadow, String deviceId) {
        try {
          //  deviceService.updateShadowDevice(deviceShadow, deviceShadow.getDeviceID());
            deviceService.updateShadowDeviceMap(deviceShadow, deviceShadow.get("deviceID").toString());
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
    public DeviceShadow getShadowDevice(String deviceId) throws InvocationTargetException,
            IntrospectionException, InstantiationException, IllegalAccessException, ClientException {
        DeviceShadow deviceShadow = deviceService.getShadowDevice(deviceId);
        return deviceShadow;
    }

    /**
     * 获取统计数据页面的设备信息
     *
     * @param deviceId
     */
    @RequestMapping(value = "/getUseData", method = RequestMethod.POST)
    @ResponseBody
    public Map getUseData(String deviceId, String startTime, String endTime) {
        Map useData = usetimeService.baseStatisticData(deviceId, startTime, endTime);
        return useData;
    }


    /**
     * 获取统计数据页面的设备信息
     *
     * @param deviceId
     */
    @RequestMapping(value = "/getStatisticsDataDeviceInfo", method = RequestMethod.POST)
    @ResponseBody
    public Device getStatisticsDataDeviceInfo(String deviceId) {
        Device device = deviceService.findDeviceByDeviceId(deviceId);
        return device;
    }


    /**
     * 获取统计数据页面的工作参数
     *
     * @param deviceId
     */
    @RequestMapping(value = "/getStatisticsDataWorkParam", method = RequestMethod.POST)
    @ResponseBody
    public Map getStatisticsDataWorkParam(String deviceId) {

        Date today = new Date();

        Map usetimeServiceMap = usetimeService.getStatisticsDataWorkParam(deviceId, today);

//        Map testUseTime = new HashMap();
//        if (CollectionUtils.isNotEmpty(usetimeServiceMapList2)) {
//            testUseTime = usetimeServiceMapList2.get(0);
//        }
        System.out.println("data work param Controller deal with");
        return usetimeServiceMap;

    }

    /**
     * 重写工作参数的实现方法
     * @param deviceId
     * @param startTime
     * @param endTime
     */
    @RequestMapping(value = "/getStatisticsDataWorkParamNew", method = RequestMethod.POST)
    @ResponseBody
    public Map getStatisticsDataWorkParamNew(String deviceId,String startTime,String endTime) {
        //默认一天从中午12点开始算计
        startTime += " 12:00:00";
        endTime += " 12:00:00";
        System.out.println("new work param Controller  starttime ="+startTime+" endtime = "+endTime);
        Map usetimeServiceMap = usetimeService.getStatisticsDataWorkParamPeriod(deviceId, startTime, endTime);
        return usetimeServiceMap;
    }


    // 设备信息
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;

    // 使用时间信息
    @Resource(name = "usetimeServiceImpl")
    private UsetimeService usetimeService;

}
