package com.catt.hypnus.service.pub;

/**
 * 系统缓存业务接口
 *
 * @author runtime
 * @version V1.0
 * @date 2016-03-14 15:26:28
 */
public interface CacheService {
    /**
     * 清理缓存
     * @param cacheName 缓存标识名称
     */
    void flush(String cacheName);

    /**
     * 清理缓存
     * @param cacheNames 缓存标识名称数组
     */
    void flush(String[] cacheNames);

    /**
     * 清理所有缓存
     */
    void flushAll();
}
