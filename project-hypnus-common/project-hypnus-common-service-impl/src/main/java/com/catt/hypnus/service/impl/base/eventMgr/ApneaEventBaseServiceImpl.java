package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.ApneaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.ApneaEvent;
import com.catt.hypnus.service.base.eventMgr.ApneaEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("apneaEventBaseServiceImpl")
public class ApneaEventBaseServiceImpl extends
		BaseServiceImpl<ApneaEvent, Long> implements ApneaEventBaseService {

	@Resource(name = "apneaEventDaoImpl")
	private ApneaEventDao apneaEventDao;

	@Resource
	public void setBaseDao(ApneaEventDao apneaEventDao) {
		super.setBaseDao(apneaEventDao);
	}

}
