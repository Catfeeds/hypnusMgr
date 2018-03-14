package com.catt.hypnus.service.impl.base.deviceMgr;

import javax.annotation.Resource;

import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.hypnus.repository.dao.deviceMgr.DeviceDao;
import com.catt.hypnus.repository.entity.deviceMgr.Device;
import com.catt.hypnus.service.base.deviceMgr.DeviceBaseService;
import org.springframework.stereotype.Service;


@Service("deviceBaseServiceImpl")
public class DeviceBaseServiceImpl extends
		BaseServiceImpl<Device, Long> implements DeviceBaseService {

	@Resource(name = "deviceDaoImpl")
	private DeviceDao deviceDao;

	@Resource
	public void setBaseDao(DeviceDao deviceDao) {
		super.setBaseDao(deviceDao);
	}

}
