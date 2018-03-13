package com.catt.hypnus.repository.dao.customerMgr.impl;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.repository.dao.impl.BaseDaoImpl;
import com.catt.common.util.collections.CollectionUtil;
import com.catt.common.util.collections.MapUtil;
import com.catt.common.util.lang.DateUtil;
import com.catt.common.util.lang.StringUtil;
import com.catt.hypnus.repository.dao.customerMgr.CusInfoDao;
import com.catt.hypnus.repository.data.comEnum.DateDimension;
import com.catt.hypnus.repository.data.comEnum.PubEnum;
import com.catt.hypnus.repository.entity.customerMgr.CusInfo;
import com.catt.hypnus.repository.form.customerMgr.CusInfoForm;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户信息Dao接口实现
 *
 * @author runtime
 * @version V1.0
 * @date 2017-02-10 09:47:36
 */
@Repository("cusInfoDaoImpl")
public class CusInfoDaoImpl extends BaseDaoImpl<CusInfo, Long>
        implements CusInfoDao {

    /**
     * 获取店主管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getPageShopOwner(CusInfoForm cusInfoForm, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" a.I_ID AS \"id\", ");
        sql.append(" a.S_NAME AS \"name\", ");
        sql.append(" a.S_ACCOUNT AS \"account\", ");
        sql.append(" a.I_STATUS AS \"status\", ");
        sql.append(" a.I_TYPE AS \"type\", ");
        sql.append(" b.D_OPEN_TIME AS \"openTime\", ");
        sql.append(" b.D_EXPIRE_TIME AS \"expireTime\",");
        sql.append(" b.I_ORDER_NUM AS \"orderNum\",");
        sql.append(" b.I_ORDER_MONEY AS \"orderMoney\",");
        sql.append(" IF(b.D_EXPIRE_TIME < NOW(), 1, 2) as \"isExpire\" "); // 1-已过期，2-未过期
        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" INNER JOIN T_CUS_SHOP b on a.I_ID = b.I_CUS_ID ");
        sql.append(" WHERE a.I_DEL_FLAG = :delFlag AND a.I_TYPE in (:types) ");


        List<Integer> types = new ArrayList<>();
        types.add(CusInfo.Type.TotalAgent.getValue());
        types.add(CusInfo.Type.AreaAgent.getValue());
        types.add(CusInfo.Type.ProvinceAgent.getValue());
        types.add(CusInfo.Type.CityAgent.getValue());
        types.add(CusInfo.Type.ShopOwner.getValue());
        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        if (CollectionUtil.isNotEmpty(cusInfoForm.getType())){
            param.put("types", cusInfoForm.getType());
        }else{
            param.put("types", types);
        }

        if (StringUtil.checkObj(cusInfoForm.getName())) {
            sql.append(" AND a.S_NAME like (:name)");
            param.put("name", cusInfoForm.getName() + "%");
        }

        if (StringUtil.checkObj(cusInfoForm.getMobile())) {
            sql.append(" AND a.S_ACCOUNT = :mobile");
            param.put("mobile", cusInfoForm.getMobile());
        }

        if (StringUtil.checkObj(cusInfoForm.getStartDate())) {
            sql.append(" AND b.D_OPEN_TIME >= :startDate");
            param.put("startDate", cusInfoForm.getStartDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getEndDate())) {
            sql.append(" AND b.D_OPEN_TIME <= :endDate");
            param.put("endDate", cusInfoForm.getEndDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getStatus())) { // 1-已过期，2-未过期
            if (1 == cusInfoForm.getStatus()) {
                sql.append(" AND b.D_EXPIRE_TIME < NOW()");
            } else if (2 == cusInfoForm.getStatus()) {
                sql.append(" AND (b.D_EXPIRE_TIME > NOW() OR b.D_EXPIRE_TIME IS NULL)");
            }
        }

        sql.append(" ORDER BY b.D_CREATE_DATE DESC ");

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取主管管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getPageDirector(CusInfoForm cusInfoForm, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" a.I_ID AS \"id\", ");
        sql.append(" a.S_NAME AS \"name\", ");
        sql.append(" a.S_ACCOUNT AS \"account\", ");
        sql.append(" a.I_STATUS AS \"status\", ");
        sql.append(" b.I_STAFF_NUM AS \"staffNum\", ");
        sql.append(" b.D_CREATE_DATE AS \"createDate\" ");

        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" INNER JOIN T_CUS_ALLOT b on a.I_ID = b.I_LEADER_ID ");
        sql.append(" WHERE a.I_DEL_FLAG = :delFlag AND a.I_TYPE in (:types)");


        List<Integer> types = new ArrayList<>();
        types.add(CusInfo.Type.Director.getValue());
        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        param.put("types", types);

        if (StringUtil.checkObj(cusInfoForm.getName())) {
            sql.append(" AND a.S_NAME like (:name)");
            param.put("name", cusInfoForm.getName() + "%");
        }

        if (StringUtil.checkObj(cusInfoForm.getMobile())) {
            sql.append(" AND a.S_ACCOUNT = :mobile");
            param.put("mobile", cusInfoForm.getMobile());
        }

        if (StringUtil.checkObj(cusInfoForm.getStartDate())) {
            sql.append(" AND b.D_CREATE_DATE >= :startDate");
            param.put("startDate", cusInfoForm.getStartDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getEndDate())) {
            sql.append(" AND b.D_CREATE_DATE <= :endDate");
            param.put("endDate", cusInfoForm.getEndDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getStatus())) {
            sql.append(" AND a.I_STATUS = :status");
            param.put("status", cusInfoForm.getStatus());
        }

        sql.append(" ORDER BY b.D_CREATE_DATE DESC ");

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取团队名单
     *
     * @param cusAllotId 主管标识
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getTeamStaffs(Long cusAllotId, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" a.I_ID AS \"id\", ");
        sql.append(" a.S_NAME AS \"name\", ");
        sql.append(" a.S_ACCOUNT AS \"account\", ");
        sql.append(" a.I_STATUS AS \"status\"");
        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" INNER JOIN T_CUS_ALLOT_REL b on a.I_ID = b.I_CUS_ID ");
        sql.append(" WHERE b.I_TEAM_ID = :cusAllotId");

        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        param.put("cusAllotId", cusAllotId);

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }


    /**
     * 获取用户基本信息
     *
     * @param cusId  用户标识
     * @return
     */
    public List<Map> findCusInfo(Long cusId){
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_ID AS \"id\", ");
        sql.append(" t1.S_NAME AS \"name\", ");
        sql.append(" t1.S_ACCOUNT AS \"account\", ");
        sql.append(" t1.I_TYPE AS \"type\", ");
        sql.append(" t1.I_LEVEL AS \"level\", ");
        sql.append(" t1.S_PAY_PWD AS \"isPayPwd\", ");
        sql.append(" t1.I_STATUS AS \"status\",");
        sql.append(" t2.I_ID AS \"shopId\",");
        sql.append(" t2.I_STATUS AS \"shopStatus\"");
        sql.append(" FROM T_CUS_INFO t1 ");
        sql.append(" INNER JOIN T_CUS_SHOP t2 ON (t1.I_ID = t2.I_CUS_ID) ");
        sql.append(" WHERE 1=1");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_ID = :cusId");
        param.put("cusId", cusId);

        return this.findListBySql(sql.toString(), param,  Map.class);
    }


// 会员、账户=====================================================================================================================

    /**
     * 获取会员管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getPageMember(CusInfoForm cusInfoForm, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" a.I_ID AS \"id\", ");
        sql.append(" a.S_NAME AS \"name\", ");
        sql.append(" a.S_ACCOUNT AS \"account\", ");
        sql.append(" a.I_STATUS AS \"status\", ");
        sql.append(" a.D_CREATE_DATE AS \"createDate\" ");
        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" WHERE a.I_DEL_FLAG = :delFlag AND a.I_TYPE = :type");


        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        param.put("type", CusInfo.Type.RegistUser.getValue());

        if (StringUtil.checkObj(cusInfoForm.getName())) {
            sql.append(" AND a.S_NAME like (:name)");
            param.put("name", cusInfoForm.getName() + "%");
        }

        if (StringUtil.checkObj(cusInfoForm.getMobile())) {
            sql.append(" AND a.S_ACCOUNT = :mobile");
            param.put("mobile", cusInfoForm.getMobile());
        }

        if (StringUtil.checkObj(cusInfoForm.getStartDate())) {
            sql.append(" AND a.D_CREATE_DATE >= :startDate");
            param.put("startDate", cusInfoForm.getStartDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getEndDate())) {
            sql.append(" AND a.D_CREATE_DATE <= :endDate");
            param.put("endDate", cusInfoForm.getEndDate());
        }

        if (StringUtil.checkObj(cusInfoForm.getStatus())) {
            sql.append(" AND a.I_STATUS = :status");
            param.put("status", cusInfoForm.getStatus());
        }

        sql.append(" ORDER BY a.D_CREATE_DATE DESC ");

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取账户管理分页数据
     *
     * @param cusInfoForm
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getPageAccount(CusInfoForm cusInfoForm, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" a.I_ID AS \"id\", ");
        sql.append(" a.S_NAME AS \"name\", ");
        sql.append(" a.S_ACCOUNT AS \"account\", ");

        sql.append(" b.I_REMAINDER_MONEY AS \"remainderMoney\", ");//账户余额
        sql.append(" b.I_TOTAL_MONEY AS \"totalMoney\", ");//累计收益 -- 账户总金额
        sql.append(" b.I_UNACCEPT_MONEY AS \"unAcceptMoney\", ");//未到账提成
        sql.append(" b.I_RECIVE_REBATE_MONEY AS \"reciveRebateMoney\", ");//未到账返利
        sql.append(" count(c.I_ID) AS \"couponCount\" ");//代金券数量

        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" INNER JOIN T_CUS_ACCOUNT_CONSUME b on a.I_ID = b.I_CUS_ID ");
        sql.append(" LEFT JOIN T_COUPON_CUS c on a.I_ID = c.I_CUS_ID ");
        sql.append(" WHERE a.I_DEL_FLAG = :delFlag AND a.I_TYPE in (:types)");
//        sql.append(" AND a.I_STATUS = :status");


        List<Integer> types = new ArrayList<>();
        types.add(CusInfo.Type.ShopOwner.getValue());
        types.add(CusInfo.Type.Director.getValue());
        types.add(CusInfo.Type.TotalAgent.getValue());
        types.add(CusInfo.Type.AreaAgent.getValue());
        types.add(CusInfo.Type.ProvinceAgent.getValue());
        types.add(CusInfo.Type.CityAgent.getValue());
        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        param.put("types", types);
//        param.put("status", CusInfo.Status.NORMALUSE.getValue());

        if (StringUtil.checkObj(cusInfoForm.getName())) {
            sql.append(" AND a.S_NAME like (:name)");
            param.put("name", cusInfoForm.getName() + "%");
        }

        if (StringUtil.checkObj(cusInfoForm.getMobile())) {
            sql.append(" AND a.S_ACCOUNT = :mobile");
            param.put("mobile", cusInfoForm.getMobile());
        }


        sql.append(" GROUP BY a.I_ID,a.S_NAME,a.S_ACCOUNT,b.I_REMAINDER_MONEY,b.I_TOTAL_MONEY ,b.I_UNACCEPT_MONEY,b.I_RECIVE_REBATE_MONEY ");
        sql.append(" ORDER BY ");

        if(cusInfoForm.getRemainderMoneyOrder()!= null && cusInfoForm.getRemainderMoneyOrder().equals(CusInfoForm.Sorting.DESC.ordinal())){
            sql.append(" b.I_REMAINDER_MONEY DESC, ");
        }else if(cusInfoForm.getRemainderMoneyOrder()!= null && cusInfoForm.getRemainderMoneyOrder().equals(CusInfoForm.Sorting.ASC.ordinal())){
            sql.append(" b.I_REMAINDER_MONEY ASC,");
        }
        if(cusInfoForm.getTotalMoneyOrder()!= null && cusInfoForm.getTotalMoneyOrder().equals(CusInfoForm.Sorting.DESC.ordinal())){
            sql.append(" b.I_TOTAL_MONEY DESC, ");
        }else if(cusInfoForm.getTotalMoneyOrder()!= null && cusInfoForm.getTotalMoneyOrder().equals(CusInfoForm.Sorting.ASC.ordinal())){
            sql.append(" b.I_TOTAL_MONEY ASC, ");
        }
        if(cusInfoForm.getUnAcceptMoneyOrder()!= null && cusInfoForm.getUnAcceptMoneyOrder().equals(CusInfoForm.Sorting.DESC.ordinal())){
            sql.append(" b.I_UNACCEPT_MONEY DESC, ");
        }else if(cusInfoForm.getUnAcceptMoneyOrder()!= null && cusInfoForm.getUnAcceptMoneyOrder().equals(CusInfoForm.Sorting.ASC.ordinal())){
            sql.append(" b.I_UNACCEPT_MONEY ASC, ");
        }
        if(cusInfoForm.getReciveRebateMoneyOrder()!= null && cusInfoForm.getReciveRebateMoneyOrder().equals(CusInfoForm.Sorting.DESC.ordinal())){
            sql.append(" b.I_RECIVE_REBATE_MONEY DESC, ");
        }else if(cusInfoForm.getReciveRebateMoneyOrder()!= null && cusInfoForm.getReciveRebateMoneyOrder().equals(CusInfoForm.Sorting.ASC.ordinal())){
            sql.append(" b.I_RECIVE_REBATE_MONEY ASC, ");
        }
        if(cusInfoForm.getCouponCountOrder()!= null && cusInfoForm.getCouponCountOrder().equals(CusInfoForm.Sorting.DESC.ordinal())){
            sql.append(" count(c.I_ID) DESC, ");
        }else if(cusInfoForm.getCouponCountOrder()!= null && cusInfoForm.getCouponCountOrder().equals(CusInfoForm.Sorting.ASC.ordinal())){
            sql.append(" count(c.I_ID) ASC, ");
        }

        sql.append(" a.D_CREATE_DATE DESC ");

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取人数
     *
     * @return
     */
    @Override
    public Integer getPersonNum(List<Integer> types) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" COUNT(a.I_ID) AS \"num\" ");
        sql.append(" FROM T_CUS_INFO a ");
        sql.append(" WHERE a.I_DEL_FLAG = :delFlag AND a.I_TYPE in (:types)");

        Map param = new HashMap<>();
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());
        param.put("types", types);

        List<Map> list = this.findListBySql(sql.toString(), param, Map.class);
        Integer num = 0;
        if (list != null && list.size() > 0) {
            num = MapUtil.getInteger(list.get(0), "num");
        }
        return num;
    }

    /**
     * 新增人数分段查询列表
     *
     * @param startDate
     * @param endDate
     * @param pageable
     * @return
     */
    @Override
    public Page<Map> getPersonPage(Date startDate, Date endDate, Pageable pageable) {
        StringBuilder sb = new StringBuilder();
        sb.append(" SELECT ");
        sb.append(" DATE_FORMAT(s.time, '%Y-%m-%d') AS time, ");
        sb.append(" sum(s.memberCount) AS memberCount, ");
        sb.append(" sum(s.shoperCount) AS shoperCount ");
        sb.append(" from ( ");

        sb.append(" (");
        sb.append(" SELECT ");
        sb.append(" DATE_FORMAT(t.D_CREATE_DATE, '%Y-%m-%d') AS time, "); // 统计日期
        sb.append(" COUNT(1) AS memberCount, "); // 会员数
        sb.append(" 0 AS shoperCount "); // 店主数
        sb.append(" FROM T_CUS_INFO t ");
        sb.append(" WHERE t.I_DEL_FLAG = "+ PubEnum.YesOrNoEnum.NO.getValue());
        sb.append(" AND t.I_TYPE =  "+CusInfo.Type.RegistUser.getValue());
        sb.append(" GROUP BY DATE_FORMAT(t.D_CREATE_DATE, '%Y-%m-%d') ");

        sb.append(") union (");

        sb.append(" SELECT ");
        sb.append(" DATE_FORMAT(t.D_CREATE_DATE, '%Y-%m-%d') AS time, "); // 统计日期
        sb.append(" 0 AS memberCount, "); // 会员数
        sb.append(" COUNT(1) AS shoperCount "); // 店主数
        sb.append(" FROM T_CUS_INFO t ");
        sb.append(" WHERE t.I_DEL_FLAG = "+ PubEnum.YesOrNoEnum.NO.getValue());
        sb.append(" AND t.I_TYPE =  "+CusInfo.Type.ShopOwner.getValue());
        sb.append(" GROUP BY DATE_FORMAT(t.D_CREATE_DATE, '%Y-%m-%d') ");
        sb.append(")");

        sb.append(") s WHERE 1=1 ");
        Map param = new HashMap<>();
        if(StringUtil.checkObj(startDate)){
            sb.append(" AND s.time >= :start");
            param.put("start", startDate);
        }
        if(StringUtil.checkObj(endDate)){
            endDate = DateUtil.addDays(endDate, 1);//endDate默认0点，延后一天
            sb.append(" AND s.time <= :end");
            param.put("end", endDate);
        }
        sb.append(" GROUP BY s.time ");
        sb.append(" ORDER BY s.time desc");

        return this.findPageBySql(sb.toString(), param, pageable, Map.class);
    }

    /**
     * 用户统计
     *
     * @param startCreateDate 开始时间
     * @param endCreateDate   结束时间
     * @param type            统计周期
     * @param cusType         用户类型
     * @return
     */
    @Override
    public List<Map> cusStatisti(Date startCreateDate, Date endCreateDate, DateDimension type, Integer cusType) {
        Map params = new HashMap<>();
        params.put("startCreateDate", startCreateDate);
        StringBuilder sb = new StringBuilder();

        switch (type) {
            case DAY:
                // yyyy-MM-dd时间转换为yyyy-MM-dd 23:59:59
                Date endDate4Day = DateUtil.addDays(endCreateDate, 1);
                endDate4Day = DateUtil.addSeconds(endDate4Day, -1);
                params.put("endCreateDate", endDate4Day);
                params.put("type", cusType);

                sb.append("SELECT new map( ");
                sb.append("DATE_FORMAT(t.createDate, '%Y-%m-%d') AS time, "); // 统计日期
                sb.append("COUNT(1) AS cusCount "); // 统计总数
                sb.append(") FROM CusInfo t ");
                sb.append("WHERE t.type = :type ");
                sb.append("AND t.createDate >= :startCreateDate ");
                sb.append("AND t.createDate <= :endCreateDate ");
                sb.append("GROUP BY DATE_FORMAT(t.createDate, '%Y-%m-%d') ");
                break;
            case MONTH:
                // 查询小于当前时间前一天23:59:59
                Date endDate4Month = DateUtil.clearTime(new Date());
                endDate4Month = DateUtil.addSeconds(endDate4Month, -1);
                params.put("endCreateDate", endDate4Month);
                params.put("type", cusType);

                sb.append("SELECT new map( ");
                sb.append("DATE_FORMAT(t.createDate, '%Y%m') AS time, "); // 统计日期
                sb.append("COUNT(1) AS cusCount "); // 统计总数
                sb.append(") FROM CusInfo t ");
                sb.append("WHERE t.type = :type ");
                sb.append("AND t.createDate >= :startCreateDate ");
                sb.append("AND t.createDate <= :endCreateDate ");
                sb.append("GROUP BY DATE_FORMAT(t.createDate, '%Y%m') ");
                break;
            case YEAR:
                break;
            default:
                break;
        }

        return this.findListByJql(sb.toString(), params, Map.class);
    }



    /**
     * 获取店主信息
     *
     * @param cusName    用户昵称
     * @param leaderName 所属主管
     * @param pageable
     * @return
     */
    public Page<Map> getShopkeeperByPage(String cusName, String leaderName, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_ID AS \"id\", ");
        sql.append(" t1.S_NAME AS \"name\", ");
        sql.append(" t1.S_MOBILE AS \"mobile\", ");
        sql.append(" t3.S_LEADER_NAME AS \"leaderName\" ");
        sql.append(" FROM T_CUS_INFO t1 ");
        sql.append(" LEFT JOIN T_CUS_ALLOT_REL t2 ON t1.I_ID = t2.I_CUS_ID");
        sql.append(" LEFT JOIN T_CUS_ALLOT t3 ON t2.I_TEAM_ID = t3.I_ID");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_TYPE = :type");

        param.put("type", CusInfo.Type.ShopOwner.getValue());

        sql.append(" AND t1.I_DEL_FLAG = :delFlag");
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());

        if (StringUtil.isNotBlank(cusName)) {
            sql.append(" AND t1.S_NAME like (:cusName)");
            param.put("cusName", cusName + "%");
        }

        if (StringUtil.isNotBlank(leaderName)) {
            sql.append(" AND t3.S_LEADER_NAME like (:leaderName)");
            param.put("leaderName", leaderName + "%");
        }

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }

    /**
     * 获取店主邀请人数、收益以及代金券信息
     *
     * @param cusIds 店主标识集合
     * @return
     */
    public List<Map> getCouPonCusAndProfit(List<Long> cusIds) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_INVITATION_ID AS \"cusId\", ");
        sql.append(" COUNT(t1.I_ID) AS \"invitationNum\" ");
        sql.append(" FROM T_CUS_INFO t1 ");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_INVITATION_ID IN (:cusIds)");
        param.put("cusIds", cusIds);

        sql.append(" GROUP BY t1.I_INVITATION_ID");
        return this.findListBySql(sql.toString(), param, Map.class);
    }

    /**
     * 获取店主收益
     *
     * @param cusIds 店主标识集合
     * @return
     */
    public List<Map> getProfit(List<Long> cusIds) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_CUS_ID AS \"cusId\", ");
        sql.append(" MAX(t1.I_TOTAL_MONEY) AS \"totalMoney\" ");
        sql.append(" FROM T_CUS_ACCOUNT_CONSUME t1 ");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_CUS_ID IN (:cusIds)");
        param.put("cusIds", cusIds);

        sql.append(" GROUP BY t1.I_CUS_ID");
        return this.findListBySql(sql.toString(), param, Map.class);
    }

    /**
     * 获取店主代金券信息
     *
     * @param cusIds 店主标识集合
     * @return
     */
    public List<Map> getCouPon(List<Long> cusIds) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_CUS_ID AS \"cusId\", ");
        sql.append(" COUNT(t1.I_ID) AS \"couponNum\", ");
        sql.append(" SUM(t1.I_FACE_VALUE) AS \"faceValue\" ");
        sql.append(" FROM T_COUPON_CUS t1 ");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_CUS_ID IN (:cusIds)");
        param.put("cusIds", cusIds);

        sql.append(" GROUP BY t1.I_CUS_ID");
        return this.findListBySql(sql.toString(), param, Map.class);
    }


    public Page<Map> getDirectorInfoByPage(String leaderName, Pageable pageable) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_ID AS \"id\", ");
        sql.append(" t1.S_MOBILE AS \"mobile\", ");
        sql.append(" t1.S_NAME AS \"leaderName\", ");
        sql.append(" t2.I_STAFF_NUM AS \"staffNum\", ");
        sql.append(" t3.I_TOTAL_MONEY AS \"totalMoney\"");
        sql.append(" FROM T_CUS_INFO t1 ");
        sql.append(" LEFT JOIN T_CUS_ALLOT t2 ON t1.I_ID = t2.I_LEADER_ID");
        sql.append(" LEFT JOIN T_CUS_ACCOUNT_CONSUME t3 ON t1.I_ID = t3.I_CUS_ID");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        sql.append(" AND t1.I_TYPE = :type");
        param.put("type", CusInfo.Type.Director.getValue());

        sql.append(" AND t1.I_DEL_FLAG = :delFlag");
        param.put("delFlag", PubEnum.YesOrNoEnum.NO.getValue());


        if (StringUtil.isNotBlank(leaderName)) {
            sql.append(" AND t1.S_NAME like (:leaderName)");
            param.put("leaderName", leaderName + "%");
        }

        return this.findPageBySql(sql.toString(), param, pageable, Map.class);
    }


    /**
     * 获取邀请码
     *
     * @param shopId  店铺标识
     * @return
     */
    public List<Map> findInvitationNo(Long shopId){
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t2.S_INVITATION_NO AS \"invitationNo\" ");
        sql.append(" FROM T_CUS_SHOP t1 ");
        sql.append(" LEFT JOIN T_CUS_INFO t2 ON t2.I_ID = t1.I_CUS_ID ");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        if(StringUtil.checkObj(shopId)){
            sql.append(" AND t1.I_ID = :shopId");
            param.put("shopId", shopId);
        }

        return this.findListBySql(sql.toString(), param, Map.class);
    }

    /**
     * 获取店主邀请人员树
     *
     * @param cusId 店主标识
     * @return
     */
    public List<Map> getTreePage(Long cusId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT ");
        sql.append(" t1.I_ID AS \"id\", ");
        sql.append(" t1.S_NAME AS \"name\", ");
        sql.append(" t1.S_ACCOUNT AS \"account\", ");
        sql.append(" t1.I_INVITATION_ID AS \"invitationId\", ");
        sql.append(" t1.S_INVITATION_PATH AS \"invitationPath\" ");
        sql.append(" FROM T_CUS_INFO t1 ");
        sql.append(" WHERE 1=1 ");

        Map param = new HashMap<>();
        if(StringUtil.checkObj(cusId)){
            sql.append(" AND t1.S_INVITATION_PATH LIKE :cusId");
            param.put("cusId", "%"+"/"+cusId+"%");
        }

        return this.findListBySql(sql.toString(), param, Map.class);
    }
}
