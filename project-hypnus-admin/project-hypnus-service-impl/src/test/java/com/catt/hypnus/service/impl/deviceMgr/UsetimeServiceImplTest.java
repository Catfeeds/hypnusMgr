package com.catt.hypnus.service.impl.deviceMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;
import com.catt.hypnus.service.SpringTest;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/21
 */
public class UsetimeServiceImplTest extends SpringTest {

    @Resource(name = "usetimeServiceImpl")
    private UsetimeService usetimeService;

    @Test
    public void findList() throws Exception {
        List<Usetime> usetimeList = usetimeService.findList("0a0a0a0a0b0b0b0b0c0c0c0c", null, null);
        System.out.println(usetimeList.size());
    }

    @Test
    public void findMapList() throws Exception {
        List<Map> usetimeList = usetimeService.findMapList("393035393436470B0039002A", "2018-04-02 19:49:30", "2018-04-03 11:33:53");
        System.out.println(usetimeList.size());
    }

    @Test
    public void findListByDay() throws Exception {
        List<Map> usetimeList = usetimeService.findListByDay("393035393436470B0039002A", new Date());
        System.out.println(usetimeList.size());
    }

    @Test
    public void baseStatisticData() throws Exception {
        Map map = usetimeService.baseStatisticData("393035393436470B0039002A", null,null);
        System.out.println(map.isEmpty());
    }


    @Test
    public void getEventData() throws Exception {
        Map map = usetimeService.getEventData("CP70100505S", null, null);
        System.out.println(map.isEmpty());
    }


    @Test
    public void findListByTimeStr() throws Exception {
        List<Map> list = usetimeService.findListByTimeStr("CP70100505S", "2018-04-10", "2018-04-10");
        System.out.println(list.size());
    }

    @Test
    public void getHypopneaEventData() throws Exception {
        Map map = usetimeService.getHypopneaEventData("3633383630355111003C0036", "2016-04-23", "2016-04-23");
        System.out.println(map.isEmpty());
    }

    @Test
    public void findPage() throws Exception {
        Pageable pageable = new Pageable(1, 10);
        UsetimeForm usetimeForm = new UsetimeForm();
        Page<Usetime> usetimePage = usetimeService.findPage(pageable, usetimeForm);
        System.out.println(usetimePage.getContent().size());
    }

    @Test
    public void findPageMap() throws Exception {
        Pageable pageable = new Pageable(1, 10);
        String deviceId = "363338363035511100290036";
        Page<Map> usetimePage = usetimeService.findPageMap(deviceId, null, null, pageable);
        System.out.println(usetimePage.getContent().size());
    }

    @Test
    public void getDateFromOss() throws Exception {
        Map map = usetimeService.getDateFromOss("0a0a0a0a0b0b0b0b0c0c0c0c", "2018-01-31", "2018-01-31");
        System.out.println(map.isEmpty());
    }

}