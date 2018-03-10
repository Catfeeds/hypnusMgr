package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.customerMgr.CusBankDao;
import com.catt.hypnus.repository.entity.customerMgr.CusBank;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * 银行卡绑定Dao接口实现
 *
 * @author 袁幸成
 * @date 2017-02-13 16:15:31
 * @version V1.0
 */
@Repository("cusBankDaoImpl")
public class CusBankDaoImpl extends BaseDaoImpl<CusBank, Long>
		implements CusBankDao {
	/**
	 * 获取用户银行账号列表（分页）（APP）
	 *
	 * @param cusId    用户标识
	 * @param pageable
	 * @return
	 */
	public Page<Map> findCusBankByPage(Long cusId, Pageable pageable){
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" t1.I_ID AS \"id\", ");
		sql.append(" t1.I_BANK_TYPE AS \"bankType\", ");
		sql.append(" t1.S_BRANCH AS \"branch\", ");
		sql.append(" t1.S_BANK_ACCOUNT AS \"bankAccount\", ");
		sql.append(" t1.S_BANK_CARD AS \"bankCard\"");
		sql.append(" FROM T_CUS_BANK t1 ");
		sql.append(" WHERE 1=1 ");

		Map param = new HashMap<>();
		if(StringUtil.checkObj(cusId)){
			sql.append(" AND t1.I_CUS_ID = :cusId");
			param.put("cusId", cusId);
		}

		return this.findPageBySql(sql.toString(), param, pageable, Map.class);
	}
}
