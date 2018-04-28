package com.catt.hypnus.web.controller.admin.statisti;

import com.catt.common.util.lang.DateUtil;
import com.catt.common.web.controller.BaseController;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * 数据统计控制器
 *
 * @author runtime
 * @version V1.0
 * @date 2018/3/12
 */
@Controller("dataStatistiController")
@RequestMapping(value = "/admin/statisti/data")
public class DataStatistiController extends BaseController {


    // 设备信息
    @Resource(name = "deviceServiceImpl")
    private DeviceService deviceService;

    // 订单统计服务接口

    @Resource(name = "usetimeServiceImpl")
    private UsetimeService usetimeService;


    /**
     * 跳转到统计首页
     */
    @RequestMapping(value = "/index.html")
    public String toIndex(Model model, String deviceId, String createDateDay, String endDateDay, Integer type) {
        model.addAttribute("deviceId", deviceId);
        model.addAttribute("createDateDay", createDateDay);
        model.addAttribute("endDateDay", endDateDay);
        model.addAttribute("type", type);
        return "/admin/statisti/data/index";
    }


    /**
     * 统计详细信息
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getDateFromOss"}, method = RequestMethod.POST)
    public Map getDateFromOss(String deviceId, String createDateDay) throws IOException, ParseException {
        String today = DateUtil.format(new Date(), DateUtil.yyyyMMdd);
        createDateDay = createDateDay + " 00:00:00";
        return usetimeService.getDateFromOss(deviceId, createDateDay, createDateDay);
    }

    /**
     * 获取柱状图数据
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getStaticData"}, method = RequestMethod.POST)
    public Map getStaticData(String deviceId, String createDateDay, String endDateDay) {
        String today = DateUtil.format(new Date(), DateUtil.yyyyMMdd);
        return usetimeService.getEventData(deviceId, createDateDay, endDateDay);
    }



    /**
     * 获取呼吸事件数据（设备详情统计数据）
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getBreathEventData"}, method = RequestMethod.POST)
    public Map getBreathEventData(String deviceId) {
        //根据计算规则获取当前日期的前一天
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE,-1);
        String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
        Map breathEventDataMap = usetimeService.getBreathEventData(deviceId,yesterday);
        return breathEventDataMap;
    }

    /**
     * 获取使用信息数据：初次进入详情页面默认统计时间为一天（设备详情统计数据）
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getStatisticsDataUseInfo"}, method = RequestMethod.POST)
    public Map getStatisticsDataUseInfo(String deviceId,String startTime,String endTime) {
        System.out.println("正在努力获取使用信息");
        System.out.println("统计开始时间："+startTime);
        System.out.println("统计结束时间："+endTime);

//        //根据计算规则获取当前日期的前一天
//        Calendar calendar = Calendar.getInstance();
//        calendar.add(Calendar.DATE,-1);
//        String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());

        Map useInfoMap = usetimeService.getStatisticsDataUseInfo(deviceId,startTime,endTime);
        System.out.println("喇叭星！万众期待的使用信息："+useInfoMap);
        return useInfoMap;
    }

}
