package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.data.comEnum.DateDimension;
import com.catt.hypnus.repository.entity.customerMgr.CusInfo;
import com.catt.hypnus.repository.form.customerMgr.CusInfoForm;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 用户信息Dao接口
 *
 * @author runtime
 * @version V1.0
 * @date 2017-02-10 09:47:36
 */
public interface CusInfoDao extends BaseDao<CusInfo, Long> {

    /**
     * 获取店主管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageShopOwner(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取主管管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    Page<Map> getPageDirector(CusInfoForm cusInfoForm, Pageable pageable);

    /**
     * 获取团队名单
     *
     * @param cusAllotId 团队标识
     * @param pageable
     * @return
     */
    Page<Map> getTeamStaffs(Long cusAllotId, Pageable pageable);

    /**
     * 获取用户基本信息
     *
     * @param cusId  用户标识
     * @return
     */
    List<Map> findCusInfo(Long cusId);

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

// 用户统计============================================================================================================================

    /**
     * 获取人数
     * @param types 用户类型
     * @return
     */
    Integer getPersonNum(List<Integer> types);

    /**
     * 新增人数分段查询列表
     * @param startDate
     * @param endDate
     * @param pageable
     * @return
     */
    Page<Map> getPersonPage(Date startDate, Date endDate, Pageable pageable);

    /**
     * 用户统计
     *
     * @param cusType 用户类型
     * @param startCreateDate 开始时间
     * @param endCreateDate   结束时间
     * @param type 统计周期
     * @return
     */
    List<Map> cusStatisti(Date startCreateDate, Date endCreateDate, DateDimension type, Integer cusType);


//绩效管理==============================================================================================================

    /**
     * 获取店主信息
     *
     * @param cusName     用户昵称
     * @param leaderName  所属主管
     * @param pageable
     * @return
     */
    Page<Map> getShopkeeperByPage(String cusName, String leaderName, Pageable pageable);

    /**
     * 获取店主邀请人数
     *
     * @param cusIds  店主标识集合
     * @return
     */
    List<Map> getCouPonCusAndProfit(List<Long> cusIds);

    /**
     * 获取店主代金券信息
     *
     * @param cusIds  店主标识集合
     * @return
     */
    List<Map> getCouPon(List<Long> cusIds);

    /**
     * 获取店主收益
     *
     * @param cusIds  店主标识集合
     * @return
     */
    List<Map> getProfit(List<Long> cusIds);

    /**
     * 获取主管绩效
     *
     * @param leaderName  主管昵称
     * @param pageable
     * @return
     */
    Page<Map> getDirectorInfoByPage(String leaderName, Pageable pageable);

    /**
     * 获取邀请码
     *
     * @param shopId  店铺标识
     * @return
     */
    List<Map> findInvitationNo(Long shopId);

    /**
     * 获取店主邀请人员树
     *
     * @param cusId 店主标识
     * @return
     */
    List<Map> getTreePage(Long cusId);
}
