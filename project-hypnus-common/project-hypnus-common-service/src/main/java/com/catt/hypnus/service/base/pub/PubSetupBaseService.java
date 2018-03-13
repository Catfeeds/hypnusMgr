package com.catt.hypnus.service.base.pub;


import com.catt.common.base.service.BaseService;
import com.catt.hypnus.repository.entity.pub.PubSetup;
import com.catt.hypnus.repository.entity.pub.PubSetup.Code;

/**
 * 系统全局设置服务接口
 *
 * @author runtime
 * @version V1.0
 * @date 2015-11-19 11:26:28
 */
public interface PubSetupBaseService extends BaseService<PubSetup, String> {

	/**
	 * 获取配置信息
	 *
	 * @return 没有配置返回null
	 */
	PubSetup findByCode(Code code);

	/**
	 * 修改配置信息
	 *
	 * @param entity
	 * @return
	 */
	PubSetup update(PubSetup entity);

	/**
	 * 根据设置编码获取其值
	 * 
	 * @param code
	 *            设置编码
	 * @return 没有配置返回默认值
	 */
	String getSetupByCode(Code code);

	/**
	 * 根据设置编码获取其值
	 * 
	 * @param code
	 *            设置编码
	 * @return 没有配置返回默认值
	 */
	Integer getIntegerSetupByCode(Code code);

	/**
	 * 根据设置编码获取其值
	 * 
	 * @param code
	 *            设置编码
	 * @return 没有配置返回默认值
	 */
	Double getDoubleSetupByCode(Code code);

	/***
	 * 获取配置信息
	 * @param code
	 * @param isEncrypted 是否是加密字段
	 * @return
	 */
	PubSetup findByCode(String code,  boolean isEncrypted);

}
