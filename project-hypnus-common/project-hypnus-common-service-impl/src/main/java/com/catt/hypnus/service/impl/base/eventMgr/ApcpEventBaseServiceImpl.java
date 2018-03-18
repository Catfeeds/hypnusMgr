package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.ApcpEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.ApcpEvent;
import com.catt.hypnus.service.base.eventMgr.ApcpEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("apcpEventBaseServiceImpl")
public class ApcpEventBaseServiceImpl extends
		BaseServiceImpl<ApcpEvent, Long> implements ApcpEventBaseService {

	@Resource(name = "apcpEventDaoImpl")
	private ApcpEventDao apcpEventDao;

	@Resource
	public void setBaseDao(ApcpEventDao apcpEventDao) {
		super.setBaseDao(apcpEventDao);
	}

}
