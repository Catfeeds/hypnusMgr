package com.catt.hypnus.web.controller.admin.deviceMgr;

import com.aliyuncs.exceptions.ClientException;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.util.lang.DateUtil;
import com.catt.common.web.Message;
import com.catt.common.web.controller.BaseController;
import com.catt.common.web.spring.resolver.annotation.CurrentUser;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.repository.entity.userMgr.DeviceShadowDTO;
import com.catt.hypnus.repository.form.deviceMgr.DeviceForm;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.*;

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
    public Message updateShadowDevice(DeviceShadowDTO deviceShadow, String deviceId) {
        try {
            deviceService.updateShadowDevice(deviceShadow, deviceShadow.getDeviceID());
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
    public DeviceShadowDTO getShadowDevice(String deviceId) throws InvocationTargetException,
            IntrospectionException, InstantiationException, IllegalAccessException, ClientException {
        DeviceShadowDTO deviceShadow = deviceService.getShadowDevice(deviceId);
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
     * 获取统计数据页面的设备信息，工作参数
     *
     * @param deviceId
     */
    @RequestMapping(value = "/getStatisticsDataWorkParam", method = RequestMethod.POST)
    @ResponseBody
    public Map getStatisticsDataWorkParam(String deviceId) {
        Date today = new Date();
        Map workParamMap = usetimeService.getStatisticsDataWorkParam(deviceId, today);
//         System.out.println("您获取的workParamMap是：");
//         System.out.println(workParamMap);
        return workParamMap;
    }


    /**
     * 获取统计数据页面的潮气量，分钟通气量，呼吸频率，呼吸比，呼吸事件，漏气信息
     *
     * @param deviceId
     */
    @RequestMapping(value = "/getStatisticsDataFromOSS", method = RequestMethod.POST)
    @ResponseBody
    public Map getStatisticsDataFromOSS(String deviceId) throws IOException, ParseException {

//        System.out.println("正在努力从OSS中获取相关数据");

        String startTime = "2018-04-12 14:00:00";
        String endTime = "2018-04-13 18:13:13";


        Map map = usetimeService.getDateFromOss(deviceId, startTime, endTime);
//        System.out.println("您获取的数据是：");
//        System.out.println(map);

        List plist = (List) map.get("pressure");

        int plistSize = plist.size();

        //1.计算潮气量
        //1.1.获取所有潮气量数值
        List sortTVList = new ArrayList<>();

        for (int i = 0; i < plistSize; i++) {
            List tvList = (List) plist.get(i);
            if (tvList.size() > 6) {
                short tvValue = (short) tvList.get(6);
                sortTVList.add(tvValue);
            }
        }
        //1.2.按照从小到大排列潮气量数值
        Collections.sort(sortTVList);

        //1.3.取50%与90%位置的数值

        short fiftyPercentTV = (short) sortTVList.get((int) (sortTVList.size() * 0.5));

        short ninetyPercentTV = (short) sortTVList.get((int) (sortTVList.size() * 0.9));


        //2.计算分钟通气量
        //2.1.获取所有吸气时长（BI）和呼吸频率（BR）数值
        List sortMVList = new ArrayList<>();

        for (int i = 0; i < plistSize; i++) {
            List mvList = (List) plist.get(i);
            short biValue = (short) mvList.get(1);
            byte brValue = (byte) mvList.get(2);
            double mvValue = (double) (biValue * brValue);

            DecimalFormat df = new DecimalFormat("0.0");
            sortMVList.add(df.format(mvValue * 0.001));
        }
        //2.2.按照从小到大排列分钟通气量数值
        Collections.sort(sortMVList);

        //2.3.取50%与90%位置的数值

        String fiftyPercentMV = (String) sortMVList.get((int) (sortMVList.size() * 0.5));

        String ninetyPercentMV = (String) sortMVList.get((int) (sortMVList.size() * 0.9));


        //3.计算呼吸频率
        //3.1.获取所有呼吸频率数值
        List sortBRList = new ArrayList<>();

        for (int i = 0; i < plistSize; i++) {
            List brList = (List) plist.get(i);
            byte brValue = (byte) brList.get(2);
            sortBRList.add(brValue);
        }
        //3.2.按照从小到大排列呼吸频率数值
        Collections.sort(sortBRList);

        //3.3.取50%与90%位置的数值

        byte fiftyPercentBR = (byte) sortBRList.get((int) (sortBRList.size() * 0.5));

        byte ninetyPercentBR = (byte) sortBRList.get((int) (sortBRList.size() * 0.9));


        //4.计算呼吸比
        //4.1.获取所有呼吸频率，吸气时长数值
        List sortBPList = new ArrayList<>();

        for (int i = 0; i < plistSize; i++) {
            List birList = (List) plist.get(i);
            short biValue = (short) birList.get(1);
            byte brValue = (byte) birList.get(2);
            byte bpValue = 0;

            if (brValue != 0) {
                // 计算呼气时长
                byte boValue = (byte) (60 / brValue - biValue);
                //呼吸比 = 呼气时长/吸气时长
                bpValue = (byte) (boValue / biValue);
            } else {
                bpValue = 0;
            }
            sortBPList.add(bpValue);
        }
        //4.2.按照从小到大排列呼吸比数值
        Collections.sort(sortBPList);

        //4.3.取50%与90%位置的数值

        byte fiftyPercentBP = (byte) sortBPList.get((int) (sortBPList.size() * 0.5));

        byte ninetyPercentBP = (byte) sortBPList.get((int) (sortBPList.size() * 0.9));


        //组装数据
        HashMap ossDataMap = new HashMap();
        //潮气量
        ossDataMap.put("fiftyPercentTV", fiftyPercentTV);
        ossDataMap.put("ninetyPercentTV", ninetyPercentTV);

        //分钟通气量
        ossDataMap.put("fiftyPercentMV", fiftyPercentMV);
        ossDataMap.put("ninetyPercentMV", ninetyPercentMV);

        //呼吸频率
        ossDataMap.put("fiftyPercentBR", fiftyPercentBR);
        ossDataMap.put("ninetyPercentBR", ninetyPercentBR);

        //呼吸比
        ossDataMap.put("fiftyPercentBP", fiftyPercentBP);
        ossDataMap.put("ninetyPercentBP", ninetyPercentBP);

        return ossDataMap;
    }


    // 设备信息
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;

    // 使用时间信息
    @Resource(name = "usetimeServiceImpl")
    private UsetimeService usetimeService;

}
