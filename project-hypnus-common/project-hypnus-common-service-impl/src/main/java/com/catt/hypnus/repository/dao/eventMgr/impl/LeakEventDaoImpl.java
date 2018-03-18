package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.LeakEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.LeakEvent;
import org.springframework.stereotype.Repository;



@Repository("leakEventDaoImpl")
public class LeakEventDaoImpl extends BaseDaoImpl<LeakEvent, Long>
		implements LeakEventDao {

}
