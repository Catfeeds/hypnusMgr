package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.FlEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.FlEvent;
import com.catt.hypnus.service.base.eventMgr.FlEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("flEventBaseServiceImpl")
public class FlEventBaseServiceImpl extends
		BaseServiceImpl<FlEvent, Long> implements FlEventBaseService {

	@Resource(name = "flEventDaoImpl")
	private FlEventDao flEventDao;

	@Resource
	public void setBaseDao(FlEventDao flEventDao) {
		super.setBaseDao(flEventDao);
	}

}
