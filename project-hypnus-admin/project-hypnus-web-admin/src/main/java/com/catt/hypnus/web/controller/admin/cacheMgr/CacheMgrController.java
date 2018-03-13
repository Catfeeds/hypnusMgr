package com.catt.hypnus.web.controller.admin.cacheMgr;

import com.catt.common.web.Message;
import com.catt.common.web.controller.BaseController;
import com.catt.hypnus.service.pub.CacheService;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 系统缓存控制器
 *
 * @author runtime
 * @version V1.0
 * @date 2016-03-14 15:26:28
 */
@Controller("cacheController")
@RequestMapping("/admin/cache")
public class CacheMgrController extends BaseController {

    @Resource(name = "cacheServiceImpl")
    private CacheService cacheService;

    @RequestMapping(value = "/index")
    public String index() {
        return "/admin/cache/index";
    }

    /**
     * 清理缓存
     *
     * @param cacheName 缓存标识名称
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/flush")
    public Message flush(String cacheName) {
        Assert.hasLength(cacheName);
        cacheService.flush(cacheName);
        return SUCCESS_MSG;
    }

    /**
     * 清理缓存
     *
     * @param cacheNames 缓存标识名称数组
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/flush2")
    public Message flush2(String[] cacheNames) {
        Assert.notNull(cacheNames);
        Assert.isTrue(cacheNames.length > 0);
        cacheService.flush(cacheNames);
        return SUCCESS_MSG;
    }

    /**
     * 清理所有缓存
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/flushAll")
    public Message flushAll() {
        cacheService.flushAll();
        return SUCCESS_MSG;
    }

}
