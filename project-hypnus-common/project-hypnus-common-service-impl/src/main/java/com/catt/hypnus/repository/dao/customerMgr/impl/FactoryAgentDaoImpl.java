package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.customerMgr.FactoryAgentDao;
import com.catt.hypnus.repository.entity.customerMgr.FactoryAgent;
import org.springframework.stereotype.Repository;

/**
 * 代理商信息Dao接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Repository("factoryAgentDaoImpl")
public class FactoryAgentDaoImpl extends BaseDaoImpl<FactoryAgent, Long>
		implements FactoryAgentDao {

}
