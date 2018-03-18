package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.HypopneaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.HypopneaEvent;
import org.springframework.stereotype.Repository;



@Repository("hypopneaEventDaoImpl")
public class HypopneaEventDaoImpl extends BaseDaoImpl<HypopneaEvent, Long>
		implements HypopneaEventDao {

}
