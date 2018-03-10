package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.FactoryAgentDao;
import com.catt.hypnus.repository.entity.customerMgr.FactoryAgent;
import com.catt.hypnus.service.base.customerMgr.FactoryAgentBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 代理商信息服务接口实现
 *
 * @author 袁幸成
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Service("factoryAgentBaseServiceImpl")
public class FactoryAgentBaseServiceImpl extends
	BaseServiceImpl<FactoryAgent, Long> implements FactoryAgentBaseService {

	@Resource(name = "factoryAgentDaoImpl")
	private FactoryAgentDao factoryAgentDao;

	@Resource
	public void setBaseDao(FactoryAgentDao factoryAgentDao) {
		super.setBaseDao(factoryAgentDao);
	}

}
