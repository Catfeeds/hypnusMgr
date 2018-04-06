package com.catt.hypnus.web.controller.admin.statisti;

import com.catt.common.util.lang.DateUtil;
import com.catt.common.web.controller.BaseController;
import com.catt.hypnus.repository.data.comEnum.DateDimension;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.service.deviceMgr.DeviceService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.IOException;
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
    public String toIndex(Model model, String deviceId, String startTime) {
        Date now = new Date();
        Date monthFirstDateTime = DateUtil.getMonthFirstDateTime(now);
        model.addAttribute("createDateDay", DateUtil.format(monthFirstDateTime, DateUtil.yyyyMMdd));
        model.addAttribute("endDateDay", DateUtil.format(now, DateUtil.yyyyMMdd));
        model.addAttribute("createDateMonth", DateUtil.format(DateUtil.getCurrYearFirst(), "yyyy-MM"));
        model.addAttribute("endDateMonth", DateUtil.format(now, "yyyy-MM"));
        model.addAttribute("deviceId", deviceId);
        model.addAttribute("startTime", startTime);
        return "/admin/statisti/data/index";
    }


    /**
     * 统计详细信息
     *
     * @param dateDimension 统计周期
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getDateFromOss"}, method = RequestMethod.POST)
    public Map getDateFromOss(String deviceId, String startTime, DateDimension dateDimension) throws IOException {
        return usetimeService.getDateFromOss(deviceId, startTime, Usetime.FIVE_MINUTES_TIME);
    }

    /**
     * 获取柱状图数据
     *
     * @param endCreateDate 统计结束时间
     * @param dateDimension 统计周期
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getStaticData"}, method = RequestMethod.POST)
    public Map getStaticData(String deviceId, Date endCreateDate, DateDimension dateDimension) {
        return usetimeService.getEventData(deviceId, null, null);
    }

}
