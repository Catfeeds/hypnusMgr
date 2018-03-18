package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.CsaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsaEvent;
import com.catt.hypnus.service.base.eventMgr.CsaEventBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("csaEventBaseServiceImpl")
public class CsaEventBaseServiceImpl extends
		BaseServiceImpl<CsaEvent, Long> implements CsaEventBaseService {

	@Resource(name = "csaEventDaoImpl")
	private CsaEventDao csaEventDao;

	@Resource
	public void setBaseDao(CsaEventDao csaEventDao) {
		super.setBaseDao(csaEventDao);
	}

}
