package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusCertificationLogDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCertificationLog;
import org.springframework.stereotype.Repository;

@Repository("cusCertificationLogDaoImpl")
public class CusCertificationLogDaoImpl extends BaseDaoImpl<CusCertificationLog, Long>
		implements CusCertificationLogDao {

}
