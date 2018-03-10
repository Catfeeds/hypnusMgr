package com.catt.hypnus.repository.dao.pub.impl;


import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.hypnus.repository.dao.pub.PubSetupBaseDao;
import com.catt.hypnus.repository.entity.pub.PubSetup;
import org.springframework.stereotype.Repository;

/**
 * 系统全局设置Dao接口实现
 *
 * @author 纪建宏
 * @version V1.0
 * @date 2015-11-19 11:26:28
 */
@Repository("pubSetupBaseDaoImpl")
public class PubSetupBaseDaoImpl extends BaseDaoImpl<PubSetup, String>
        implements PubSetupBaseDao {

}
