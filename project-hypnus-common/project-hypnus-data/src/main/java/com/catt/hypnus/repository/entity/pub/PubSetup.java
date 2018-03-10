package com.catt.hypnus.repository.entity.pub;

import com.catt.common.base.repository.entity.UUIDBaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 系统全局设置实体类
 *
 * @author 周明祥
 * @version V1.0
 * @date 2015-11-19 15:29:44
 */
@Entity
@JsonAutoDetect
@Table(name = "T_PUB_SETUP")
public class PubSetup extends UUIDBaseEntity {

    private static final long serialVersionUID = 1L;
    /**
     * <pre>
     * 编码
     * </pre>
     */
    private String code;
    /**
     * <pre>
     * 名称
     * </pre>
     */
    private String name;
    /**
     * <pre>
     * 值
     * </pre>
     */
    private String value;

    @Column(name = "S_CODE", length = 64)
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Column(name = "S_NAME", length = 64)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "S_VALUE", length = 2048)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public enum Code {

        /**
         * 自营厂家标识
         */
        selfSupport("SELF_SUPPORT", "1"),
        /**
         * 基础数据版本号-区域数据
         */
        baseDataVersionArea("BASE_DATA_VERSION_AREA", "20160101000000"),
        /**
         * 基础数据版本号-新浪支持银行数据
         */
        baseDataVersionSinaBank("BASE_DATA_VERSION_SINA_BANK", "20160101000000"),

        /**
         * 微信公众号id
         */
        wechartPID("WECHART_PID", ""),

        /**
         * 订单超时时间设置，单位：分钟
         */
        orderTimeoutCode("ORDER_TIMEOUT", "1440"),
        /**
         * 支付超时时间设置，单位：分钟
         */
        payTimeoutCode("PAY_TIMEOUT", "60"),

        /**
         * 新浪-会员网关
         */
        sinaMemberGateway("SINA_MEMBER_GATEWAY"),
        /**
         * 新浪-收单网关
         */
        sinaOrderGateway("SINA_ORDER_GATEWAY"),
        /**
         * 新浪-商户ID
         */
        sinaPartnerId("SINA_PARTNER_ID", true),
        /**
         * 新浪-签名方式
         */
        sinaSignType("SINA_SIGN_TYPE"),
        /**
         * 新浪-签名密钥
         */
        sinaSignKey("SINA_SIGN_KEY", true),
        /**
         * 新浪-敏感数据加密公钥
         */
        sinaEncryptPubkey("SINA_ENCRYPT_PUBKEY", true),
        /**
         * 新浪-验签公钥
         */
        sinaChecksignPubkey("SINA_CHECKSIGN_PUBKEY", true),
        /**
         * 新浪sftp-服务器地址
         */
        sinaSftpHost("SINA_SFTP_HOST", true),
        /**
         * 新浪sftp-服务器端口
         */
        sinaSftpPort("SINA_SFTP_PORT", true),
        /**
         * 新浪sftp-登录用户名
         */
        sinaSftpUsername("SINA_SFTP_USERNAME", true),

        /**
         * 支付宝-合作者身份ID
         */
        aliPartner("ALI_PARTNER", true),
        /**
         * 支付宝-卖家支付宝账号
         */
        aliSellerId("ALI_SELLER_ID", true),
        /**
         * 支付宝-RSA签名密钥
         */
        aliSignKey("ALI_SIGN_KEY", true),
        /**
         * 支付宝-开发者的AppId，扫码、刷卡支付需要提供
         */
        aliAppId("ALI_APP_ID", true),

        /**
         * 微信开放平台-应用ID
         */
        wechatOpenAppId("WECHAT_OPEN_APP_ID", true),
        /**
         * 微信开放平台-商户ID
         */
        wechatOpenMchId("WECHAT_OPEN_MCH_ID", true),
        /**
         * 微信开放平台-签名密钥
         */
        wechatOpenSignKey("WECHAT_OPEN_SIGN_KEY", true),

        /**
         * 微信公众平台-应用ID
         */
        wechatPubAppId("WECHAT_PUB_APP_ID", true),
        /**
         * 微信公众平台-商户ID
         */
        wechatPubMchId("WECHAT_PUB_MCH_ID", true),
        /**
         * 微信公众平台-签名密钥
         */
        wechatPubSignKey("WECHAT_PUB_SIGN_KEY", true),
        wechatSub("WECHAT_PUB_SIGN_KEY", true),
        /**
         * 取消微信关注
         */
        wechatUnSubscribe("WECHAT_UNSUBSCRIBE", "欢迎再次关注我，再见！"),
        /**
         * 微信关注
         */
        wechatSubscribe("WECHAT_SUBSCRIBE", "感谢您的关注，谢谢！"),

        /**
         * 苹果app下载路径
         */
        appleDownloadUrl("2001"),
        /**
         * 安卓app下载路径
         */
        androidDownloadUrl("2002"),

        /**
         * 是否商店审核中（登陆验证码为固定值）
         */
        isStoreAuditing("STORE_AUDITING", "0"),

        /**
         * 商店测试账号(可以存放多个号码，用,号分隔)
         */
        storeTestUsername("STORE_TEST_USER_NAME"),
        /**
         * 商店测试账号固定验证码
         */
        storeTestSmsCode("STORE_TEST_SMS_CODE", "123456"),

        /**
         * 补贴奖励结算跨天数
         */
        settlementDays("SETTLEMENT_DAYS", "15"),

        /**
         * 开店配置
         */
        openStoreSet("OPEN_STORE_SET"),

        /**
         * 店铺到期提示时间（天数）
         */
        openStoreTimeOut("openStoreTimeOut", "30"),

        /**
         * 最佳图片长宽比例(接口调用)
         */
        picRatio("PIC_RATIO"),

        /**
         * 最佳图片长宽比例(界面提示)
         */
        picRatioForShow("PIC_RATIO_SHOW");

        /**
         * 配置的code值
         */
        private String name;
        /**
         * 配置的默认值
         */
        private String defaultValue;
        /**
         * 数据库值是否加密
         */
        private boolean isEncrypted;

        Code(String name) {
            this(name, null, false);
        }

        Code(String name, String defaultValue) {
            this(name, defaultValue, false);
        }

        Code(String name, boolean isEncrypted) {
            this(name, null, isEncrypted);
        }

        Code(String name, String defaultValue, boolean isEncrypted) {
            this.name = name;
            this.defaultValue = defaultValue;
            this.isEncrypted = isEncrypted;
        }

        /**
         * 由数字得是否多实例枚举对象
         *
         * @param name 枚举值
         * @return 返回中文
         */
        public static Code getEnum(String name) {
            Code[] codes = Code.values();
            for (Code code : codes) {
                if (code.getName().equals(name)) {
                    return code;
                }
            }
            return null;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDefaultValue() {
            return defaultValue;
        }

        public void setDefaultValue(String defaultValue) {
            this.defaultValue = defaultValue;
        }

        public boolean isEncrypted() {
            return isEncrypted;
        }

        public void setEncrypted(boolean isEncrypted) {
            this.isEncrypted = isEncrypted;
        }

    }


    public enum Type {

    }
}
