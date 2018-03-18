package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.HypopneaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.HypopneaEvent;
import com.catt.hypnus.service.base.eventMgr.HypopneaEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("hypopneaEventBaseServiceImpl")
public class HypopneaEventBaseServiceImpl extends
		BaseServiceImpl<HypopneaEvent, Long> implements HypopneaEventBaseService {

	@Resource(name = "hypopneaEventDaoImpl")
	private HypopneaEventDao hypopneaEventDao;

	@Resource
	public void setBaseDao(HypopneaEventDao hypopneaEventDao) {
		super.setBaseDao(hypopneaEventDao);
	}

}
