package com.catt.hypnus.service.impl.base.customerMgr;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusInvoiceDao;
import com.catt.hypnus.repository.entity.customerMgr.CusInvoice;
import com.catt.hypnus.service.base.customerMgr.CusInvoiceBaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 开票信息服务接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Service("cusInvoiceBaseServiceImpl")
public class CusInvoiceBaseServiceImpl extends
	BaseServiceImpl<CusInvoice, Long> implements CusInvoiceBaseService {

	@Resource(name = "cusInvoiceDaoImpl")
	private CusInvoiceDao cusInvoiceDao;

	@Resource
	public void setBaseDao(CusInvoiceDao cusInvoiceDao) {
		super.setBaseDao(cusInvoiceDao);
	}

}
