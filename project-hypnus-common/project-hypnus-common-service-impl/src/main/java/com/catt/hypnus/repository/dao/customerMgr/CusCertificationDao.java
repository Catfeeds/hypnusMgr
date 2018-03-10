package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCertification;

import java.util.Map;

/**
 * 用户实名认证Dao接口
 * 
 * @author chen chusheng
 * @date 2017-03-08 15:56:06
 * @version V1.0
 */
public interface CusCertificationDao extends BaseDao<CusCertification, Long> {

    /**
     * 获取分页数据
     * @param params
     * @return
     */
    Page<Map> getPage(Map<String, Object> params);

}
