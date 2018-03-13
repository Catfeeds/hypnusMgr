package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusCartDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCart;
import com.catt.hypnus.service.base.customerMgr.CusCartBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 购物车信息服务接口实现
 *
 * @author runtime
 * @date 2017-02-10 08:50:22
 * @version V1.0
 */
@Service("cusCartBaseServiceImpl")
public class CusCartBaseServiceImpl extends
	BaseServiceImpl<CusCart, Long> implements CusCartBaseService {

	@Resource(name = "cusCartDaoImpl")
	private CusCartDao cusCartDao;

	@Resource
	public void setBaseDao(CusCartDao cusCartDao) {
		super.setBaseDao(cusCartDao);
	}

}
