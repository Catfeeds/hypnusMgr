package com.catt.hypnus.service.impl.deviceMgr;


import com.catt.common.base.pojo.search.Filter;
import com.catt.common.base.pojo.search.Order;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.module.exception.pojo.BaseException;
import com.catt.hypnus.OssDataHandler;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;
import com.catt.hypnus.service.base.deviceMgr.UsetimeBaseService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import com.gci.common.util.lang.DateUtil;
import com.gci.common.util.lang.StringUtil;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 使用记录接口实现类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-14 15:26:28
 */
@Service("usetimeServiceImpl")
public class UsetimeServiceImpl implements UsetimeService {

    private Logger logger = LoggerFactory.getLogger(UsetimeServiceImpl.class);

    public static final int FIVE_MINUTES_TIME = 1000 * 60 * 5 / 80;
    public static final int DAY_TIME = 3600 * 24;
    public static final int WEEK_TIME = DAY_TIME * 7;
    public static final int MONTH_TIME = DAY_TIME * 30;
    public static final int YEAR_TIME = DAY_TIME * 365;

    @Resource(name = "usetimeDaoImpl")
    private UsetimeDao usetimeDao;

    @Resource(name = "usetimeBaseServiceImpl")
    private UsetimeBaseService usetimeBaseService;

    public List<Usetime> findList(String deviceId, String startTime, String endTime) {
        List<Filter> filters = new ArrayList<Filter>();
        filters.add(Filter.eq("deviceId", deviceId));
        List<Usetime> usetimeList = usetimeBaseService.findList(null, filters, null);
        return usetimeList;
    }

    public List<Map> findMapList(String deviceId, String startTime, String endTime){
        return usetimeDao.findMapList(deviceId,startTime,endTime);
    }

    public Page<Usetime> findPage(Pageable pageable, UsetimeForm usetimeForm) {
        List<Filter> filters = new ArrayList<Filter>();
        if (StringUtil.checkStr(usetimeForm.getDeviceId())) {
            filters.add(Filter.eq("deviceId", usetimeForm.getDeviceId()));
        }
        List<Order> orders = new ArrayList<Order>();
        orders.add(Order.desc("starttime"));
        pageable.setFilters(filters);
        pageable.setOrders(orders);
        return usetimeDao.findPage(pageable);
    }

    public Page<Map> findPageMap(String deviceId, String startTime, String endTime, Pageable pageable) {
        return usetimeDao.findPage(deviceId, startTime, endTime, pageable);
    }

    public Map getDateFromOss(String deviceId, String startTime, int timeType) throws IOException {
        Map map = new HashMap();
        /**
         * 1,数据库查询基础数据
         * 2,从oss查询文件列表
         * 3,从文件中读取数据
         * 4,组装数据
         */
//        List<String> usetimeStrList = new ArrayList<>();
//        List<String> packages = new ArrayList<>();
//        List<Map> usetimeList = this.findMapList(deviceId, startTime, null);
//        if (CollectionUtils.isEmpty(usetimeList)) {
//            throw new BaseException("次设备无使用记录");
//        }
//        usetimeList.forEach(usetime -> {
//            String start = usetime.getStarttime();
//            usetimeStrList.add(start);
//
//        });
        String keyPre = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/";
        if (StringUtil.checkStr(deviceId) && StringUtil.checkStr(startTime)) {
            keyPre = deviceId + "/" + startTime + "/";
        }
        List<String> fileList = OssDataHandler.listOfObject(keyPre);
        if (CollectionUtils.isEmpty(fileList)) {
            logger.info("OSS中无数据文件");
            throw  BaseException.errorByErrInfo("OSS中无数据文件");
        }
        short[] pressureBytes = null;
        short[] flowBytes = null;
        short[] difleakBytes = null;
        short[] tvBytes = null;
        short[] brBytes = null;
        short[] biBytes = null;
        for (String fileName : fileList) {
            if (fileName.contains("pressure.edf")) {
                pressureBytes = OssDataHandler.getObjectData(fileName);
            }
            if (fileName.contains("flow.edf")) {
                flowBytes = OssDataHandler.getObjectData(fileName);
            }
            if (fileName.contains("difleak.edf")) {
                difleakBytes = OssDataHandler.getObjectData(fileName);
            }
            if (fileName.contains("tv.edf")) {
                tvBytes = OssDataHandler.getObjectData(fileName);
            }
            if (fileName.contains("br.edf")) {
                brBytes = OssDataHandler.getObjectData(fileName);
            }
            if (fileName.contains("bi.edf")) {
                biBytes = OssDataHandler.getObjectData(fileName);
            }
        }
        List presureList = new ArrayList<>();
        try {
            List<String> timeList = new ArrayList<>();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
            String str = startTime + ".000";
            for (int i = 0; i < timeType; i++) {
                Date dt = sdf.parse(str);
                Calendar rightNow = Calendar.getInstance();
                rightNow.setTime(dt);
                rightNow.add(Calendar.MILLISECOND, 80);//周期为80毫秒
                Date dt1 = rightNow.getTime();
                String dt2 = DateUtil.format(dt1, "yyyy-MM-dd HH:mm:ss.SSS");
                timeList.add(str);
                List dataList = new ArrayList<>();
                dataList.add(timeList.get(i));
                //压力数据
                if (pressureBytes != null && i < pressureBytes.length) {
                    dataList.add(pressureBytes[i]);
                }
                //气流
                if (flowBytes != null && i < flowBytes.length) {
                    dataList.add(flowBytes[i]);
                }
                //漏气
                if (difleakBytes != null && i < difleakBytes.length) {
                    dataList.add(difleakBytes[i]);
                }
                //tv
                if (tvBytes != null && i < tvBytes.length) {
                    dataList.add(tvBytes[i]);
                }
                //br
                if (brBytes != null && i < brBytes.length) {
                    dataList.add(brBytes[i]);
                }
                //bi
                if (biBytes != null && i < biBytes.length) {
                    dataList.add(biBytes[i]);
                }

                presureList.add(dataList);
                str = dt2;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        map.put("pressure", presureList);
        return map;
    }

    public Map baseStatisticData(String deviceId, String startTime, String endTime) {
        List<Usetime> usetimeList = this.findList(deviceId, startTime, endTime);
        /**
         * 平均压力=压力1*时间1+压力2*时间2/时间1+时间2
         * 90%压力计算
         * 1，按照压力大小正序排序
         * 2，计算压力之和*90%
         * 3，逐个累加压力并与90%*sum进行比较，前值初次超过后值，当前usetime压力作为90%压力；
         */
        //压力总数
        Double sumPresure = 0D;
        //累加总数
        Double changePresure = 0D;
        Double pecentSumPresure = 0D;
        //90%压力值
        Double pecentPresure = 0D;
        //时间总数
        Long sumPeroid = 0l;
        for (Usetime usetime : usetimeList) {
            Double currDouble = (Double) usetime.getPressure1() * usetime.getPeroid();
            sumPresure += currDouble;
            sumPeroid += usetime.getPeroid();
        }
        pecentSumPresure = sumPresure * 0.9;
        for (Usetime usetime : usetimeList) {
            Double currDouble = (Double) usetime.getPressure1() * usetime.getPeroid();
            changePresure += currDouble;
            if (changePresure >= pecentSumPresure) {
                pecentPresure = usetime.getPressure1();
            }
        }

        /**
         * 压力柱状图计算
         * 当天的50%压力，90%压力两条柱状图
         */
        /**
         * usetime柱状图，统计当天的使用时长
         */


        return null;

    }


}
