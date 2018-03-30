package com.catt.hypnus.service.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;
import com.catt.common.base.service.BaseService;
import com.catt.hypnus.repository.entity.factoryMgr.FactoryInfo;

import java.util.Map;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:33
 * @Desc:
 **/
public interface FactoryService extends BaseService<FactoryInfo,Long>
{
    Page<Map> queryList(String phone, Pageable pageable);

    Page<Map> queryListNonBind(String phone,Pageable pageable);

    void addFactoryInfo(FactoryInfo info);

    void updateFactoryInfo(FactoryInfo info);

    void deleteFactory(Long id);

    void updatePassword(Long id,String password);
}
