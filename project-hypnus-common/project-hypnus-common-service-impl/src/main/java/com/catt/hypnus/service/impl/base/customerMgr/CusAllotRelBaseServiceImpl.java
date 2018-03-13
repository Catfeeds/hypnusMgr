package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusAllotRelDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAllotRel;
import com.catt.hypnus.service.base.customerMgr.CusAllotRelBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用户团队关联表服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Service("cusAllotRelBaseServiceImpl")
public class CusAllotRelBaseServiceImpl extends
	BaseServiceImpl<CusAllotRel, Long> implements CusAllotRelBaseService {

	@Resource(name = "cusAllotRelDaoImpl")
	private CusAllotRelDao cusAllotRelDao;

	@Resource
	public void setBaseDao(CusAllotRelDao cusAllotRelDao) {
		super.setBaseDao(cusAllotRelDao);
	}

}
