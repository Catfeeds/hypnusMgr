package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.AgentInfoDao;
import com.catt.hypnus.repository.entity.customerMgr.AgentInfo;
import com.catt.hypnus.service.base.customerMgr.AgentInfoBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("agentInfoBaseServiceImpl")
public class AgentInfoBaseServiceImpl extends
	BaseServiceImpl<AgentInfo, Long> implements AgentInfoBaseService {

	@Resource(name = "agentInfoDaoImpl")
	private AgentInfoDao agentInfoDao;

	@Resource
	public void setBaseDao(AgentInfoDao agentInfoDao) {
		super.setBaseDao(agentInfoDao);
	}

}
