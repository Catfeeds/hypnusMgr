package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.customerMgr.CusShopDao;
import com.catt.hypnus.repository.entity.customerMgr.CusShop;
import org.springframework.stereotype.Repository;

/**
 * 店铺信息表Dao接口实现
 *
 * @author 袁幸成
 * @date 2017-02-13 16:15:30
 * @version V1.0
 */
@Repository("cusShopDaoImpl")
public class CusShopDaoImpl extends BaseDaoImpl<CusShop, Long>
		implements CusShopDao {

}
