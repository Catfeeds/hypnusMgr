package com.catt.hypnus.repository.entity.customerMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 购物车信息实体类
 * 
 * @author 袁幸成
 * @date 2017-02-10 08:50:22
 * @version V1.0
 */
@Entity
@JsonAutoDetect
@Table(name = "T_CUS_CART")
public class CusCart extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	
	/**
	 * 用户标识
	 */
	private Long cusId;
	/**
	 * 厂家标识
	 */
	private Long factoryId;
	/**
	 * 商品种类标识<p><br>
	 * 商品种类标识
	 */
	private Long cateId;
	/**
	 * 商品种类名称<p><br>
	 * 商品种类名称
	 */
	private String cateName;
	/**
	 * 商品标识
	 */
	private Long productId;
	/**
	 * 商品类型<p><br>
	 * 1-单品<br>2-套餐
	 */
	private Integer type;
	/**
	 * 商品名称
	 */
	private String productName;
	/**
	 * 商品编码<p><br>
	 * 商品编码
	 */
	private String code;
	/**
	 * 商品条码<p><br>
	 * 商品条码
	 */
	private String barCode;
	/**
	 * 商品封面<p><br>
	 * 保存商品图片在附件表的标识
	 */
	private String headPath;
	/**
	 * 商品属性<p><br>
	 * 商品属性描述
	 */
	private String attrJson;
	/**
	 * 商品价格标识
	 */
	private Long priceId;
	/**
	 * 购买数量
	 */
	private Integer num;
	/**
	 * 创建人员标识<p><br>
	 * 创建人员标识
	 */
	private Long createdId;
	/**
	 * 创建人员名称<p><br>
	 * 创建人员名称
	 */
	private String createdName;
    /**
     * 使用类型
     * 1-购物车  2-进货清单
     */
    private Integer useType;

	@Column(name = "I_CUS_ID")
	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	@Column(name = "I_FACTORY_ID")
	public Long getFactoryId() {
		return factoryId;
	}

	public void setFactoryId(Long factoryId) {
		this.factoryId = factoryId;
	}

	@Column(name = "I_CATE_ID")
	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	@Column(name = "S_CATE_NAME", length = 128)
	public String getCateName() {
		return cateName;
	}

	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	@Column(name = "I_PRODUCT_ID")
	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	@Column(name = "I_TYPE")
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Column(name = "S_PRODUCT_NAME", length = 128)
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	@Column(name = "S_CODE", length = 128)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "S_BAR_CODE", length = 128)
	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	@Column(name = "S_HEAD_PATH", length = 512)
	public String getHeadPath() {
		return headPath;
	}

	public void setHeadPath(String headPath) {
		this.headPath = headPath;
	}

	@Column(name = "S_ATTR_JSON", length = 4000)
	public String getAttrJson() {
		return attrJson;
	}

	public void setAttrJson(String attrJson) {
		this.attrJson = attrJson;
	}

	@Column(name = "I_PRICE_ID")
	public Long getPriceId() {
		return priceId;
	}

	public void setPriceId(Long priceId) {
		this.priceId = priceId;
	}

	@Column(name = "I_NUM")
	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	@Column(name = "I_CREATED_ID")
	public Long getCreatedId() {
		return createdId;
	}

	public void setCreatedId(Long createdId) {
		this.createdId = createdId;
	}

	@Column(name = "S_CREATED_NAME", length = 32)
	public String getCreatedName() {
		return createdName;
	}

	public void setCreatedName(String createdName) {
		this.createdName = createdName;
	}

    @Column(name = "I_USE_TYPE")
    public Integer getUseType() {
        return useType;
    }

    public void setUseType(Integer useType) {
        this.useType = useType;
    }

    /**
     * 使用类型
     * 1-购物车  2-进货清单
     */
    public enum UseType {
        //购物车
        SHOPPING_CART(1, "购物车"),
        //进货清单
        PURCHASE_LIST(2, "进货清单");

        //枚举值
        private Integer value;

        //枚举中文
        private String name;

        UseType(Integer value, String name) {
            this.value = value;
            this.name = name;
        }

        public static UseType getEnum(int value) {
            UseType[] source = UseType.values();
            for (int i = 0; i < source.length; i++) {
                if (source[i].getValue() == value) {
                    return source[i];
                }
            }
            return null;
        }

        public int getValue() {
            return this.value;
        }

        public String getName() {
            return this.name;
        }
    }

}

