package com.catt.hypnus.service.impl.base.eventMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.eventMgr.AscpDao;
import com.catt.hypnus.repository.entity.eventMgtr.Ascp;
import com.catt.hypnus.service.base.eventMgr.AscpBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("ascpBaseServiceImpl")
public class AscpBaseServiceImpl extends
		BaseServiceImpl<Ascp, Long> implements AscpBaseService {

	@Resource(name = "ascpDaoImpl")
	private AscpDao ascpDao;

	@Resource
	public void setBaseDao(AscpDao ascpDao) {
		super.setBaseDao(ascpDao);
	}

}
