package com.catt.hypnus.repository.dao.eventMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.eventMgr.AscpDao;
import com.catt.hypnus.repository.entity.eventMgtr.Ascp;
import org.springframework.stereotype.Repository;



@Repository("ascpDaoImpl")
public class AscpDaoImpl extends BaseDaoImpl<Ascp, Long>
		implements AscpDao {

}
