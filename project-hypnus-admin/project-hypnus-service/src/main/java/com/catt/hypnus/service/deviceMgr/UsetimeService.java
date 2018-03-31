package com.catt.hypnus.service.deviceMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import com.catt.hypnus.repository.form.deviceMgr.UsetimeForm;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 使用记录接口
 * 作者：runtime
 * 时间：2018-02-27
 */
public interface UsetimeService {

    /**
     * 查询使用记录
     * @param deviceId：设备id
     * @param startTime
     * @param endTime
     * @return
     */
    List<Usetime> findList(String deviceId, String startTime, String endTime);


    /**
     * 分页查询使用记录
     * @param pageable
     * @return
     */
    Page<Usetime>  findPage(Pageable pageable, UsetimeForm usetimeForm);

    Map getDateFromOss(String deviceId, String startTime, int timeType) throws IOException;

}

