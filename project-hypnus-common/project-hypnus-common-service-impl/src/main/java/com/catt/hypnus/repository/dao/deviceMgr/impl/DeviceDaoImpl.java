package com.catt.hypnus.repository.dao.deviceMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import org.springframework.stereotype.Repository;



@Repository("deviceDaoImpl")
public class DeviceDaoImpl extends BaseDaoImpl<Device, Long>
		implements DeviceDao {

}
