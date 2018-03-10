package com.catt.hypnus.repository.dao.util;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("seqUtil")
public class SeqUtilDao extends BaseDaoImpl<Object, Integer> {
	public Integer getSeq(String seqName){
		Integer result = null;
		String sql = "select nextval('"+seqName+"') seq";
		List<Object> list = this.findListBySql(sql, null);
		if(list.size()>0&&list.get(0) instanceof Map){
			result = (Integer) ((Map)(list.get(0))).get("seq");
		}
		return result;
	}

    /**
     * 更新当前值
     * @param seqName 名称
     * @param curVal 当前值
     * @return
     */
    public void updateCurVal(String seqName, int curVal) {
        String sql = " UPDATE sequence SET current_value = :curVal WHERE NAME = :seqName ";
        Map<String, Object> params = new HashMap<>();
        params.put("curVal", curVal);
        params.put("seqName", seqName);
        this.executeUpdateBySql(sql, params);
    }

}
