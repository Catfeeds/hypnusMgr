package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusAllotDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAllot;
import com.catt.hypnus.service.base.customerMgr.CusAllotBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 团队信息表服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Service("cusAllotBaseServiceImpl")
public class CusAllotBaseServiceImpl extends
	BaseServiceImpl<CusAllot, Long> implements CusAllotBaseService {

	@Resource(name = "cusAllotDaoImpl")
	private CusAllotDao cusAllotDao;

	@Resource
	public void setBaseDao(CusAllotDao cusAllotDao) {
		super.setBaseDao(cusAllotDao);
	}

}
