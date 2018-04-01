package com.catt.hypnus.service.impl.deviceMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;
import com.catt.hypnus.service.SpringTest;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import com.catt.hypnus.service.impl.util.DateTimeUtil;
import org.junit.Test;

import javax.annotation.Resource;
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
    public void findPage() throws Exception {
        Pageable pageable = new Pageable(1, 10);
        UsetimeForm  usetimeForm=new UsetimeForm();
        Page<Usetime> usetimePage = usetimeService.findPage(pageable,usetimeForm);
        System.out.println(usetimePage.getContent().size());
    }

    @Test
    public void findPageMap() throws Exception {
        Pageable pageable = new Pageable(1, 10);
        String deviceId="363338363035511100290036";
        Page<Map> usetimePage = usetimeService.findPageMap(deviceId,null,null,pageable);
        System.out.println(usetimePage.getContent().size());
    }

    @Test
    public void getDateFromOss() throws Exception {
        Map map= usetimeService.getDateFromOss("0a0a0a0a0b0b0b0b0c0c0c0c", "2018-01-31", DateTimeUtil.FIVE_MINUTES_TIME);
        System.out.println(map.isEmpty());
    }

}