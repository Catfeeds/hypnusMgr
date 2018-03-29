package com.catt.hypnus.service.impl.deviceMgr;

import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.service.SpringTest;
import com.catt.hypnus.service.deviceMgr.UsetimeService;
import com.catt.hypnus.service.impl.util.DateTimeUtil;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

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
        List<Usetime> usetimeList =  usetimeService.findList("0a0a0a0a0b0b0b0b0c0c0c0c",null,null);
        System.out.println(usetimeList.size());
    }

    @Test
    public void getDateFromOss() throws Exception {
        usetimeService.getDateFromOss("0a0a0a0a0b0b0b0b0c0c0c0c","2018-01-31", DateTimeUtil.FIVE_MINUTES_TIME);
    }

}