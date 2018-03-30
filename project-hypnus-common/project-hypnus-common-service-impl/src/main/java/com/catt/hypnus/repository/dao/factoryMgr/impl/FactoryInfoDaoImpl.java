package com.catt.hypnus.repository.dao.factoryMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.factoryMgr.FactoryInfoDao;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


@Repository("factoryInfoDaoImpl")
public class FactoryInfoDaoImpl extends BaseDaoImpl<FactoryInfo, Long>
        implements FactoryInfoDao {

    @Override
    public Page<Map> queryList(String phone, Pageable pageable) {
        StringBuffer sb = new StringBuffer();
        Map param = new HashMap();
        sb.append("select * from factory_info where 1=1 ");
        if(StringUtil.isNotBlank(phone)){
            sb.append(" and phone = :phone");
            param.put("phone",phone);
        }
        sb.append(" order by d_modify_date desc");
        return this.findPageBySql(sb.toString(),param,pageable,Map.class);
    }

    @Override
    public Page<Map> queryListNonBind(String phone, Pageable pageable) {
        StringBuffer sb = new StringBuffer();
        Map param = new HashMap();
        sb.append("select * from factory_info where i_id not in ( select factory_id from device_info where factory_id != '' group by factory_id) ");
        if(StringUtil.isNotBlank(phone)){
            sb.append(" and phone = :phone");
            param.put("phone",phone);
        }
        sb.append(" order by d_modify_date desc");
        return this.findPageBySql(sb.toString(),param,pageable,Map.class);
    }

}
