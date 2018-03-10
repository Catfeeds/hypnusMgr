package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusCertificationDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCertification;
import com.catt.hypnus.service.base.customerMgr.CusCertificationBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("cusCertificationBaseServiceImpl")
public class CusCertificationBaseServiceImpl extends
	BaseServiceImpl<CusCertification, Long> implements CusCertificationBaseService {

	@Resource(name = "cusCertificationDaoImpl")
	private CusCertificationDao cusCertificationDao;

	@Resource
	public void setBaseDao(CusCertificationDao cusCertificationDao) {
		super.setBaseDao(cusCertificationDao);
	}

}
