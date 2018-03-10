package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusInfoDao;
import com.catt.hypnus.repository.entity.customerMgr.CusInfo;
import com.catt.hypnus.service.base.customerMgr.CusInfoBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用户信息服务接口实现
 *
 * @author 袁幸成
 * @date 2017-02-10 09:47:36
 * @version V1.0
 */
@Service("cusInfoBaseServiceImpl")
public class CusInfoBaseServiceImpl extends
	BaseServiceImpl<CusInfo, Long> implements CusInfoBaseService {

	@Resource(name = "cusInfoDaoImpl")
	private CusInfoDao cusInfoDao;

	@Resource
	public void setBaseDao(CusInfoDao cusInfoDao) {
		super.setBaseDao(cusInfoDao);
	}

}
