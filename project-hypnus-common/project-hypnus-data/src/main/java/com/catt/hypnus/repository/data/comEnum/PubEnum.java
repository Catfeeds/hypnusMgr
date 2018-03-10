package com.catt.hypnus.repository.data.comEnum;

import com.catt.common.util.lang.StringUtil;

import java.util.Map;

/**
 * 系统业务公共枚举
 * @author  houhuateng on 2016/6/20.
 */
public class PubEnum {

    /**
     * 通用是否枚举
     *
     * @author houhuateng
     *
     */
    public enum YesOrNoEnum {
        /**
         * 是
         */
        YES(1, "是"),
        /**
         * 否
         */
        NO(2, "否");

        /**
         * 值
         */
        private Integer value;

        /**
         * 显示值
         */
        private String name;

        YesOrNoEnum(Integer value, String name) {
            this.value = value;
            this.name = name;
        }

        /**
         * 由数字得是否多实例枚举对象
         *
         * @param value
         * @return
         */
        public static YesOrNoEnum getEnum(int value) {
            YesOrNoEnum result = null;
            if(YesOrNoEnum.YES.getValue() == value){
                result = YesOrNoEnum.YES;
            }else{
                result = YesOrNoEnum.NO;
            }
            return result;
        }

        /**
         * 取值
         *
         * @return
         */
        public int getValue() {
            return this.value;
        }

        /**
         * 取中文名称
         *
         * @return
         */
        public String getName() {
            return this.name;
        }

        /**
         * 获取特定的 是 否枚举
         * @param map
         * @param colCnName 获取的字段
         * @param newColName 返回的字段
         * @return
         */
        public static void getYesOrNoName(Map<String, String> map , String colCnName, String newColName){
            String str = "";
            if(StringUtil.checkObj(map.get(colCnName))){
                int a = Integer.valueOf(map.get(colCnName));
                if(a == 1){//转换=0 为否的，枚举值不统一
                    str = "是";
                }else {
                    str = "否";
                }
            }
            map.put(newColName, str);
        }
    }
}
