package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusBankDao;
import com.catt.hypnus.repository.entity.customerMgr.CusBank;
import com.catt.hypnus.service.base.customerMgr.CusBankBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 银行卡绑定服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Service("cusBankBaseServiceImpl")
public class CusBankBaseServiceImpl extends
	BaseServiceImpl<CusBank, Long> implements CusBankBaseService {

	@Resource(name = "cusBankDaoImpl")
	private CusBankDao cusBankDao;

	@Resource
	public void setBaseDao(CusBankDao cusBankDao) {
		super.setBaseDao(cusBankDao);
	}

}
