package com.catt.hypnus.repository.dao.customerMgr.impl;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.customerMgr.CusAccountDetailDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAccountDetail;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("cusAccountDetailDaoImpl")
public class CusAccountDetailDaoImpl extends BaseDaoImpl<CusAccountDetail, Long>
        implements CusAccountDetailDao {
    /**
     * 获取交易记录列表（分页）(APP)
     *
     * @param cusId           当前登录用户ID
     * @param types            交易类型
     * @param createDateBegin 交易起始时间
     * @param createDateEnd   交易结束时间
     * @param pageable
     * @return
     */
    public Page<Map> findTransactionRecord(Long cusId, List<Long> types, Date createDateBegin,
                                           Date createDateEnd, Pageable pageable) {

        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_TYPE AS \"type\", ");
        sql.append(" t1.I_MONEY AS \"money\", ");
        sql.append(" t1.I_LEFT_MONEY AS \"leftMoney\", ");
        sql.append(" t1.D_CREATE_DATE AS \"createDate\" ");
        sql.append(" FROM T_CUS_ACCOUNT_DETAIL t1");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_CUS_ID = :cusId");
        param.put("cusId", cusId);

        if (types != null && types.size()>0) {
            sql.append(" AND t1.I_TYPE IN (:type)");
            param.put("type", types);
        }

        if (StringUtil.checkObj(createDateBegin)) {
            sql.append(" AND t1.D_CREATE_DATE >= :createDateBegin");
            param.put("createDateBegin", createDateBegin);
        }

        if (StringUtil.checkObj(createDateBegin)) {
            sql.append(" AND t1.D_CREATE_DATE <= :createDateEnd");
            param.put("createDateEnd", createDateEnd);
        }

        sql.append(" ORDER BY t1.D_CREATE_DATE DESC");
        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取我的收益统计（分页）
     *
     * @param cusId
     * @param pageNo
     * @param pageSize
     * @return
     */
    @Override
    public Page<Map> getMyIncomeStatistics(Long cusId, Integer pageNo, Integer pageSize) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t.I_MONEY AS \"money\", ");//收益金额
        sql.append(" t.D_CREATE_DATE AS \"statDate\" ");//统计时间
        sql.append(" FROM T_CUS_ACCOUNT_DETAIL t");
        sql.append(" WHERE t.I_TYPE IN (:type) ");
        sql.append(" AND t.I_CUS_ID = :cusId ");
        sql.append(" ORDER BY t.D_CREATE_DATE DESC ");

        Map param = new HashMap<>();
        List<Integer> types = new ArrayList<>();
        types.add(CusAccountDetail.Type.SalesCommissions.getValue());
        types.add(CusAccountDetail.Type.CusRegisterBonus.getValue());
        types.add(CusAccountDetail.Type.ShopkeeperRegisterBonus.getValue());
        types.add(CusAccountDetail.Type.ShopkeeperInviteBonus.getValue());
        types.add(CusAccountDetail.Type.ShopkeeperSaleBonus.getValue());
        types.add(CusAccountDetail.Type.LeaderMgrBonus.getValue());
        param.put("type", types);
        param.put("cusId", cusId);

        Pageable pageable = new Pageable();
        if(StringUtil.checkObj(pageNo)){
            pageable.setPageNo(pageNo);
        }
        if(StringUtil.checkObj(pageSize)){
            pageable.setPageSize(pageSize);
        }
        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    @Override
    public List<Map> countByType() {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" I_TYPE AS \"type\", ");
        sql.append(" SUM(I_MONEY) AS \"money\" ");
        sql.append(" FROM T_CUS_ACCOUNT_DETAIL t");
        sql.append(" WHERE 1=1 ");
        sql.append(" GROUP BY I_TYPE ");
        return this.findListBySql(sql.toString(), null, Map.class);
    }
}
