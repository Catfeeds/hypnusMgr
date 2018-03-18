package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.LeakEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.LeakEvent;
import com.catt.hypnus.service.base.eventMgr.LeakEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("leakEventBaseServiceImpl")
public class LeakEventBaseServiceImpl extends
		BaseServiceImpl<LeakEvent, Long> implements LeakEventBaseService {

	@Resource(name = "leakEventDaoImpl")
	private LeakEventDao leakEventDao;

	@Resource
	public void setBaseDao(LeakEventDao leakEventDao) {
		super.setBaseDao(leakEventDao);
	}

}
