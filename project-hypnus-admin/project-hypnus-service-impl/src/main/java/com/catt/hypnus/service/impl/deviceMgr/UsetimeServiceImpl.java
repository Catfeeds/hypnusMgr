package com.catt.hypnus.service.impl.deviceMgr;


import com.catt.common.base.pojo.search.Filter;
import com.catt.common.module.exception.pojo.BaseException;
import com.catt.hypnus.OssDataHandler;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.service.base.deviceMgr.UsetimeBaseService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import com.gci.common.util.lang.DateUtil;
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
import java.util.Collections;
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

    public Map getDateFromOss(String deviceId, String startTime, int timeType) throws IOException {
        Map map = new HashMap();
        /**
         * 1,数据库查询基础数据
         * 2,从oss查询文件列表
         * 3,从文件中读取数据
         * 4,组装数据
         */
        List<String> usetimeStrList = new ArrayList<>();
        List<String> packages = new ArrayList<>();
        List<Usetime> usetimeList = this.findList(deviceId, startTime, null);
        usetimeList.removeAll(Collections.singleton(null));
        if (CollectionUtils.isEmpty(usetimeList)) {
            throw new BaseException("未查询到相关数据");
        }
        usetimeList.forEach(usetime -> {
            String start = usetime.getStarttime();
            usetimeStrList.add(start);

        });


        String keyPre = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/";
        List<String> fileList = OssDataHandler.listOfObject(keyPre);
        fileList.forEach(packageStr -> {
            packages.add(packageStr);
        });
        String pressureKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/pressure.edf";
        String flowKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/flow.edf";
        String difleakKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/difleak.edf";
        String tvKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/mvtvbra.edf";
        String brKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/pressure.edf";
        String biKey = "0a0a0a0a0b0b0b0b0c0c0c0c/2018-01-31/pressure.edf";
        packages.forEach(filekey -> {

        });
        byte[] pressureBytes = OssDataHandler.getObjectData(pressureKey);
//        byte[] flowBytes = OssDataHandler.getObjectData(flowKey);
//        byte[] difleakBytes = OssDataHandler.getObjectData(difleakKey);
//        byte[] tvBytes = OssDataHandler.getObjectData(tvKey);
//        byte[] brBytes = OssDataHandler.getObjectData(brKey);
//        byte[] biBytes = OssDataHandler.getObjectData(biKey);
        List presureList = new ArrayList<>();
        try {
            List<String> timeList = new ArrayList<>();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
            String str = startTime + " 12:00:00.000";
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
                if (i <= pressureBytes.length) {
                    dataList.add(pressureBytes[i]);
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


}
