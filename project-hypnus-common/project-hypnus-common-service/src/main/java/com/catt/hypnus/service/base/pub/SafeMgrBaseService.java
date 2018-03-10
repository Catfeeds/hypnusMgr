package com.catt.hypnus.service.base.pub;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.service.BaseService;
import com.catt.common.module.security.repository.entity.Right;
import com.catt.common.module.security.repository.entity.Role;
import com.catt.common.module.security.repository.entity.Staff;
import org.apache.poi.ss.formula.functions.T;

import java.util.List;
import java.util.Map;


/**
 * 系统管理服务接口
 *
 * @author 袁幸成
 * @version V1.0
 * @date 2015年12月2日 14:46:09
 */
public interface SafeMgrBaseService extends BaseService<T, Long> {

    /**
     * 根据部门和角色获取人员列表
     *
     * @param roleId
     * @param deptId
     * @return
     */
    List<Staff> getStaffsByDeptAndRole(Long roleId, Long deptId);

    /**
     * 根据部门和角色获取人员列表
     *
     * @param roleId
     * @return
     */
    List<Staff> getStaffsByRole(Long roleId);

    /**
     * 异步加载树形部门
     *
     * @param id
     * @param path
     * @return
     */
    List<Map> getTreeList(Long id, String path);

    /**
     * 异步加载树形部门
     *
     * @param param
     * @param path
     * @return
     */
    List<Map> getAsyncTreeList(Map<String, Object> param, String path, Long userId);


    /**
     * 为角色删除权限
     *
     * @param param roleId:角色id, ids:权限id
     */
    void delRoleRight(Map<String, Object> param);

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

    /**
     * 获取人员所有权限列表
     *
     * @param staffId 当前登录的人员id
     * @return 角色的权限列表
     */
    List<Right> getRoleRight(Long staffId);

    /**
     * 获取人员所有菜单权限列表
     *
     * @param userId
     * @return
     */
    List<Right> getRoleMenuRight(Long userId);


    /**
     * 权限树
     *
     * @param id
     * @param roleId
     * @return
     */
    Map<String, Object> getRightTree(Long id, Long roleId);

    /**
     * 删除角色，如果角色下有用户则return2，有权限则return1，成功则return0
     * @param id
     * @return
     */
    int deleteRole(Long id);

    /**
     * 异步加载角色树
     * @param id
     * @return
     */
    List<Map> asyncRoleTreeList(Long id);

    /**
     * 获取枚举表名列名列表
     */
    Page<Map> getEnumGroup(Map<String, Object> param);

    /**
     * 判断是否能登录后台
     * @return
     */
    boolean canSignBack(Staff staff);

    /**
     * 根据角色编号查找角色
     * @param code
     * @return
     */
    Role findRoleByCode(String code);

    /**
     * 根据角色编号，用户判断该角色是否包含该用户
     * @param code
     * @param staff
     * @return
     */
    boolean checkRoleContainsStaffByCode(String code, Staff staff);

    /**
     * 通过部门的id路径获取简称路径
     * @param pathIds 上级部门路径 /1/2/3/
     * @param selfDeptId  本部门id  4
     * @return /name1/name2/name3/name4
     */
    String getPathNameByPathId(String pathIds, Long selfDeptId);


}
