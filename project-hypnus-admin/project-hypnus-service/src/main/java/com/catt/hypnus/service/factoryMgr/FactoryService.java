package com.catt.hypnus.service.factoryMgr;

import com.catt.common.base.pojo.search.Page;
import com.catt.common.base.pojo.search.Pageable;

import java.util.Map;

/**
 * @Author:lyz
 * @Date: 2018/3/17 16:33
 * @Desc:
 **/
public interface FactoryService
{
    Page<Map> queryList(String phone, Pageable pageable);
}
