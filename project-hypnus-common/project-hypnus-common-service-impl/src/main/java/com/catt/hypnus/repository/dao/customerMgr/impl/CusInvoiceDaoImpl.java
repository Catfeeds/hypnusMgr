package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusInvoiceDao;
import com.catt.hypnus.repository.entity.customerMgr.CusInvoice;
import org.springframework.stereotype.Repository;

/**
 * 开票信息Dao接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Repository("cusInvoiceDaoImpl")
public class CusInvoiceDaoImpl extends BaseDaoImpl<CusInvoice, Long>
		implements CusInvoiceDao {

}
