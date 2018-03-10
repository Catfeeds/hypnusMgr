package com.catt.hypnus.service.impl.base.pub;


import com.catt.common.base.pojo.search.Filter;
import com.catt.common.base.service.impl.BaseServiceImpl;
import com.catt.common.util.bean.BeanUtil;
import com.catt.common.util.collections.CollectionUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.common.util.spring.SpringUtils;
import com.catt.hypnus.repository.dao.pub.PubSetupBaseDao;
import com.catt.hypnus.repository.entity.pub.PubSetup;
import com.catt.hypnus.repository.entity.pub.PubSetup.Code;
import com.catt.hypnus.service.base.pub.PubSetupBaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.CryptUtil;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

/**
 * 系统全局设置服务接口实现
 *
 * @author 纪建宏
 * @version V1.0
 * @date 2015-11-19 11:26:28
 */
@Service("pubSetupBaseServiceImpl")
public class PubSetupBaseServiceImpl extends BaseServiceImpl<PubSetup, String>
		implements PubSetupBaseService {

	private static Logger logger = LoggerFactory.getLogger(PubSetupBaseServiceImpl.class);

	@Resource(name = "pubSetupBaseDaoImpl")
	private PubSetupBaseDao pubSetupBaseDao;

	@Resource
	public void setBaseDao(PubSetupBaseDao pubSetupBaseDao) {
		super.setBaseDao(pubSetupBaseDao);
	}

	@Override
	public PubSetup findByCode(Code code) {
		PubSetupBaseServiceImpl service = SpringUtils
				.getBean("pubSetupBaseServiceImpl");
		return service.findByCode(code.getName());
	}


	@Cacheable(value = "pubSetupCache", key = "#code")
	public PubSetup findByCode(String code) {
		List<PubSetup> setupList = this.findList(1,
				Arrays.asList(Filter.eq("code", code)), null);
		if (setupList.size() > 0) {
			PubSetup setup = setupList.get(0);

	         Code codeEnum = Code.getEnum(code);
			if (codeEnum != null && codeEnum.isEncrypted()) {
				// 对于加密的配置则出库解密
				PubSetup newSetup = new PubSetup(); // 防止修改后被框架提交到数据库
				BeanUtil.copyProperties(newSetup, setup);
				setup = newSetup;

				setup.setValue(CryptUtil.decryptDatabase(setup.getValue()));
			}

			return setup;
		}

		return null;
	}

	@Override
	@CacheEvict(value = "pubSetupCache", key = "#entity.code")
	public PubSetup update(PubSetup entity) {
		PubSetup sourceSetup = entity;

		Code code = Code.getEnum(entity.getCode());
		if (code != null && code.isEncrypted()) {
			// 对于加密的配置则加密入库
			entity = new PubSetup();
			BeanUtil.copyProperties(entity, sourceSetup);
			entity.setValue(CryptUtil.encryptDatabase(entity.getValue()));
		}
		super.saveOrUpdate(entity);

		return sourceSetup;
	}

	@Override
	public String getSetupByCode(Code code) {
		PubSetup setup = findByCode(code);
		if (setup != null && StringUtil.isNotBlank(setup.getValue())) {
			return setup.getValue();
		}

		logger.warn("T_PUB_SETUP表中未配置:{}, 使用默认值:{}", code.getName(), code.getDefaultValue());

		return code.getDefaultValue();
	}

	@Override
	public Integer getIntegerSetupByCode(Code code) {
		return Integer.valueOf(this.getSetupByCode(code));
	}

	@Override
	public Double getDoubleSetupByCode(Code code) {
		return Double.valueOf(this.getSetupByCode(code));
	}

	@Override
	@Transactional(readOnly = true)
	@CacheEvict(value = "pubSetupCache", key = "#code")
	public PubSetup findByCode(String code, boolean isEncrypted) {
		List<PubSetup> setupList = this.findList(1, Arrays.asList(Filter.eq("code", code)), null);

		if (CollectionUtil.isEmpty(setupList)) {
			logger.warn("T_PUB_SETUP表中未配置：{}", code);
			return null;
		}

		PubSetup pubSetup = CollectionUtil.getFirst(setupList);

		if (isEncrypted) {
			// 防止修改后被框架提交到数据库
			PubSetup newSetup = new PubSetup();
			BeanUtil.copyProperties(newSetup, pubSetup);
			//解密
			newSetup.setValue(CryptUtil.decryptDatabase(newSetup.getValue()));
			pubSetup = newSetup;
		}

		return pubSetup;
	}
}
