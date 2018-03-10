package com.catt.hypnus.repository.dao.pub.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.module.security.repository.dao.DeptDao;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.pub.SafeMgrDao;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("safeMgrDaoImpl")
public class SafeMgrDaoImpl extends BaseDaoImpl<T, Long>
        implements SafeMgrDao {

    @Resource(name = "deptDaoImpl")
    private DeptDao deptDao;

    @Override
    public void delRoleStaff(Long roleId, Long[] staffIds) {
        String sql = " DELETE FROM t_hr_staff_rel_role WHERE I_ROLE_ID = :roleId AND I_STAFF_ID IN (:staffIds)";
        Map<String, Object> params = new HashMap<>();
        params.put("roleId", roleId);
        params.put("staffIds", Arrays.asList(staffIds));
        this.executeUpdateBySql(sql, params);
    }

    @Override
    public Page<Map> findPageByDeptOrRole(Map<String, Object> param) {
        Integer pageSize = MapUtil.getInteger(param, "pageSize", 20);
        Integer pageNo = MapUtil.getInteger(param, "pageNo", 1);
        Long deptId = MapUtil.getLong(param, "deptId");
        Long roleId = MapUtil.getLong(param, "roleId");
        String name = MapUtil.getString(param, "name");
        String account = MapUtil.getString(param, "account");
        Map<String, Object> params = new HashMap<String, Object>();
        String sql = "SELECT a.I_ID as id, a.S_NAME as name, a.S_ACCOUNT as account,b.i_id as deptId, b.S_PATH_ID as dept," +
                " a.I_IS_LOCKED as isLocked, a.I_SEX as sex, a.S_MOBILE as mobile,b.S_DEPT_NAME as deptName " +
                " FROM t_Hr_Staff a LEFT JOIN t_Hr_Department b ON a.I_DEPT_ID = b.I_ID ";
        if (roleId != null) {
            sql += " LEFT JOIN T_HR_STAFF_REL_ROLE d ON a.I_ID = d.I_STAFF_ID " +
                    " LEFT JOIN t_Hr_Role e ON d.I_ROLE_ID = e.I_ID ";
        }
        sql += " where 1=1 and a.I_DEL_FLAG = 0 ";
        if (StringUtils.isNotBlank(name)) {
            params.put("name", "%" + name + "%");
            sql += " and a.S_NAME like :name";
        }
        if (StringUtils.isNotBlank(account)) {
            params.put("account", "%" + account + "%");
            sql += " and a.S_ACCOUNT like :account";
        }
        if (deptId != null) {
            String pathId = this.getPathId(deptId);
            if(StringUtil.checkObj(pathId)){
                String path = pathId + deptId + "/";
                sql += " and (b.I_ID = :deptId or b.S_PATH_ID like :path) ";
                params.put("deptId", deptId);
                params.put("path", path + "%");
            }
        }
        if (roleId != null) {
            sql += " and e.I_ID = :roleId";
            params.put("roleId", roleId);
        }
        return this.findPageBySql(sql, params, new Pageable(pageNo, pageSize), Map.class);
    }

    /**
     *
     * @param deptId
     * @return
     */
    private String getPathId(Long deptId) {
        String sql = " SELECT S_PATH_ID as pathId FROM t_hr_department WHERE I_ID = " + deptId;
        List<Map> list = this.findListBySql(sql, null, Map.class);
        if(list.size() != 0){
            return MapUtil.getString(list.get(0), "pathId");
        }
        return null;
    }
}
