package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.collections.MapUtil;
import com.catt.hypnus.repository.dao.customerMgr.CusAllotDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAllot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 团队信息表Dao接口实现
 *
 * @author 袁幸成
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Repository("cusAllotDaoImpl")
public class CusAllotDaoImpl extends BaseDaoImpl<CusAllot, Long>
		implements CusAllotDao {

    @Override
    public Long getLeaderIdByShopkeeperId(Long shopkeeperId) {
        if (shopkeeperId == null){
            return null;
        }
        String sql = "SELECT a.I_LEADER_ID AS \"leaderId\" FROM T_CUS_ALLOT a " +
                    "LEFT JOIN T_CUS_ALLOT_REL b ON a.I_ID = b.I_TEAM_ID WHERE b.I_CUS_ID = " + shopkeeperId;
        List<Map> list = this.findListBySql(sql, null, Map.class);
        if (list.size() > 0){
            return MapUtil.getLong(list.get(0), "leaderId");
        }
        return null;
    }

}
