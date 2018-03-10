package com.catt.hypnus.repository.dao.customerMgr;

import com.catt.common.base.repository.dao.BaseDao;
import com.catt.hypnus.repository.entity.customerMgr.CusCart;

import java.util.List;
import java.util.Map;

/**
 * 购物车信息Dao接口
 * 
 * @author 袁幸成
 * @date 2017-02-10 08:50:22
 * @version V1.0
 */
public interface CusCartDao extends BaseDao<CusCart, Long> {

    /**
     * 获取购物车商品列表
     * @param cusId 用户标识
     * @param useType 使用类型 1-购物车  2-进货清单
     * @return
     */
    List<Map> findAll(Long cusId, Integer useType);

    /**
     * 获取购物车关联的商品
     * @param cartIds 购物车标识数组
     * @return
     */
    List<Map> findProductByCartIds(Long[] cartIds);
}
