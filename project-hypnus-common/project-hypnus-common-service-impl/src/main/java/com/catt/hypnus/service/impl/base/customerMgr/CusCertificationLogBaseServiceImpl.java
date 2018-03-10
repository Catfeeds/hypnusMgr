package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusCertificationLogDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCertificationLog;
import com.catt.hypnus.service.base.customerMgr.CusCertificationLogBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cusCertificationLogBaseServiceImpl")
public class CusCertificationLogBaseServiceImpl extends
	BaseServiceImpl<CusCertificationLog, Long> implements CusCertificationLogBaseService {

	@Resource(name = "cusCertificationLogDaoImpl")
	private CusCertificationLogDao cusCertificationLogDao;

	@Resource
	public void setBaseDao(CusCertificationLogDao cusCertificationLogDao) {
		super.setBaseDao(cusCertificationLogDao);
	}

}
