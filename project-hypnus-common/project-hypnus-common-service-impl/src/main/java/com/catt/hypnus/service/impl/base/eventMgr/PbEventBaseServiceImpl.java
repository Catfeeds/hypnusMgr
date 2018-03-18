package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.PbEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.PbEvent;
import com.catt.hypnus.service.base.eventMgr.PbEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service("pbEventBaseServiceImpl")
public class PbEventBaseServiceImpl extends
		BaseServiceImpl<PbEvent, Long> implements PbEventBaseService {

	@Resource(name = "pbEventDaoImpl")
	private PbEventDao pbEventDao;

	@Resource
	public void setBaseDao(PbEventDao pbEventDao) {
		super.setBaseDao(pbEventDao);
	}

}
