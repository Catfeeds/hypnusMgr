package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.PbEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.PbEvent;
import org.springframework.stereotype.Repository;



@Repository("pbEventDaoImpl")
public class PbEventDaoImpl extends BaseDaoImpl<PbEvent, Long>
		implements PbEventDao {

}
