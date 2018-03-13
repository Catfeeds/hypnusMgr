package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusShopDao;
import com.catt.hypnus.repository.entity.customerMgr.CusShop;
import com.catt.hypnus.service.base.customerMgr.CusShopBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 店铺信息表服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Service("cusShopBaseServiceImpl")
public class CusShopBaseServiceImpl extends
	BaseServiceImpl<CusShop, Long> implements CusShopBaseService {

	@Resource(name = "cusShopDaoImpl")
	private CusShopDao cusShopDao;

	@Resource
	public void setBaseDao(CusShopDao cusShopDao) {
		super.setBaseDao(cusShopDao);
	}

}
