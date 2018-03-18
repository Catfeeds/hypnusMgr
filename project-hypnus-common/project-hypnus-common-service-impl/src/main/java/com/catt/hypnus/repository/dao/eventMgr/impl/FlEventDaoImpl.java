package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.FlEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.FlEvent;
import org.springframework.stereotype.Repository;



@Repository("flEventDaoImpl")
public class FlEventDaoImpl extends BaseDaoImpl<FlEvent, Long>
		implements FlEventDao {

}
