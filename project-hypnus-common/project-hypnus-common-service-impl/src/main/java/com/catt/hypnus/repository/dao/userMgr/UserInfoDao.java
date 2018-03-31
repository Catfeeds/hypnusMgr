package com.catt.hypnus.repository.dao.userMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.userMgr.UserInfo;

import java.util.Map;

/**
 * user_infoDao接口
 * 
 * @author runtime
 * @date 2018-03-15 22:25:18
 * @version V1.0
 */
public interface UserInfoDao extends BaseDao<UserInfo, Long> {
    Page<Map> queryList(String phone, Pageable pageable);

    Page<Map> queryListByNonBind(String phone, Pageable pageable);

    UserInfo findByMobile(String phone);
}
