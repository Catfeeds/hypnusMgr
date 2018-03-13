package com.catt.hypnus.service.customerMgr;


import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.entity.customerMgr.CusInfo;
import com.catt.hypnus.repository.form.customerMgr.CusInfoForm;

import java.util.Map;

/**
 * 用户信息接口
 * 作者：runtime
 * 时间：2017-02-27
 */
public interface CusInfoService {

    /**
     * 新增主管
     *
     * @param cusInfo     用户信息
     * @param createdId   创建人员标识
     * @param createdName 创建人员名称
     */
    void addDirector(CusInfo cusInfo, Long createdId, String createdName);

    /**
     * 修改主管
     *
     * @param cusInfo
     */
    void updateDirector(CusInfo cusInfo);

    /**
     * 获取主管管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageDirector(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取店主管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageShopOwner(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取主管详情
     *
     * @param cusId
     * @return
     */
    Map getDirectorDetail(Long cusId);

    /**
     * 获取店主详情
     *
     * @param cusId
     * @return
     */
    Map getShopOwnerDetail(Long cusId);

    /**
     * 分配主管
     *
     * @param cusId       店主标识
     * @param leaderId    主管标识
     * @param createdId   创建人员标识
     * @param createdName 创建人员名称
     */
    void selectDirector(Long cusId, Long leaderId, Long createdId, String createdName);

    /**
     * 店主选拔为主管
     *
     * @param cusId       店主标识
     * @param createdId   创建人员标识
     * @param createdName 创建人员名称
     */
    void toBeDirector(Long cusId, Long createdId, String createdName);

    /**
     * 获取团队名单
     *
     * @param cusAllotId 团队标识
     * @param pageable
     * @return
     */
    Page<Map> getTeamStaffs(Long cusAllotId, Pageable pageable);

// 会员、账户=====================================================================================================================

    /**
     * 获取会员管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageMember(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取账户管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageAccount(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取会员详情
     *
     * @param cusId
     * @return
     */
    Map getMemberDetail(Long cusId);

    /**
     * 获取账户详情
     *
     * @param cusId
     * @return
     */
    Map getAccountDetail(Long cusId);

    /**
     * 获取账户详情-交易记录 分页数据
     *
     * @param cusId
     * @param pageable
     * @return
     */
    Page<Map> getPageAccountOrder(Long cusId, Pageable pageable);

    /**
     * 获取账户详情-代金券记录 分页数据
     *
     * @param cusId
     * @param pageable
     * @return
     */
    Page<Map> getPageAccountCoupon(Long cusId, Pageable pageable);

    /**
     * 获取店主邀请人员树
     *
     * @param cusId 店主标识
     * @return
     */
    Map getTreePage(Long cusId);
}

