package com.catt.hypnus.service.impl.util;

import com.gci.common.util.lang.DateUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author: lzb
 * @version: Ver 1.0
 * @Date: 2018/3/24
 */
public class DateTimeUtil {

    public static final int FIVE_MINUTES_TIME = 1000 * 60 * 5 / 80;
    public static final int DAY_TIME = 1000 * 3600 * 24 / 80;
    public static final int WEEK_TIME = DAY_TIME * 7;
    public static final int MONTH_TIME = DAY_TIME * 30;
    public static final int YEAR_TIME = DAY_TIME * 365;

    public static List<String> timePerSecond(String dataTime, int timeType) throws ParseException {
        List<String> stringList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String str = dataTime + " 12:00:00.000";
        for (int i = 0; i < timeType; i++) {
            Date dt = sdf.parse(str);
            Calendar rightNow = Calendar.getInstance();
            rightNow.setTime(dt);
            rightNow.add(Calendar.MILLISECOND, 80);//周期为80毫秒
            Date dt1 = rightNow.getTime();
            String dt2 = DateUtil.format(dt1, "yyyy-MM-dd HH:mm:ss.SSS");
            stringList.add(str);
            str = dt2;
        }
        return stringList;
    }

//    public static void main(String[] args) throws ParseException{
//        List<String> stringList=timePerSecond("2018-03-24",FIVE_MINUTES_TIME);
//        System.out.println(stringList.size());
//    }

}
