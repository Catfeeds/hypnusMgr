package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.customerMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.customerMgr.FactoryInfo;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * 厂家信息表Dao接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Repository("factoryInfoDaoImpl")
public class FactoryInfoDaoImpl extends BaseDaoImpl<FactoryInfo, Long>
		implements FactoryInfoDao {

	/**
	 * 获取厂家信息列表
	 *
	 * @param factoryName 厂家名称
	 * @param pageable    分页
	 * @return
	 */
	@Override
	public Page<Map> getFactoryInfoByPage(String factoryName, Pageable pageable) {
		Map params = new HashMap<>();
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" t1.I_ID AS \"id\", ");
		sql.append(" t1.S_FACTORY_NAME AS \"factoryName\" ");
		sql.append(" FROM T_FACTORY_INFO t1");
		sql.append(" WHERE 1=1 ");

		if (StringUtil.isNotBlank(factoryName)){
			sql.append(" AND S_FACTORY_NAME LIKE :factoryName");
			params.put("factoryName", factoryName+"%");
		}
		return this.findPageBySql(sql.toString(), params, pageable, Map.class);
	}
}
