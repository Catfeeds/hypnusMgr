package com.catt.hypnus.service.statisti;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.hypnus.repository.data.comEnum.DateDimension;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Package: com.catt.oil.service.oilStationMgr
 * Description:油站管理 - 收入统计
 * date: 2016-01-11 14:24
 * author: Liang zhanpeng
 */
public interface CusStatistiService {

    /**
     * 获取系统上的各类用户人数
     * @return
     *      totalMember 会员数
     *      totalShoper 店主数
     */
    Map getPersonNum();

    /**
     * 查询用户折线图
     * @param startCreateDate
     * @param endCreateDate
     * @param dateDimension       统计周期
     * @param cusType   用户类型
     */
    List<Map> getCusStatistice(Date startCreateDate, Date endCreateDate, DateDimension dateDimension, Integer cusType);

    /**
     * 新增人数分段查询列表
     * @param startDate
     * @param endDate
     * @param pageable
     * @return
     */
    Page<Map> getPersonPage(Date startDate, Date endDate, Pageable pageable);
}
