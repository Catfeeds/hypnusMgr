package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.FactoryInfo;

import java.util.Map;

/**
 * 厂家信息表Dao接口
 * 
 * @author 袁幸成
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
public interface FactoryInfoDao extends BaseDao<FactoryInfo, Long> {
    /**
     * 获取厂家信息列表
     *
     * @param factoryName 厂家名称
     * @param pageable    分页
     * @return
     */
    Page<Map> getFactoryInfoByPage(String factoryName, Pageable pageable);
}
