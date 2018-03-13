package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusContactDao;
import com.catt.hypnus.repository.entity.customerMgr.CusContact;
import com.catt.hypnus.service.base.customerMgr.CusContactBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 收货地址服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Service("cusContactBaseServiceImpl")
public class CusContactBaseServiceImpl extends
	BaseServiceImpl<CusContact, Long> implements CusContactBaseService {

	@Resource(name = "cusContactDaoImpl")
	private CusContactDao cusContactDao;

	@Resource
	public void setBaseDao(CusContactDao cusContactDao) {
		super.setBaseDao(cusContactDao);
	}

}
