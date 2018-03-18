package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.CsaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.CsaEvent;
import org.springframework.stereotype.Repository;



@Repository("csaEventDaoImpl")
public class CsaEventDaoImpl extends BaseDaoImpl<CsaEvent, Long>
		implements CsaEventDao {

}
