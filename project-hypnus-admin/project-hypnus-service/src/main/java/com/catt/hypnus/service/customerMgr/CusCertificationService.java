package com.catt.hypnus.service.customerMgr;


import com.catt.common.base.pojo.search.Page;

import java.util.Map;

/**
 * 用户实名认证服务接口
 * 
 * @author chen chusheng
 * @date 2017-03-08 15:56:06
 * @version V1.0
 */
public interface CusCertificationService{

    /**
     * 获取详情
     * @param certificationId
     * @return
     */
    Map<String, Object> getDetail(Long certificationId);

    /**
     * 查询分页数据
     * @param params
     * @return
     */
    Page<Map> getPage(Map<String, Object> params);

    /**
     * 审核
     * @param params
     */
    void auditCertification(Map<String, Object> params);

}
