package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.ApcpEventDao;
import com.catt.hypnus.repository.entity.eventMgtr.ApcpEvent;
import org.springframework.stereotype.Repository;


@Repository("apcpEventDaoImpl")
public class ApcpEventDaoImpl extends BaseDaoImpl<ApcpEvent, Long>
		implements ApcpEventDao {

}
