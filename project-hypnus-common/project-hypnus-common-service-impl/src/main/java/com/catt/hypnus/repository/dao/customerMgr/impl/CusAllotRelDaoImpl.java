package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusAllotRelDao;
import com.catt.hypnus.repository.entity.customerMgr.CusAllotRel;
import org.springframework.stereotype.Repository;

/**
 * 用户团队关联表Dao接口实现
 *
 * @author runtime
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Repository("cusAllotRelDaoImpl")
public class CusAllotRelDaoImpl extends BaseDaoImpl<CusAllotRel, Long>
		implements CusAllotRelDao {

}
