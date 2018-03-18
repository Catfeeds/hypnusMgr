package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.ApneaEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.ApneaEvent;
import org.springframework.stereotype.Repository;



@Repository("apneaEventDaoImpl")
public class ApneaEventDaoImpl extends BaseDaoImpl<ApneaEvent, Long>
		implements ApneaEventDao {

}
