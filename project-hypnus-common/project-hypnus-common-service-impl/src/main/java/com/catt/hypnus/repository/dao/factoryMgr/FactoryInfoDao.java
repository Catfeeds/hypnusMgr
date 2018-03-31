package com.catt.hypnus.repository.dao.factoryMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;

import java.util.Map;

/**
 * factory_infoDao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-15 22:25:18
 */
public interface FactoryInfoDao extends BaseDao<FactoryInfo, Long> {
    Page<Map>  queryList(String phone, Pageable pageable);

    Page<Map> queryListNonBind(String phone,Pageable pageable);

    FactoryInfo findByMobile(String phone);

    FactoryInfo findByRelUserId(Long relUserId);

 }
