package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.AgentInfo;

import java.util.Map;

/**
 * 代理商申请表Dao接口
 * 
 * @author chen chusheng
 * @date 2017-06-14 10:32:50
 * @version V1.0
 */
public interface AgentInfoDao extends BaseDao<AgentInfo, Long> {

    /**
     * 获取分页
     * @param params
     * @return
     */
    Page<Map> getPage(Map<String, Object> params, Pageable pageable);
}
