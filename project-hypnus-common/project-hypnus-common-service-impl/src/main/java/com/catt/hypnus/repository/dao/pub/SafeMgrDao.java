package com.catt.hypnus.repository.dao.pub;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.repository.dao.BaseDao;
import org.apache.poi.ss.formula.functions.T;

import java.util.Map;

/**
 * 系统管理Dao接口
 *
 * @author runtime
 * @date 2015年12月2日 14:55:07
 * @version V1.0
 */
public interface SafeMgrDao extends BaseDao<T, Long> {

    /**
     * 为人员删除角色
     *
     * @param roleId:角色id
     * @param staffIds：人员ids
     */
    void delRoleStaff(Long roleId, Long[] staffIds);

    /**
     * 获取部门下（包含子部门）的所有人员
     * @param param
     * @return
     */
    Page<Map> findPageByDeptOrRole(Map<String, Object> param);
}
