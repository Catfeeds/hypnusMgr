package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.customerMgr.FactoryInfo;
import com.catt.hypnus.service.base.customerMgr.FactoryInfoBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 厂家信息表服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
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
