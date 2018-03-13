package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.CusBank;

import java.util.Map;

/**
 * 银行卡绑定Dao接口
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
public interface CusBankDao extends BaseDao<CusBank, Long> {
    /**
     * 获取用户银行账号列表（分页）（APP）
     *
     * @param cusId    用户标识
     * @param pageable
     * @return
     */
    Page<Map> findCusBankByPage(Long cusId, Pageable pageable);
}
