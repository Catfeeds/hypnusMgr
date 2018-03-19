package com.catt.hypnus.service.impl.base.factoryMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import com.catt.hypnus.service.base.factoryMgr.FactoryInfoBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;



@Service("factoryInfoBaseServiceImpl")
public class FactoryInfoBaseServiceImpl extends
		BaseServiceImpl<FactoryInfo, Long> implements FactoryInfoBaseService {

	@Resource(name = "factoryInfoDaoImpl")
	private FactoryInfoDao factoryInfoDao;

	@Resource
	public void setBaseDao(FactoryInfoDao factoryInfoDao) {
		super.setBaseDao(factoryInfoDao);
	}

}
