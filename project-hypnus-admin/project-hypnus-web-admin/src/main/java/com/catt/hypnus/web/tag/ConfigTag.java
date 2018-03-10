package com.catt.hypnus.web.tag;

import com.catt.common.util.lang.StringUtil;
import com.catt.common.util.spring.SpringUtils;
import com.catt.hypnus.repository.entity.pub.PubSetup;
import com.catt.hypnus.service.base.pub.PubSetupBaseService;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

/**
 * @author Zhang zhongtao
 * @version 1.0.0.20171023
 * @since JDK V1.8
 */
public class ConfigTag extends SimpleTagSupport {

    private PubSetupBaseService getPubSetupBaseService() {
        return SpringUtils.getBean("pubSetupBaseServiceImpl");
    }

    /**
     * 配置源
     */
    private ConfigSource source = ConfigSource.DB;

    /**
     * 配置key名称
     */
    private String key;

    /**
     * 默认值
     */
    private String defaultValue = "";

    /**
     * 是否需要解密
     */
    private boolean isEncrypted;

    /**
     * 是否需要过国际化
     */
    private boolean iIn18 = false;

    public ConfigSource getSource() {
        return source;
    }

    public void setSource(ConfigSource source) {
        this.source = source;
    }

    public boolean isEncrypted() {
        return isEncrypted;
    }

    public void setEncrypted(boolean encrypted) {
        isEncrypted = encrypted;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public boolean isiIn18() {
        return iIn18;
    }

    public void setiIn18(boolean iIn18) {
        this.iIn18 = iIn18;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    @Override
    public void doTag() throws JspException, IOException {
        JspWriter out = getJspContext().getOut();
        String body = "";

        switch (getSource()) {
            case DB:
                //获取配置项目
                PubSetup pubSetup = getPubSetupBaseService().findByCode(getKey(), isEncrypted());
                if (pubSetup != null) {
                    body = pubSetup.getValue();
                }
                break;
            case Config:
                throw new UnsupportedOperationException("暂不支持此操作：" + getSource());
            case SystemConfig:
                throw new UnsupportedOperationException("暂不支持此操作：" + getSource());
            default:
                break;
        }

        out.println(StringUtil.defaultIfBlank(body, defaultValue));
    }

    public enum ConfigSource {
        /**
         * 从T_PUB_SETUP表读取
         */
        DB,
        /**
         * 从system.properties中读取
         */
        SystemConfig,
        /**
         * 从config.properties中读取
         */
        Config
    }
}
