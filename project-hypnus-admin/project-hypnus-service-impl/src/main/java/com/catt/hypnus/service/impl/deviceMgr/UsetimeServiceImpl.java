package com.catt.hypnus.service.impl.deviceMgr;


import com.catt.common.base.pojo.search.Filter;
import com.catt.common.base.pojo.search.Order;
import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.module.exception.pojo.BaseException;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.DateUtil;
import com.catt.hypnus.OssDataHandler;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.dao.eventMgr.*;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;
import com.catt.hypnus.service.base.deviceMgr.UsetimeBaseService;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import com.gci.common.util.lang.StringUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.*;
import java.util.*;

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

    /**
     * AI事件
     */
    @Resource(name = "apneaEventDaoImpl")
    private ApneaEventDao apneaEventDao;

    /**
     * Hi事件
     */
    @Resource(name = "hypopneaEventDaoImpl")
    private HypopneaEventDao hypopneaEventDao;

    /**
     * CSA
     */
    @Resource(name = "csaEventDaoImpl")
    private CsaEventDao csaEventDao;

    /**
     * CSR
     */
    @Resource(name = "csrEventDaoImpl")
    private CsrEventDao csrEventDao;

    /**
     * PB
     */
    @Resource(name = "pbEventDaoImpl")
    private PbEventDao pbEventDao;


    @Resource(name = "usetimeBaseServiceImpl")
    private UsetimeBaseService usetimeBaseService;

    public List<Usetime> findList(String deviceId, String startTime, String endTime) {
        List<Filter> filters = new ArrayList<Filter>();
        filters.add(Filter.eq("deviceId", deviceId));
        List<Usetime> usetimeList = usetimeBaseService.findList(null, filters, null);
        return usetimeList;
    }

    public List<Map> findMapList(String deviceId, String startTime, String endTime) {
        return usetimeDao.findMapList(deviceId, startTime, endTime);
    }

    /**
     * 查询当天使用数据
     *
     * @param deviceId
     * @param today
     * @return
     */
    public List<Map> findListByDay(String deviceId, Date today) {
        GregorianCalendar ca = new GregorianCalendar();
        Calendar cal = Calendar.getInstance();
        Date yesterday = DateUtil.addDays(today, -1);
        Date startDate = null;
        Date endDate = null;
        //上午,以当前时间为结束时间
        if (ca.get(GregorianCalendar.AM_PM) == 0) {
            endDate = today;
        } else { //当前为下午，取当天12点
            cal.set(Calendar.HOUR, 23);
            cal.set(Calendar.SECOND, 59);
            cal.set(Calendar.MINUTE, 59);
            endDate = DateUtil.addDays(cal.getTime(), -1);
        }
        cal.setTime(yesterday);
        cal.set(Calendar.HOUR, 24);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MINUTE, 0);
        startDate = DateUtil.addDays(cal.getTime(), -1);
        List<Map> list = usetimeDao.findList(deviceId, startDate, endDate);
        if (CollectionUtils.isEmpty(list)) {
            throw BaseException.errorByErrInfo("无使用记录数据");
        }
        return list;

    }


    /**
     * 获取设备信息，工作参数数据（设备详情统计数据）
     *
     * @param deviceId
     * @param today
     * @return
     */
    public Map getStatisticsDataWorkParam(String deviceId, Date today) {
        //由于数据库没有最新记录，所以用固定的开始时间进行测试
        String todayStringTest = "2018-04-11 16:06:38";

        //当天日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String todayString = sdf.format(today);
        //昨天日期
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE,-1);
        String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());

        Map workParamMap = usetimeDao.getStatisticsDataWorkParam(deviceId, todayStringTest);

        workParamMap.put("yesterday",yesterday);
        workParamMap.put("today",todayString);

        return workParamMap;

    }

    /**
     * 重载一个获取设备信息，工作参数数据（设备详情统计数据）
     * @auth lizb
     * @param deviceId
     * @param starttime
     * @param endtime
     * @return
     */
    public Map getStatisticsDataWorkParamPeriod(String deviceId, String starttime, String endtime) {

        List<Map> workParamMaplist = usetimeDao.getStatisticsDataWorkParamPeriod(deviceId, starttime, endtime);
        Map workParamMap = new HashMap();
        Set modes = new HashSet();
        Set pres1 = new HashSet();
        Set pres2 = new HashSet();
        Set startp = new HashSet();
        Set delay = new HashSet();
        for(Map<String, Object>map : workParamMaplist){
            modes.add(map.get("mode"));
            pres1.add(map.get("presure1"));
            pres2.add(map.get("presure2"));
            startp.add(map.get("startPresure"));
            delay.add(map.get("cureDelay"));
        }
        if(modes.size()==1)
        {
            workParamMap.put("mode",workParamMaplist.get(0).get("mode"));
        }
        else
        {//模式冲突
            workParamMap.put("mode",0);
        }

        if(pres1.size()==1)
        {
            Double tempp = ((Double) workParamMaplist.get(0).get("presure1"))/10.0;
            workParamMap.put("presure1", tempp.toString()+" cmH2O");
        }
        else
            workParamMap.put("presure1","设置冲突");

        if(pres2.size()==1){
            Double temp2 = ((Double)workParamMaplist.get(0).get("presure2"))/10.0;
            workParamMap.put("presure2",temp2.toString()+" cmH2O");
        }else
            workParamMap.put("presure2","设置冲突");

        if(startp.size()==1) {
            Double temp3 = ((Double)workParamMaplist.get(0).get("startPresure"))/10.0;
            workParamMap.put("startPresure", temp3.toString()+" cmH2O");
        }else
            workParamMap.put("startPresure","设置冲突");

        if(delay.size()==1)
            workParamMap.put("cureDelay",workParamMaplist.get(0).get("cureDelay")+" Min");
        else
            workParamMap.put("cureDelay","设置冲突");

//        if(!workParamMaplist.isEmpty())
//            workParamMap = workParamMaplist.get(0);

        workParamMap.put("model",workParamMaplist.get(0).get("model"));
        workParamMap.put("dataVersion",workParamMaplist.get(0).get("dataVersion"));
        workParamMap.put("yesterday",starttime);
        workParamMap.put("today",endtime);
        return workParamMap;

    }

    public List<Map> findListByTimeStr(String deviceId, String startTime, String endTime) {
        return usetimeDao.findListByTimeStr(deviceId, startTime, endTime);
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

    /**
     * @param deviceId
     * @param selectDate 一天的标识,注意靠前
     * @return
     * @throws IOException
     * @throws ParseException
     */
    public Map getDetailFormOss(String deviceId, String selectDate) throws IOException, ParseException{
        Map map = new HashMap();
        Map usetimeMap = new HashMap();
      //  Map pathList = new HashMap<>();
        List presureList = new ArrayList<>();
        /**
         * 1,数据库查询基础数据
         * 2,从oss查询文件列表
         * 3,从文件中读取数据
         * 4,组装数据
         */
        //0.先做必要的时间转换
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat format3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        ParsePosition pos = new ParsePosition(0);
        Date stime = format1.parse(selectDate);
        Calendar c = Calendar.getInstance();
        c.setTime(stime);
        c.add(Calendar.DAY_OF_MONTH, 1);// 今天+1天
        Date etime = c.getTime();
        String afterSelectDate = format1.format(etime);


        //1,数据库查询基础数据
        List<Map> usetimeList = this.findMapList(deviceId, selectDate, afterSelectDate);
        //用完了将选定时间设置会规定时间
        c.setTime(stime);
        c.add(Calendar.HOUR_OF_DAY, 12);
        stime = c.getTime();
        c.setTime(etime);
        c.add(Calendar.HOUR_OF_DAY, 12);
        etime = c.getTime();

        if (CollectionUtils.isEmpty(usetimeList)) {
            logger.info("无使用记录");
            return  null;
        }
        else {  //有usetime才处理
            for(int i=0; i< usetimeList.size();i++)
            {//先读出所有的可能usetime
                pos.setIndex(0);
                Date key = format2.parse(MapUtil.getString(usetimeList.get(i), "starttime"), pos);
                pos.setIndex(0);
                Date value = format2.parse(MapUtil.getString(usetimeList.get(i), "endTime"), pos);
                //注意边界时间边界可能越出
                usetimeMap.put(key , value);
            }

         /*   if (StringUtil.checkStr(deviceId) && StringUtil.checkStr(selectDate)) {
                usetimeList.forEach(usetime -> {
                    String start = MapUtil.getString(usetime, "starttime");
                    pathList.add(start ,deviceId + "/" + start + "/");
                });
            }
            else{
                logger.info("无法正确生成文件路径！");
                return null;
            }*/
            int addperoid = 500;  // 设置数据间隔为2000ms
            double gap80 = addperoid/80;
            double gap5000 = addperoid/5000d;
            double gap10000 = addperoid/10000d;

            Iterator<Map.Entry<Date, Date>> entries = usetimeMap.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<Date, Date> entry = entries.next();
                //a.时间先计算偏差范围
                int startoff=-1, endoff=-1;
                if(entry.getKey().before(stime)){
                    if(entry.getValue().before(stime))
                        continue;

                    //计算startoff
                    startoff = (int)((stime.getTime()-entry.getKey().getTime()));
                }
                if(entry.getValue().after(etime)){
                    if(entry.getKey().after(etime))
                        continue;
                    //计算startoff
                    endoff = (int) ((etime.getTime()- entry.getKey().getTime()));
                }

                String pathPre = deviceId + "/" + format2.format(entry.getKey()) + "/";
                List<String> fileLists = OssDataHandler.listOfObject(pathPre);
                if (CollectionUtils.isEmpty(fileLists)) {
                    logger.info("OSS中无数据文件");
                    return null;
                } else {
                    //接下要拼装数据及其重要
                    short[] pressAarry = null;
                    byte[] flowAarry = null;
                    byte[] difAarry = null;
                    short[] tvAarry = null;
                    short[] brAarry = null;
                    for (String fileName : fileLists) {
                        if (fileName.contains("pressure.edf")) {
                            pressAarry = OssDataHandler.getObjectDataShort(fileName,startoff/80,endoff/80);  //注意数据间隔是80ms
                        }
                        else if (fileName.contains("flow.edf")) {
                            flowAarry = OssDataHandler.getObjectDataByte(fileName,startoff,endoff);//注意数据间隔是80ms
                        }
                        else if (fileName.contains("difleak.edf")) {
                            difAarry = OssDataHandler.getObjectDataByte(fileName,startoff/5000,endoff/5000);//注意数据间隔是5000ms
                        }
                        else if (fileName.contains("tv.edf")) {
                            tvAarry = OssDataHandler.getObjectDataShort(fileName,startoff/10000,endoff/10000); ////注意数据间隔是10000ms
                        }
                        else if (fileName.contains("br.edf")) {
                            brAarry = OssDataHandler.getObjectDataShort(fileName,startoff/10000,endoff/10000); //注意数据间隔是10000ms
                        }
                     /*   if (fileName.contains("bi.edf")) {
                            short[] temp = OssDataHandler.getObjectData(fileName);

                        }*/
                    }

                    //组合数据


                    c.setTime(entry.getKey());
                    short[] s0 = new short[]{0};
                    byte[] b0 = new byte[]{0};
                    for(int i=0; i< (int)(entry.getValue().getTime()- entry.getKey().getTime())/addperoid; i++) {
                        c.add(Calendar.MILLISECOND, addperoid);
                        Date temp = c.getTime();

                        List dataList = new ArrayList<>();
                        dataList.add(format3.format(temp));
                        //压力数据
                        int tempPrss = (int)(i*gap80);
                        if (pressAarry != null && tempPrss < pressAarry.length) {
                            dataList.add(pressAarry[tempPrss]);
                        } else {
                            dataList.add(s0[0]);
                        }
                        //气流
                        if (flowAarry != null && tempPrss < flowAarry.length) {
                            dataList.add(flowAarry[tempPrss]);
                        } else {
                            dataList.add(b0[0]);
                        }
                        //漏气
                        int tempdif = (int)(i*gap5000);
                        if (difAarry != null && tempdif < difAarry.length) {
                            dataList.add(difAarry[tempdif]);
                        } else {
                            dataList.add(b0[0]);
                        }
                        //tv
                        int tempmv = (int)(i*gap10000);
                        if (tvAarry != null && tempmv < tvAarry.length) {
                            dataList.add(tvAarry[tempmv]);
                        } else {
                            dataList.add(s0[0]);
                        }
                        //br
                        if (brAarry != null && tempmv < brAarry.length) {
                            dataList.add(brAarry[tempmv]);
                        } else {
                            dataList.add(s0[0]);
                        }
                        //bi
                        if (tvAarry!=null && brAarry != null && tempmv < tvAarry.length && tempmv < brAarry.length) {
                            dataList.add(tvAarry[tempmv]*brAarry[tempmv]);
                        } else {
                            dataList.add(s0[0]);
                        }

                        presureList.add(dataList);
                    }
                }
            }
            map.put("pressure", presureList);
        }
        return map;
    }


    public Map getDateFromOss(String deviceId, String startTime, String endTime) throws IOException, ParseException {
        Map map = new HashMap();
        /**
         * 1,数据库查询基础数据
         * 2,从oss查询文件列表
         * 3,从文件中读取数据
         * 4,组装数据
         */

        //1.检查设备有无使用记录
        List<String> usetimeStrList = new ArrayList<>();
//        List<String> packages = new ArrayList<>();
        String startTimeStr = "";
        Map usetimeMap = new HashMap();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        ParsePosition pos = new ParsePosition(0);
     //

        List<Map> usetimeList = this.findMapList(deviceId, startTime, endTime);
        if (CollectionUtils.isEmpty(usetimeList)) {
            logger.info("无使用记录");
            startTimeStr = startTime + "";
        } else {
            startTimeStr = MapUtil.getString(usetimeList.get(0), "starttime");
            for(int i=0; i< usetimeList.size();i++)
            {
                pos.setIndex(0);
                Date key = formatter.parse(MapUtil.getString(usetimeList.get(i), "starttime"), pos);
                pos.setIndex(0);
                Date value = formatter.parse(MapUtil.getString(usetimeList.get(i), "endTime"), pos);
                usetimeMap.put(key , value);
            }
        }

        //2.检查OSS中有无数据文件
        List<String> fileLists = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(usetimeList)) {
            usetimeList.forEach(usetime -> {
                String start = MapUtil.getString(usetime, "starttime");
                usetimeStrList.add(start);

            });
            for (String str : usetimeStrList) {
                String keyPre = "";
                if (StringUtil.checkStr(deviceId) && StringUtil.checkStr(startTime)) {
                    keyPre = deviceId + "/" + str + "/";
                }
                List<String> fileList = OssDataHandler.listOfObject(keyPre);
                fileLists.addAll(fileList);
            }
        }

        //3.从OSS文件中读取数据
        short[] pressureBytes = null;//一次治疗开始到结束的实时“压力”值
        byte[] flowBytes = null;//一次治疗开始到结束的实时“流量”值
        byte[] difleakBytes = null;//一次治疗开始到结束的实时“漏气”值
        short[] tvBytes = null;//一次治疗开始到结束的实时“潮气量”值
        short[] brBytes = null;//一次治疗开始到结束的实时“呼吸频率”值
        short[] biBytes = null;//一次治疗开始到结束的实时“吸气时长”值

        Map presIndex = new HashMap();

        if (CollectionUtils.isEmpty(fileLists)) {
            logger.info("OSS中无数据文件");
        } else {
            // 利用OssDataHandler从OSS文件中读取数据
            for (String fileName : fileLists) {
                String[] tempstr = fileName.split("/");
               // pos.setIndex(0);
               // Date key = formatter.parse(tempstr[1]);
                if (fileName.contains("pressure.edf")) {
                    short[] temp = OssDataHandler.getObjectData(fileName);
                    if(pressureBytes == null)
                        presIndex.put(tempstr[1], 0);
                    else
                        presIndex.put(tempstr[1], pressureBytes.length);
                    pressureBytes = (short[]) ArrayUtils.addAll(pressureBytes, temp);
                }
                if (fileName.contains("flow.edf")) {
                    byte[] temp = OssDataHandler.getObjectData2Byte(fileName);
                    flowBytes = (byte[]) ArrayUtils.addAll(flowBytes, temp);
                }
                if (fileName.contains("difleak.edf")) {
                    byte[] temp = OssDataHandler.getObjectData2Byte(fileName);
                    difleakBytes = (byte[]) ArrayUtils.addAll(difleakBytes, temp);
                }
                if (fileName.contains("tv.edf")) {
                    short[] temp = OssDataHandler.getObjectData(fileName);
                    tvBytes = (short[]) ArrayUtils.addAll(tvBytes, temp);
                }
                if (fileName.contains("br.edf")) {
                    short[] temp = OssDataHandler.getObjectData(fileName);
                    brBytes = (short[]) ArrayUtils.addAll(brBytes, temp);
                }
                if (fileName.contains("bi.edf")) {
                    short[] temp = OssDataHandler.getObjectData(fileName);
                    biBytes = (short[]) ArrayUtils.addAll(biBytes, temp);
                }
            }
        }

        //组装数据
        List presureList = new ArrayList<>();
        List<String> timeList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String str = startTimeStr + ".000";
        // 循环统计一天的数据
        String strtest = startTime +" 12:00:00";
        int gap = 25;
        double gapdif = gap/(12.5d*5);
        double gapmv = gap/125d;

        //lizb rewrite it
/*        pos.setIndex(0);
        Date strtodate = formatter.parse(strtest, pos);
        for (int i = 0; i < 24 * 60 * 10; i++){
            Calendar rightNow = Calendar.getInstance();
            rightNow.setTime(strtodate);
            rightNow.add(Calendar.MILLISECOND, 12000);//周期为80毫秒
            strtodate= rightNow.getTime();
            String dt2 = DateUtil.format(strtodate, "yyyy-MM-dd HH:mm:ss.SSS");
            List dataList = new ArrayList<>();
            dataList.add(dt2);

            boolean ret = false;
            Date retDate = null ;
            String retstr = null;
            Iterator<Map.Entry<Date, Date>> entries = usetimeMap.entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<Date, Date> entry = entries.next();
                if(strtodate.compareTo(entry.getKey())>=0 && strtodate.compareTo(entry.getValue())<=0){
                    ret = true;
                    SimpleDateFormat dsa = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    retDate = entry.getKey();
                    retstr = formatter.format(retDate);
                    break;
                }
            }

            short[] s0 = new short[]{0};
            byte[] bytes = new byte[]{0};
            if(ret)
            {
                int offset = (int)presIndex.get(retstr) ;
                offset += (int)((strtodate.getTime() - retDate.getTime())/12000);
                //压力数据
                if (pressureBytes != null && offset < pressureBytes.length) {
                    dataList.add(pressureBytes[i]);
                } else {
                    dataList.add(s0[0]);
                }
                //气流
                if (flowBytes != null && i < flowBytes.length) {
                    dataList.add(flowBytes[i*gap]);
                } else {
                    dataList.add(bytes[0]);
                }
                //漏气
                int tempdif = (int)(i*gapdif);
                if (difleakBytes != null && tempdif < difleakBytes.length) {
                    dataList.add(difleakBytes[tempdif]);
                } else {
                    dataList.add(bytes[0]);
                }
                //tv
                int tempmv = (int)(i*gapmv);
                if (tvBytes != null && tempmv < tvBytes.length) {
                    dataList.add(tvBytes[tempmv]);
                } else {
                    dataList.add(bytes[0]);
                }
                //br
                if (brBytes != null && tempmv < brBytes.length) {
                    dataList.add(brBytes[tempmv]);
                } else {
                    dataList.add(bytes[0]);
                }
                //bi
                if (biBytes != null && tempmv < tvBytes.length && tempmv < brBytes.length) {
                    dataList.add(tvBytes[tempmv]*brBytes[tempmv]);
                } else {
                    dataList.add(bytes[0]);
                }
            }
            else {
                dataList.add(s0[0]);
                dataList.add(bytes[0]);
                dataList.add(bytes[0]);
                dataList.add(bytes[0]);
                dataList.add(bytes[0]);
                dataList.add(bytes[0]);
            }
            presureList.add(dataList);
        }*/
        for (int i = 0; i < 4 * 60 * 10; i++) {
            Date dt = sdf.parse(str);
            Calendar rightNow = Calendar.getInstance();
            rightNow.setTime(dt);
            rightNow.add(Calendar.MILLISECOND, 2000);//周期为80毫秒
            Date dt1 = rightNow.getTime();
            String dt2 = DateUtil.format(dt1, "yyyy-MM-dd HH:mm:ss.SSS");
            timeList.add(str);

            List dataList = new ArrayList<>();

            dataList.add(timeList.get(i));
            //压力数据
            if (pressureBytes != null && i*gap < pressureBytes.length) {
                dataList.add(pressureBytes[i*gap]);
            } else {
                short[] bytes = new short[]{0};
                dataList.add(bytes[0]);
            }
            //气流
            if (flowBytes != null && i*gap < flowBytes.length) {
                dataList.add(flowBytes[i*gap]);
            } else {
                byte[] bytes = new byte[]{0};
                dataList.add(bytes[0]);
            }
            //漏气
            int tempdif = (int)(i*gapdif);
            if (difleakBytes != null && tempdif < difleakBytes.length) {
                dataList.add(difleakBytes[tempdif]);
            } else {
                byte[] bytes = new byte[]{0};
                dataList.add(bytes[0]);
            }
            //tv
            int tempmv = (int)(i*gapmv);
            if (tvBytes != null && tempmv < tvBytes.length) {
                dataList.add(tvBytes[tempmv]);
            } else {
                short[] bytes = new short[]{0};
                dataList.add(bytes[0]);

            }
            //br
            if (brBytes != null && tempmv < brBytes.length) {
             //   dataList.add(brBytes[i]);
                dataList.add(brBytes[tempmv]);
            } else {
                short[] bytes = new short[]{0};
                dataList.add(bytes[0]);
            }
            //mv
            if (biBytes != null && tempmv < tvBytes.length && tempmv < brBytes.length) {
             //   dataList.add(biBytes[i]);
                dataList.add(tvBytes[tempmv]*brBytes[tempmv]);
            } else {
                short[] bytes = new short[]{0};
                dataList.add(bytes[0]);
            }

            presureList.add(dataList);
            str = dt2;
        }
        map.put("pressure", presureList);
        return map;
    }

    public Map baseStatisticData(String deviceId, String startTime, String endTime) {
        List<Map> usetimeList = this.findListByTimeStr(deviceId, startTime, endTime);
        Map map = new HashMap();
        /**
         * 平均压力=压力1*时间1+压力2*时间2/时间1+时间2
         * 90%压力计算
         * 1，按照压力大小正序排序
         * 2，计算压力之和*90%
         * 3，逐个累加压力并与90%*sum进行比较，前值初次超过后值，当前usetime压力作为90%压力；
         */
        //压力总数
        Double sumPresure1 = 0D;
        Double sumPresure2 = 0D;
        Long sumMvPos = 0l;

        //累加总数
        Double changePresure1 = 0D;
        Double changePresure2 = 0D;
        Long changeMvPos = 0l;


        Double pecentSumPresure1 = 0D;
        Double pecentSumPresure2 = 0D;
        Double pecentSumMvPos = 0d;

        //90%压力值
        Double pecentPresure1 = 0D;
        Double pecentPresure2 = 0D;
        //潮气量
        Long pecentMvPos = 0l;

        //%50压力
        Double averagePresure1 = 0D;
        Double averagePresure2 = 0D;
        Long averageMvPos = 0l;

        //时间总数
        Long sumPeroid = 0l;
        for (Map usetime : usetimeList) {
            Double pressure1 = MapUtil.getDouble(usetime, "presure1") == null ? 0d : MapUtil.getDouble(usetime, "presure1");
            Double pressure2 = MapUtil.getDouble(usetime, "presure2") == null ? 0d : MapUtil.getDouble(usetime, "presure2");
            Long mvPos = MapUtil.getLong(usetime, "mvPos") == null ? 0l : MapUtil.getLong(usetime, "mvPos");

            Long peroid = MapUtil.getLong(usetime, "peroid") == null ? 0l : MapUtil.getLong(usetime, "peroid");
            Double currDouble1 = (Double) pressure1 * peroid;
            Double currDouble2 = (Double) pressure2 * peroid;
            Long currMvPos = mvPos * peroid;
            sumPresure1 += currDouble1;
            sumPresure2 += currDouble2;
            sumMvPos += currMvPos;
            sumPeroid += peroid;
        }
        if (sumPeroid == 0) {
            averagePresure1 = 0d;
            averagePresure2 = 0d;
            averageMvPos = 0l;
        } else {
            averagePresure1 = sumPresure1 / sumPeroid;
            averagePresure2 = sumPresure2 / sumPeroid;
            averageMvPos = sumMvPos / sumPeroid;
        }
        pecentSumPresure1 = sumPresure1 * 0.9;
        pecentSumPresure2 = sumPresure2 * 0.9;
        pecentSumMvPos = sumMvPos * 0.9;
        for (Map usetime : usetimeList) {
            Double pressure1 = MapUtil.getDouble(usetime, "presure1") == null ? 0d : MapUtil.getDouble(usetime, "presure1");
            Long peroid = MapUtil.getLong(usetime, "peroid") == null ? 0l : MapUtil.getLong(usetime, "peroid");
            Double currDouble = (Double) pressure1 * peroid;
            changePresure1 += currDouble;
            if (changePresure1 > pecentSumPresure1) {
                pecentPresure1 = pressure1;
                break;
            }
        }
        for (Map usetime : usetimeList) {
            Double pressure2 = MapUtil.getDouble(usetime, "presure2") == null ? 0d : MapUtil.getDouble(usetime, "presure2");
            Long peroid = MapUtil.getLong(usetime, "peroid") == null ? 0l : MapUtil.getLong(usetime, "peroid");
            Double currDouble = (Double) pressure2 * peroid;
            changePresure2 += currDouble;
            if (changePresure2 > pecentSumPresure2) {
                pecentPresure2 = pressure2;
                break;
            }
        }
        for (Map usetime : usetimeList) {
            Long mvPos = MapUtil.getLong(usetime, "mvPos") == null ? 0l : MapUtil.getLong(usetime, "mvPos");
            Long peroid = MapUtil.getLong(usetime, "peroid") == null ? 0l : MapUtil.getLong(usetime, "peroid");
            Long currDouble = mvPos * peroid;
            changeMvPos += currDouble;
            if (changeMvPos > pecentSumMvPos) {
                pecentMvPos = mvPos;
                break;
            }
        }
        map.put("pecentPresure1", pecentPresure1);
        map.put("averagePresure1", averagePresure1);
        map.put("pecentPresure2", pecentPresure2);
        map.put("averagePresure2", averagePresure2);
        map.put("averageMvPos", averageMvPos);
        map.put("pecentMvPos", pecentMvPos);

        /**
         * 压力柱状图计算
         * 当天的50%压力，90%压力两条柱状图
         */
        /**
         * usetime柱状图，统计当天的使用时长
         */


        return map;

    }

    public Map getEventData(String deviceId, String startTime, String endTime) {
        Map event = new HashMap();
        Map apnea = this.getApneaData(deviceId, startTime, endTime);
        Map hypopnea = this.getHypopneaEventData(deviceId, startTime, endTime);
        event.put("apnea", apnea);
        event.put("hypopnea", hypopnea);
        event.put("csa", apnea);
        event.put("csr", apnea);
        event.put("pb", apnea);

        return event;
    }

    public Map getApneaData(String deviceId, String startTime, String endTime) {
        Map event = new HashMap();
        List<Map> usetimeList = usetimeDao.findSumPeroid(deviceId, startTime, endTime);
        List<Map<String, Double>> usetimeMapList = new ArrayList<>();
        List<String> dateList = new ArrayList<>();
        List<Double> eventList = new ArrayList<>();
        List<Map> apneaList = apneaEventDao.count(deviceId, startTime, endTime);
        if (CollectionUtils.isEmpty(apneaList) || CollectionUtils.isEmpty(usetimeList)) {
            if (startTime.equals(endTime)) {
                dateList.add(startTime);
                eventList.add(0.0);
            } else {
                Date startDate = DateUtil.parseDate(startTime);
                Integer between = DateUtil.getDaysBetween(DateUtil.parseDate(startTime), DateUtil.parseDate(endTime));
                for (int i = 0; i < between; i++) {
                    String currentDateStr = DateUtil.format(DateUtil.addDays(startDate, i), DateUtil.yyyyMMdd);
                    dateList.add(currentDateStr);
                    eventList.add(0.0);
                }

            }
            event.put("dateList", dateList);
            event.put("eventList", eventList);
            return event;
        }
        for (Map usetime : usetimeList) {
            String dayTime = MapUtil.getString(usetime, "dayTime");
            Double sumPeroid = MapUtil.getDouble(usetime, "sumPeroid");
            Map<String, Double> usetimeMap = new HashMap<>();
            usetimeMap.put(dayTime, sumPeroid);
            usetimeMapList.add(usetimeMap);
        }

        for (Map<String, Double> usetimeMap : usetimeMapList) {
            if (CollectionUtils.isNotEmpty(apneaList)) {
                for (Map apnea : apneaList) {
                    String dayTime = MapUtil.getString(apnea, "dayTime");
                    Double count = MapUtil.getDouble(apnea, "count");
                    if (usetimeMap.containsKey(dayTime)) {
                        Double sumPeroid = usetimeMap.get(dayTime);
                        Double result = count / sumPeroid * 3600;
                        dateList.add(dayTime);
                        eventList.add(result);
                    }
                }
            }
        }



         //列出一个月前的日期
        List dateList2 = new ArrayList();
        //根据计算规则获取当前日期的前30天日期
        for (int i = 30;i>1;i--){
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DATE,-i);
            String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
            dateList2.add(yesterday);
        }

        for (int j = 0;j<28;j++){
            eventList.add(j,0.0);
        }


        event.put("dateList", dateList2);


        event.put("eventList", eventList);
        return event;

    }

    public Map getHypopneaEventData(String deviceId, String startTime, String endTime) {
        Map event = new HashMap();
        List<Map> usetimeList = usetimeDao.findSumPeroid(deviceId, startTime, endTime);
        List<Map<String, Double>> usetimeMapList = new ArrayList<>();
        List<String> dateList = new ArrayList<>();
        List<Double> eventList = new ArrayList<>();
        List<Map> apneaList = hypopneaEventDao.count(deviceId, startTime, endTime);
        if (CollectionUtils.isEmpty(apneaList) || CollectionUtils.isEmpty(usetimeList)) {
            if (startTime.equals(endTime)) {
                dateList.add(startTime);
                eventList.add(0.0);
            } else {
                Date startDate = DateUtil.parseDate(startTime);
                Integer between = DateUtil.getDaysBetween(DateUtil.parseDate(startTime), DateUtil.parseDate(endTime));
                for (int i = 0; i < between; i++) {
                    String currentDateStr = DateUtil.format(DateUtil.addDays(startDate, i), DateUtil.yyyyMMdd);
                    dateList.add(currentDateStr);
                    eventList.add(0.0);
                }

            }
            event.put("dateList", dateList);
            event.put("eventList", eventList);
            return event;
        }
        for (Map usetime : usetimeList) {
            String dayTime = MapUtil.getString(usetime, "dayTime");
            Double sumPeroid = MapUtil.getDouble(usetime, "sumPeroid");
            Map<String, Double> usetimeMap = new HashMap<>();
            usetimeMap.put(dayTime, sumPeroid);
            usetimeMapList.add(usetimeMap);
        }

        for (Map<String, Double> usetimeMap : usetimeMapList) {
            if (CollectionUtils.isNotEmpty(apneaList)) {
                for (Map apnea : apneaList) {
                    String dayTime = MapUtil.getString(apnea, "dayTime");
                    Double count = MapUtil.getDouble(apnea, "count");
                    if (usetimeMap.containsKey(dayTime)) {
                        Double sumPeroid = usetimeMap.get(dayTime);
                        Double result = count / sumPeroid * 3600;
                        dateList.add(dayTime);
                        eventList.add(result);
                    }
                }
            }
        }


        //列出一个月前的日期
        List dateList2 = new ArrayList();
        //根据计算规则获取当前日期的前30天日期
        for (int i = 30;i>1;i--){
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DATE,-i);
            String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
            dateList2.add(yesterday);
        }

        for (int j = 0;j<28;j++){
            eventList.add(j,0.0);
        }




        event.put("dateList", dateList2);
        event.put("eventList", eventList);
        return event;
    }

    public Map getCsaEventData(String deviceId, Date startTime, Date endTime) {
        Map hypopnea = new HashMap();
        List<Map> apneaEventList = csaEventDao.findCsaEventByDeviceId(deviceId, startTime, endTime);
        List<String> dateList = new ArrayList<>();
        List<Double> eventList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(apneaEventList)) {
            for (Map apneaEvent : apneaEventList) {
                Double apneaData = 0d;
                String dayTime = MapUtil.getString(apneaEvent, "dayTime");
                if (!StringUtil.checkStr(dayTime)) {
                    break;
                }
                Double apneaSum = MapUtil.getDouble(apneaEvent, "apneaSum");
                Double peroidSum = MapUtil.getDouble(apneaEvent, "peroidSum") == null ? 0d : MapUtil.getDouble(apneaEvent, "peroidSum");
                if (peroidSum != 0d) {
                    apneaData = apneaSum / peroidSum;
                }
                dateList.add(dayTime);
                eventList.add(apneaData);
            }
        }
        hypopnea.put("dateList", dateList);
        hypopnea.put("eventList", eventList);
        return hypopnea;
    }

    public Map getCsrEventData(String deviceId, Date startTime, Date endTime) {
        Map hypopnea = new HashMap();
        List<Map> apneaEventList = csrEventDao.findCsrEventByDeviceId(deviceId, startTime, endTime);
        List<String> dateList = new ArrayList<>();
        List<Double> eventList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(apneaEventList)) {
            for (Map apneaEvent : apneaEventList) {
                Double apneaData = 0d;
                String dayTime = MapUtil.getString(apneaEvent, "dayTime");
                if (!StringUtil.checkStr(dayTime)) {
                    break;
                }
                Double apneaSum = MapUtil.getDouble(apneaEvent, "apneaSum");
                Double peroidSum = MapUtil.getDouble(apneaEvent, "peroidSum") == null ? 0d : MapUtil.getDouble(apneaEvent, "peroidSum");
                if (peroidSum != 0d) {
                    apneaData = apneaSum / peroidSum;
                }
                dateList.add(dayTime);
                eventList.add(apneaData);
            }
        }
        hypopnea.put("dateList", dateList);
        hypopnea.put("eventList", eventList);
        return hypopnea;
    }

    public Map getPbEventData(String deviceId, Date startTime, Date endTime) {
        Map hypopnea = new HashMap();
        List<Map> apneaEventList = pbEventDao.findPbEventByDeviceId(deviceId, startTime, endTime);
        List<String> dateList = new ArrayList<>();
        List<Double> eventList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(apneaEventList)) {
            for (Map apneaEvent : apneaEventList) {
                Double apneaData = 0d;
                String dayTime = MapUtil.getString(apneaEvent, "dayTime");
                if (!StringUtil.checkStr(dayTime)) {
                    break;
                }
                Double apneaSum = MapUtil.getDouble(apneaEvent, "apneaSum");
                Double peroidSum = MapUtil.getDouble(apneaEvent, "peroidSum") == null ? 0d : MapUtil.getDouble(apneaEvent, "peroidSum");
                if (peroidSum != 0d) {
                    apneaData = apneaSum / peroidSum;
                }
                dateList.add(dayTime);
                eventList.add(apneaData);
            }
        }
        hypopnea.put("dateList", dateList);
        hypopnea.put("eventList", eventList);
        return hypopnea;
    }


    /**
     * 获取使用信息数据：初次进入详情页面默认统计时间为一天（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @Override
    public Map getStatisticsDataUseInfo(String deviceId, String startTime,String endTime){
        Map totalDataMap = usetimeDao.getStatisticsDataTotalData(deviceId,startTime,endTime);
        Map useInfoMap ;
        useInfoMap = usetimeDao.getStatisticsDataUseInfo(deviceId,startTime,endTime);
        if (useInfoMap!=null){
            //计算总天数 = 使用时间段总天数
            BigInteger t_totalDays = (BigInteger) totalDataMap.get("totalDays");
            int totalDays = t_totalDays.intValue();
            useInfoMap.put("totalDays",totalDays);

            //计算使用>=4小时天数 = 使用时间段内记录条数的use4days总和
            BigDecimal t_moreThan4HoursDays = (BigDecimal) totalDataMap.get("totalUse4days");
            int moreThan4HoursDays = t_moreThan4HoursDays.intValue();
            useInfoMap.put("moreThan4HoursDays",moreThan4HoursDays);

            //计算未使用天数 = 使用时间段总天数 - 使用时间段内总使用天数
            BigDecimal t_totalUseDays = (BigDecimal) totalDataMap.get("totalUseDays");
            int totalUseDays = t_totalUseDays.intValue();
            int noUseDays = totalDays - totalUseDays;
            useInfoMap.put("noUseDays",noUseDays);

            //计算总使用时间 = 使用时间段内记录条数的 usesecond总和 单位：小时
            BigDecimal totalSeconds = (BigDecimal) totalDataMap.get("totalSeconds");
            DecimalFormat df = new DecimalFormat("0.00");
            String totalTimes = df.format(totalSeconds.doubleValue()/3600);//把秒转换为小时，保留两位小数
            useInfoMap.put("totalTimes",totalTimes);

            //计算使用<4小时天数 = 总使用天数-使用>=4小时天数
            int lessThan4HoursDays = totalUseDays - moreThan4HoursDays;
            useInfoMap.put("lessThan4HoursDays",lessThan4HoursDays);

            //计算平均每天使用时长 = 总使用时间/总天数
            String averageUseTime = df.format((totalSeconds.doubleValue()/3600)/totalDays);
            useInfoMap.put("averageUseTime",averageUseTime);

            //计算使用>=4小时天数百分比 = 使用>=4小时天数/总使用天数
            DecimalFormat df_averageUseTime = new DecimalFormat("0.0");
            String moreThan4HoursPercent = df_averageUseTime.format(moreThan4HoursDays/totalDays*100);
            useInfoMap.put("moreThan4HoursPercent",moreThan4HoursPercent);

            return useInfoMap;
        }else{//如果没有数据，则显示0
            Map useInfoMapForNull = new HashMap();
            useInfoMapForNull.put("totalDays",1);//默认显示使用总天数为：1天
            useInfoMapForNull.put("moreThan4HoursDays",0);
            useInfoMapForNull.put("noUseDays",1);
            useInfoMapForNull.put("totalTimes",0);
            useInfoMapForNull.put("lessThan4HoursDays",0);
            useInfoMapForNull.put("averageUseTime",0);
            useInfoMapForNull.put("moreThan4HoursPercent",0);

            return useInfoMapForNull;
        }

    }

    /**
     * 获取统计数据页面的潮气量，分钟通气量，呼吸频率，呼吸比（从OSS文件中读取）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @Override
    public Map getStatisticsDataFromOSS(String deviceId,String startTime,String endTime){

        System.out.println("正在努力从OSS中获取相关数据");

//        String startTime = "2018-04-12 14:00:00";
//        String endTime = "2018-04-13 18:13:13";


        Map map = null;
        try {
            map = this.getDateFromOss(deviceId, startTime, endTime);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println("您获取的数据是：");
        System.out.println(map);

        List plist = (List) map.get("pressure");

        int plistSize = plist.size();

        //1.计算潮气量
        //1.1.获取所有潮气量数值
        List sortTVList = new ArrayList<>();

        for (int i = 0; i < plistSize; i++) {
            List tvList = (List) plist.get(i);
            if (tvList.size() > 6) {
                Number tvValue =  (Number) tvList.get(6);
                sortTVList.add(tvValue.shortValue());
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


    /**
     * 获取呼吸事件数据（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @Override
    public Map getBreathEventData(String deviceId,String startTime,String endTime) {
        Map breathEventDataMap;
        breathEventDataMap = usetimeDao.getBreathEventData(deviceId,startTime,endTime);
        if(breathEventDataMap!=null){
            //计算AHI=AI+HI
            int ai = (int) breathEventDataMap.get("ai");
            int hi = (int) breathEventDataMap.get("hi");
            int ahi = ai+hi;
            breathEventDataMap.put("ahi",ahi);

            return breathEventDataMap;
        }else {//如果没有数据，则显示0
            Map breathEventDataMapForNull = new HashMap();

            breathEventDataMapForNull.put("ahi",0);
            breathEventDataMapForNull.put("ai",0);
            breathEventDataMapForNull.put("hi",0);
            breathEventDataMapForNull.put("snore",0);
            breathEventDataMapForNull.put("csa",0);
            breathEventDataMapForNull.put("csr",0);
            breathEventDataMapForNull.put("pb",0);

            return breathEventDataMapForNull;
        }
    }


    /**
     * 获取漏气信息数据（设备详情统计数据）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @Override
    public Map getLeakInfoData(String deviceId,String startTime,String endTime) {
        Map totalDataMap = usetimeDao.getStatisticsDataTotalData(deviceId,startTime,endTime);
        Map leakInfoDataMap = new HashMap();
        //总漏气量 单位：L
        BigDecimal t_totalLeakVolume = (BigDecimal) totalDataMap.get("totalLeakVolume");
        int totalLeakVolume = t_totalLeakVolume.intValue();
        leakInfoDataMap.put("totalLeakVolume",totalLeakVolume);

        //平均漏气量 = 总漏气量（L）/总使用时间（分钟）
        BigDecimal t_totalSeconds = (BigDecimal) totalDataMap.get("totalSeconds");
        double totalSeconds = t_totalSeconds.doubleValue();
        DecimalFormat df = new DecimalFormat("0.0");
        String averageLeakVolume = df.format(totalLeakVolume/(totalSeconds/60));
        leakInfoDataMap.put("averageLeakVolume",averageLeakVolume);
        return leakInfoDataMap;
    }


    /**
     * 获取统计图形数据（呼吸事件柱状图）
     *
     * @param deviceId
     * @param startTime
     * @param endTime
     * @return
     */
    @Override
    public Map getStatisticsChartData(String deviceId,String startTime,String endTime) {

        Map chartDataMap = new HashMap();

        Map ahiDataMap = new HashMap();
        Map csaDataMap = new HashMap();
        Map csrDataMap = new HashMap();
        Map pbDataMap = new HashMap();

        Map breathEventDataMap = this.getBreathEventData(deviceId, startTime, endTime);
        //列出前一个月的数据
        List monthBreathEventDataList = this.getMonthBreathEventData(deviceId, startTime);


        //呼吸事件List
        List ahiEventList = new ArrayList();
        ahiEventList.add(breathEventDataMap.get("ai"));
        ahiEventList.add(breathEventDataMap.get("hi"));
        ahiDataMap.put("eventList", ahiEventList);

        List csaEventList = new ArrayList();
        csaEventList.add(breathEventDataMap.get("csa"));
        csaDataMap.put("eventList", csaEventList);

        List csrEventList = new ArrayList();
        csrEventList.add(breathEventDataMap.get("csr"));
        csrDataMap.put("eventList", csrEventList);

        List pbEventList = new ArrayList();
        pbEventList.add(breathEventDataMap.get("pb"));
        pbDataMap.put("eventList", pbEventList);


        //把前一个月的数据放入eventList中
        for (int i = 0;i<monthBreathEventDataList.size();i++){
//            Map dayBreathEventDataMap = (Map) monthBreathEventDataList.get(i);
//            csaEventList.add(dayBreathEventDataMap.get("csa"));
//            csaDataMap.put("eventList", csaEventList);
//
//            csrEventList.add(dayBreathEventDataMap.get("csr"));
//            csrDataMap.put("eventList", csrEventList);
        }

        List dateList = new ArrayList();
        //根据计算规则获取当前日期的前30天日期
        for (int i = 30;i>1;i--){
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.DATE,-i);
            String yesterday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
            dateList.add(yesterday);
        }

        //统计时间List
        ahiDataMap.put("dateList", dateList);
        csaDataMap.put("dateList", dateList);
        csrDataMap.put("dateList", dateList);
        pbDataMap.put("dateList", dateList);


        chartDataMap.put("apnea", ahiDataMap);
        chartDataMap.put("hypopnea", ahiDataMap);


        chartDataMap.put("csa", csaDataMap);
        chartDataMap.put("csr", csrDataMap);
        chartDataMap.put("pb", pbDataMap);

        return chartDataMap;

    }

    /**
     * 获取月度呼吸事件数据（呼吸事件柱状图）
     *
     * @param deviceId
     * @param startTime
     * @return
     */
    public List<Map> getMonthBreathEventData(String deviceId,String startTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE,-31);
        String oneMonthBeforeday = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
        String monthStart = oneMonthBeforeday;

        String monthEnd = startTime;
        List<Map> monthBreathEventDataList = usetimeDao.getMonthBreathEventData(deviceId, monthStart, monthEnd);
        return monthBreathEventDataList;
    }




}
