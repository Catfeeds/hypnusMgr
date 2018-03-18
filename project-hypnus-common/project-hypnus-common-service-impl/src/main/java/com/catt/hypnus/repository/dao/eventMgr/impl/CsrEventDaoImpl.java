package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.CsrEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsrEvent;
import org.springframework.stereotype.Repository;



@Repository("csrEventDaoImpl")
public class CsrEventDaoImpl extends BaseDaoImpl<CsrEvent, Long>
		implements CsrEventDao {

}
