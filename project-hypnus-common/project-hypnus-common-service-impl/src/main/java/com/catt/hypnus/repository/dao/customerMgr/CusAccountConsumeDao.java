package com.catt.hypnus.repository.dao.customerMgr;


import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAccountConsume;

/**
 * 账户信息Dao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2017-02-10 14:30:14
 */
public interface CusAccountConsumeDao extends BaseDao<CusAccountConsume, Long> {

    /**
     * 通过用户标识获取用户账户信息
     *
     * @param cusId
     * @return
     */
    CusAccountConsume findCusAccountByCusId(Long cusId);

    /**
     * 统计主管、店主未提现总金额
     * @return
     */
    double countRemainderMoney();

}
