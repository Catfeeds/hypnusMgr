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

    // 使用时间信息

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
    public Map getDateFromOss(String deviceId, String selectDate) throws IOException, ParseException {
        String today = DateUtil.format(new Date(), DateUtil.yyyyMMdd);
     //   today += " 12:00:00";
     //   createDateDay = createDateDay + " 12:00:00";
      //  Map ret = usetimeService.getDateFromOss(deviceId, createDateDay, today);
        Map ret = usetimeService.getDetailFormOss(deviceId,selectDate);
        return ret;

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

        //从事件表中读取数据
//        Map dataMap = usetimeService.getEventData(deviceId, createDateDay, endDateDay);

//        System.out.println("事件表柱状图map："+dataMap);

        //从t_dev_day_statistics表中读取数据
        Map chartDataMap = usetimeService.getStatisticsChartData(deviceId, createDateDay, endDateDay);

        System.out.println("新的表柱状图map："+chartDataMap);

        return chartDataMap;

//        return dataMap;
    }


    /**
     * 获取使用信息数据：初次进入详情页面默认统计时间为一天（设备详情统计数据）
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getStatisticsDataUseInfo"}, method = RequestMethod.POST)
    public Map getStatisticsDataUseInfo(String deviceId,String startTime,String endTime) {
        Map useInfoMap = usetimeService.getStatisticsDataUseInfo(deviceId,startTime,endTime);
        return useInfoMap;
    }

    /**
     * 获取统计数据页面的潮气量，分钟通气量，呼吸频率，呼吸比（从OSS文件中读取）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     */
    @RequestMapping(value = "/getStatisticsDataFromOSS", method = RequestMethod.POST)
    @ResponseBody
    public Map getStatisticsDataFromOSS(String deviceId,String startTime,String endTime){
        Map ossDataMap = usetimeService.getStatisticsDataFromOSS(deviceId,startTime,endTime);
        return ossDataMap;
    }

    /**
     * 获取呼吸事件数据（设备详情统计数据）
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getBreathEventData"}, method = RequestMethod.POST)
    public Map getBreathEventData(String deviceId,String startTime,String endTime) {
        Map breathEventDataMap = usetimeService.getBreathEventData(deviceId,startTime,endTime);
        return breathEventDataMap;
    }

    /**
     * 获取漏气信息数据（设备详情统计数据）
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getLeakInfoData"}, method = RequestMethod.POST)
    public Map getLeakInfoData(String deviceId,String startTime,String endTime) {
        Map leakInfoDataMap = usetimeService.getLeakInfoData(deviceId,startTime,endTime);
        return leakInfoDataMap;
    }


}
