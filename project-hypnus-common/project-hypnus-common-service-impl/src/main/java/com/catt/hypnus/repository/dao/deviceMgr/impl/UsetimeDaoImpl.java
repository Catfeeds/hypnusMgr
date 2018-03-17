package com.catt.hypnus.repository.dao.deviceMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.deviceMgr.UsetimeDao;
import com.catt.hypnus.repository.entity.deviceMgr.Usetime;
import org.springframework.stereotype.Repository;


@Repository("usetimeDaoImpl")
public class UsetimeDaoImpl extends BaseDaoImpl<Usetime, Long>
		implements UsetimeDao {

}
