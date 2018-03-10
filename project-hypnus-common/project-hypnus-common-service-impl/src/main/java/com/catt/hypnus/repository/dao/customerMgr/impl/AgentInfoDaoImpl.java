package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.customerMgr.AgentInfoDao;
import com.catt.hypnus.repository.data.comEnum.PubEnum;
import com.catt.hypnus.repository.entity.customerMgr.AgentInfo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("agentInfoDaoImpl")
public class AgentInfoDaoImpl extends BaseDaoImpl<AgentInfo, Long>
		implements AgentInfoDao {

	/**
	 * 获取分页
	 *
	 * @param params
	 * @return
	 */
	@Override
	public Page<Map> getPage(Map<String, Object> params, Pageable pageable) {
//		Integer status = MapUtil.getInteger(params, "status");
		String status = MapUtil.getString(params, "status");
		Integer agencyLevel = MapUtil.getInteger(params, "agencyLevel");
		String mobile = MapUtil.getString(params, "mobile");
		String nickName = MapUtil.getString(params, "nickname");
		String site = MapUtil.getString(params, "site");

		StringBuilder sql = new StringBuilder();
		sql.append(" select ");
		sql.append(" a.I_ID as id, ");
		sql.append(" b.I_ID as cusId, ");
		sql.append(" b.S_NAME as name, ");
		sql.append(" b.S_NICKNAME as nickname, ");
		sql.append(" b.S_MOBILE as mobile, ");
		sql.append(" a.I_AGENCY_LEVEL as agencyLevel, ");
		sql.append(" a.I_STATUS as status, ");
		sql.append(" a.S_SITE as site, ");
		sql.append(" a.S_APPLY_REMARK as applyRemark, ");
		sql.append(" a.D_AUDIT_TIME as auditTime ");

		sql.append(" from t_agent_info a ");
		sql.append(" inner join t_cus_info b on a.I_CUS_ID = b.I_ID ");
		sql.append(" where b.I_DEL_FLAG = :delFlag ");

		Map<String, Object> param = new HashMap<>();
		param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
		if(StringUtil.isNotBlank(status)){
			String[] statuStrs = status.split(",");
			List<Integer> statusInt = new ArrayList<>();
			for(String s : statuStrs){
				statusInt.add(Integer.parseInt(s));
			}
			sql.append(" and a.I_STATUS in (:status)");
			param.put("status", statusInt);
		}
		if(agencyLevel != null){
			sql.append(" and a.I_AGENCY_LEVEL = :agencyLevel ");
			param.put("agencyLevel", agencyLevel);
		}
		if(StringUtil.isNotBlank(mobile)){
			sql.append(" and b.S_MOBILE = :mobile");
			param.put("mobile", mobile);
		}
		if(StringUtil.isNotBlank(nickName)){
			sql.append(" and b.S_NAME like :name ");
			param.put("name", "%"+nickName+"%");
		}
		if(StringUtil.isNotBlank(site)){
			sql.append(" and a.S_SITE like :site ");
			param.put("site", "%"+site+"%");
		}

		return this.findPageBySql(sql.toString(), param, pageable, Map.class);
	}
}
