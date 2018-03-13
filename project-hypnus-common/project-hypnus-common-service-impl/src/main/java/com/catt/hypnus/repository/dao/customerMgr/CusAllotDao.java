package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAllot;

/**
 * 团队信息表Dao接口
 * 
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
public interface CusAllotDao extends BaseDao<CusAllot, Long> {

    /**
     * 获取店主所属的主管标识
     * @param shopkeeperId 店主标识
     * @return
     */
    Long getLeaderIdByShopkeeperId(Long shopkeeperId);

}
