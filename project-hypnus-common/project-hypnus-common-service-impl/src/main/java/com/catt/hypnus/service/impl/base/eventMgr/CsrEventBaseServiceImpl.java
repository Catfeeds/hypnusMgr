package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.CsrEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsrEvent;
import com.catt.hypnus.service.base.eventMgr.CsrEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("csrEventBaseServiceImpl")
public class CsrEventBaseServiceImpl extends
		BaseServiceImpl<CsrEvent, Long> implements CsrEventBaseService {

	@Resource(name = "csrEventDaoImpl")
	private CsrEventDao csrEventDao;

	@Resource
	public void setBaseDao(CsrEventDao csrEventDao) {
		super.setBaseDao(csrEventDao);
	}

}
