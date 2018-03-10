CREATE DATABASE  IF NOT EXISTS `hypnus` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `hypnus`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 192.168.188.154    Database: hypnus_test
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sequence`
--

DROP TABLE IF EXISTS `sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequence` (
  `name` varchar(50) NOT NULL,
  `current_value` int(11) NOT NULL,
  `increment` int(11) NOT NULL DEFAULT '1',
  `content` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='序列表，命名s_[table_name]';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_activity_info`
--

DROP TABLE IF EXISTS `t_activity_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_activity_info` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_COVER_PATH` varchar(512) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_DESC` varchar(4000) DEFAULT NULL,
  `D_END_TIME` datetime DEFAULT NULL,
  `S_NAME` varchar(64) DEFAULT NULL,
  `S_PIC_PATH` varchar(512) DEFAULT NULL,
  `D_START_TIME` datetime DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_activity_product_rel`
--

DROP TABLE IF EXISTS `t_activity_product_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_activity_product_rel` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACT_ID` bigint(20) DEFAULT NULL,
  `I_ACTSALE_NUM` int(11) DEFAULT NULL,
  `I_ACTSALE_REALNUM` int(11) DEFAULT NULL,
  `I_CITY_AGENT` double DEFAULT NULL,
  `I_COST_PRICE` double DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_GENERAL_AGENT` double DEFAULT NULL,
  `I_PRICE_ID` bigint(20) DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `I_PROFIT` double DEFAULT NULL,
  `I_PROVINCIAL_AGENT` double DEFAULT NULL,
  `I_REGIONAL_AGENT` double DEFAULT NULL,
  `I_SALES_PRICE` double DEFAULT NULL,
  `I_REBATE_FIVE` double DEFAULT NULL,
  `I_REBATE_FOUR` double DEFAULT NULL,
  `I_REBATE_ONE` double DEFAULT NULL,
  `I_REBATE_THREE` double DEFAULT NULL,
  `I_REBATE_TWO` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_agent_info`
--

DROP TABLE IF EXISTS `t_agent_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
create table t_agent_info
(
  I_ID bigint not null
    primary key,
  D_CREATE_DATE datetime not null,
  D_MODIFY_DATE datetime not null,
  i_agency_level int(4) null,
  i_status int(4) null,
  i_cus_id bigint null,
  s_site varchar(255) null,
  d_apply_time datetime null,
  d_audit_time datetime null,
  i_audit_staff_id bigint null,
  s_province_id varchar(32) null,
  s_province_name varchar(128) null,
  s_city_id varchar(32) null,
  s_city_name varchar(128) null,
  s_region_id varchar(32) null,
  s_region_name varchar(128) null,
  s_cause varchar(128) null,
  s_apply_remark varchar(1024) null
)
  engine=InnoDB  DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_coupon_cus`
--

DROP TABLE IF EXISTS `t_coupon_cus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_coupon_cus` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_COUPON_ID` bigint(20) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `D_CREATED_TIME` datetime DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_FACE_VALUE` float DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `D_INVALID_TIME` datetime DEFAULT NULL,
  `I_IS_USE` int(11) DEFAULT NULL,
  `D_MODIFY_TIME` datetime DEFAULT NULL,
  `S_ORDER_CODE` varchar(128) DEFAULT NULL,
  `D_RECEIVE_TIME` datetime DEFAULT NULL,
  `D_USE_TIME` datetime DEFAULT NULL,
  `I_SOURCE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_coupon_info`
--

DROP TABLE IF EXISTS `t_coupon_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_coupon_info` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_COUPON_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_DEL_FLAG` int(11) DEFAULT NULL,
  `I_FACE_VALUE` double DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_LIMIT_DATE` int(11) DEFAULT NULL,
  `I_MONEY_LIMIT` int(11) DEFAULT NULL,
  `I_ORDER_MONEY` double DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_SEND_NUM` int(11) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `I_TYPE_LIMIT` int(11) DEFAULT NULL,
  `I_USE_NUM` int(11) DEFAULT NULL,
  `S_TYPE_LIMIT_DESC` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_coupon_range`
--

DROP TABLE IF EXISTS `t_coupon_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_coupon_range` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_COUPON_ID` bigint(20) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `D_CREATED_TIME` datetime DEFAULT NULL,
  `D_MODIFY_TIME` datetime DEFAULT NULL,
  `I_RANGE_TYPE` int(11) DEFAULT NULL,
  `S_REL_ID` varchar(2000) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_coupon_rule`
--

DROP TABLE IF EXISTS `t_coupon_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_coupon_rule` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_CATE_NAME` varchar(128) DEFAULT NULL,
  `I_COUPON_ID` bigint(20) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `D_CREATED_TIME` datetime DEFAULT NULL,
  `D_MODIFY_TIME` datetime DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_account_consume`
--

DROP TABLE IF EXISTS `t_cus_account_consume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_account_consume` (
  `I_ID` bigint(20) NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_GIVE_MONEY` double DEFAULT NULL,
  `I_SALES_MONEY` double DEFAULT NULL,
  `I_TOTAL_MONEY` double DEFAULT NULL,
  `I_GET_MONEY` double DEFAULT NULL,
  `I_REMAINDER_MONEY` double DEFAULT NULL,
  `I_APPLY_MONEY` double DEFAULT NULL,
  `S_VALID_NO` varchar(256) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_UNACCEPT_MONEY` double DEFAULT NULL,
  `I_RECIVE_REBATE_MONEY` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_account_detail`
--

DROP TABLE IF EXISTS `t_cus_account_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_account_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_TYPE` tinyint(4) DEFAULT NULL,
  `I_MONEY` double DEFAULT NULL,
  `I_LEFT_MONEY` double DEFAULT NULL,
  `S_REL_ID` varchar(64) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_allot`
--

DROP TABLE IF EXISTS `t_cus_allot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_allot` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_AGENT_ID` bigint(20) DEFAULT NULL,
  `S_AGENT_NAME` varchar(128) DEFAULT NULL,
  `S_ALLOT_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `S_FACTORY_NAME` varchar(128) DEFAULT NULL,
  `I_LEADER_ID` bigint(20) DEFAULT NULL,
  `S_LEADER_NAME` varchar(32) DEFAULT NULL,
  `I_LEVEL` int(11) DEFAULT NULL,
  `I_ORDER_NUM` int(11) DEFAULT NULL,
  `S_PATH` varchar(128) DEFAULT NULL,
  `I_SALES_MONEY` double DEFAULT NULL,
  `I_STAFF_NUM` bigint(20) DEFAULT NULL,
  `I_UP_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_allot_rel`
--

DROP TABLE IF EXISTS `t_cus_allot_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_allot_rel` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_TEAM_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_bank`
--

DROP TABLE IF EXISTS `t_cus_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_bank` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BANK_ACCOUNT` varchar(128) DEFAULT NULL,
  `S_BANK_CARD` varchar(128) DEFAULT NULL,
  `I_BANK_TYPE` int(11) DEFAULT NULL,
  `S_BRANCH` varchar(256) DEFAULT NULL,
  `S_CITY_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `S_PROVINCE_NAME` varchar(128) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_cart`
--

DROP TABLE IF EXISTS `t_cus_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_cart` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ATTR_JSON` varchar(4000) DEFAULT NULL,
  `S_BAR_CODE` varchar(128) DEFAULT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_CATE_NAME` varchar(128) DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `S_HEAD_PATH` varchar(512) DEFAULT NULL,
  `I_NUM` int(11) DEFAULT NULL,
  `I_PRICE_ID` bigint(20) DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `S_PRODUCT_NAME` varchar(128) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  `I_USE_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_certification`
--

DROP TABLE IF EXISTS `t_cus_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_certification` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `S_REAL_NAME` varchar(32) DEFAULT NULL,
  `S_MOBILE` varchar(64) DEFAULT NULL,
  `S_ID_CARD` varchar(128) DEFAULT NULL,
  `S_HOLDPHOTO_PATH` varchar(512) DEFAULT NULL,
  `S_CARDPOSITIVE_PATH` varchar(512) DEFAULT NULL,
  `S_CARDINVERSE_PATH` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_certification_log`
--

DROP TABLE IF EXISTS `t_cus_certification_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_certification_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACT` int(11) DEFAULT NULL,
  `S_CONTENT` varchar(512) DEFAULT NULL,
  `I_OPERATOR_ID` bigint(20) DEFAULT NULL,
  `S_OPERATOR_NAME` varchar(32) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_AUDIT_RESULT` int(11) DEFAULT NULL,
  `S_AUDIT_DESC` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_contact`
--

DROP TABLE IF EXISTS `t_cus_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_contact` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ADDRESS` varchar(256) DEFAULT NULL,
  `S_CITY_ID` varchar(32) DEFAULT NULL,
  `S_CITY_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_IS_DEFAULT` int(11) DEFAULT NULL,
  `S_PROVINCE_ID` varchar(32) DEFAULT NULL,
  `S_PROVINCE_NAME` varchar(128) DEFAULT NULL,
  `S_RECIPIENTS` varchar(64) DEFAULT NULL,
  `S_REGION_ID` varchar(32) DEFAULT NULL,
  `S_REGION_NAME` varchar(128) DEFAULT NULL,
  `S_TEL` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_info`
--

DROP TABLE IF EXISTS `t_cus_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_info` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ACCOUNT` varchar(255) NOT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `S_CITY_ID` varchar(32) DEFAULT NULL,
  `S_CITY_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_DEL_FLAG` int(11) DEFAULT NULL,
  `I_INVITATION_ID` bigint(20) DEFAULT NULL,
  `S_INVITATION_NO` varchar(128) DEFAULT NULL,
  `I_LEVEL` int(11) DEFAULT NULL,
  `S_MOBILE` varchar(64) DEFAULT NULL,
  `S_NICKNAME` varchar(128) DEFAULT NULL,
  `S_PAY_PWD` varchar(128) DEFAULT NULL,
  `S_PHOTO` varchar(128) DEFAULT NULL,
  `S_PROVINCE_ID` varchar(32) DEFAULT NULL,
  `S_PROVINCE_NAME` varchar(128) DEFAULT NULL,
  `S_PWD` varchar(128) DEFAULT NULL,
  `S_REGION_ID` varchar(32) DEFAULT NULL,
  `S_REGION_NAME` varchar(128) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_SETTLEMENT_SYN` int(11) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  `I_WEIX_ID` varchar(128) DEFAULT NULL,
  `S_INVITATION_PATH` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_invoice`
--

DROP TABLE IF EXISTS `t_cus_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_invoice` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BANKACCOUNT_NAME` varchar(128) DEFAULT NULL,
  `S_BANKACCOUNT_NO` varchar(128) DEFAULT NULL,
  `S_COMPANY_ADDRESS` varchar(128) DEFAULT NULL,
  `S_COMPANY_TEL` varchar(64) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `S_INVOICE_NAME` varchar(128) DEFAULT NULL,
  `I_IS_DEFAULT` int(11) DEFAULT NULL,
  `S_OPEN_BANK` varchar(128) DEFAULT NULL,
  `S_POSTCODE` varchar(64) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `S_TAX_CERTIFICATE` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order`
--

DROP TABLE IF EXISTS `t_cus_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_AGENT_ID` bigint(20) DEFAULT NULL,
  `S_CITY_ID` varchar(32) DEFAULT NULL,
  `S_CITY_NAME` varchar(128) DEFAULT NULL,
  `I_COUPON_MONEY` double DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_COUPON_ID` bigint(20) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `S_CUS_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_TYPE` int(11) DEFAULT NULL,
  `I_DEL_FLAG` int(11) DEFAULT NULL,
  `I_LOGISTICS_COST` double DEFAULT NULL,
  `S_ORDER_CODE` varchar(128) DEFAULT NULL,
  `I_ORDER_STATUS` int(11) DEFAULT NULL,
  `I_ORDER_TYPE` int(11) DEFAULT NULL,
  `I_PRODUCT_AMOUNT` double DEFAULT NULL,
  `S_PROVINCE_ID` varchar(32) DEFAULT NULL,
  `S_PROVINCE_NAME` varchar(128) DEFAULT NULL,
  `S_RECIPIENT_ADDRESS` varchar(256) DEFAULT NULL,
  `S_RECIPIENT_NAME` varchar(32) DEFAULT NULL,
  `S_RECIPIENT_TEL` varchar(32) DEFAULT NULL,
  `S_REGION_ID` varchar(32) DEFAULT NULL,
  `S_REGION_NAME` varchar(128) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_RETURN_VALIDITY` int(11) DEFAULT NULL,
  `I_SETTLEMENT_SYN` int(11) DEFAULT NULL,
  `I_SHOP_ID` bigint(20) DEFAULT NULL,
  `I_SHOPKEEPER_ID` bigint(20) DEFAULT NULL,
  `S_SHOPKEEPER_NAME` varchar(32) DEFAULT NULL,
  `D_SIGNIN_DATE` datetime DEFAULT NULL,
  `I_SOURCE` int(11) DEFAULT NULL,
  `S_THIRD_CODE` varchar(128) DEFAULT NULL,
  `I_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_PAY_AMOUNT` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_detail`
--

DROP TABLE IF EXISTS `t_cus_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BAR_CODE` varchar(128) DEFAULT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_CATE_NAME` varchar(128) DEFAULT NULL,
  `I_CITY_AGENT` double DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `I_COST_PRICE` double DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_GENERAL_AGENT` double DEFAULT NULL,
  `S_HEAD_PATH` varchar(512) DEFAULT NULL,
  `I_NUM` int(11) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `I_PAY_PRICE` double DEFAULT NULL,
  `I_PRICE_ID` bigint(20) DEFAULT NULL,
  `S_PRODUCT_NAME` varchar(128) DEFAULT NULL,
  `I_PROFIT` double DEFAULT NULL,
  `I_PROVINCIAL_AGENT` double DEFAULT NULL,
  `I_REGIONAL_AGENT` double DEFAULT NULL,
  `I_REL_ID` bigint(20) DEFAULT NULL,
  `I_RETURN_NUM` int(11) DEFAULT NULL,
  `I_SALES_PRICE` double DEFAULT NULL,
  `S_SPEC_JSON` varchar(4000) DEFAULT NULL,
  `I_TOTAL_DISCOUNT_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_PAY_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_SALES_AMOUNT` double DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  `I_ACT_ID` bigint(20) DEFAULT NULL,
  `S_REBATE_JSON` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_log`
--

DROP TABLE IF EXISTS `t_cus_order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACT` int(11) DEFAULT NULL,
  `S_CONTENT` varchar(512) DEFAULT NULL,
  `I_OPERATOR_ID` bigint(20) DEFAULT NULL,
  `S_OPERATOR_NAME` varchar(32) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_logistics`
--

DROP TABLE IF EXISTS `t_cus_order_logistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_logistics` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ADDRESS` varchar(128) DEFAULT NULL,
  `S_CITY_ID` varchar(32) DEFAULT NULL,
  `S_CITY_NAME` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_LOGISTICS_CODE` varchar(128) DEFAULT NULL,
  `I_LOGISTICS_TYPE` int(11) DEFAULT NULL,
  `I_LUGGAGE` double DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `S_PROVINCE_ID` varchar(32) DEFAULT NULL,
  `S_PROVINCE_NAME` varchar(128) DEFAULT NULL,
  `S_RECIPIENTS` varchar(64) DEFAULT NULL,
  `S_REGION_ID` varchar(32) DEFAULT NULL,
  `S_REGION_NAME` varchar(128) DEFAULT NULL,
  `D_SEND_DATE` datetime DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `S_TEL` varchar(64) DEFAULT NULL,
  `I_TRANSPORT_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_pay`
--

DROP TABLE IF EXISTS `t_cus_order_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_pay` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CREDIT_MONEY` double DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `S_CUS_NAME` varchar(32) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `I_PAY_MONEY` double DEFAULT NULL,
  `I_PAY_TYPE` int(11) DEFAULT NULL,
  `I_RECHARGE_MONEY` double DEFAULT NULL,
  `S_TRADE_NO` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_return`
--

DROP TABLE IF EXISTS `t_cus_order_return`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_return` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_AUDIT_DESC` varchar(1024) DEFAULT NULL,
  `I_AUDIT_RESULT` int(11) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `S_CUS_NAME` varchar(32) DEFAULT NULL,
  `I_DEL_FLAG` int(11) DEFAULT NULL,
  `S_LOGISTICS_CODE` varchar(128) DEFAULT NULL,
  `I_LOGISTICS_TYPE` int(11) DEFAULT NULL,
  `S_ORDER_CODE` varchar(64) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `S_PIC` varchar(128) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `S_RETURN_CODE` varchar(64) DEFAULT NULL,
  `S_RETURN_DESC` varchar(1024) DEFAULT NULL,
  `S_RETURN_REASON` bigint(20) DEFAULT NULL,
  `I_RETURN_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_return_detail`
--

DROP TABLE IF EXISTS `t_cus_order_return_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_return_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BAR_CODE` varchar(128) DEFAULT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_CATE_NAME` varchar(128) DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `S_HEAD_PATH` varchar(512) DEFAULT NULL,
  `I_NUM` int(11) DEFAULT NULL,
  `I_ORDER_DETAIL_ID` bigint(20) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `I_PRICE` double DEFAULT NULL,
  `S_PRODUCT_NAME` varchar(128) DEFAULT NULL,
  `I_REL_ID` bigint(20) DEFAULT NULL,
  `I_RETURN_ID` bigint(20) DEFAULT NULL,
  `I_RETURN_TOTAL_AMOUNT` double DEFAULT NULL,
  `S_SPEC_JSON` varchar(4000) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_order_return_log`
--

DROP TABLE IF EXISTS `t_cus_order_return_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_order_return_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACT` int(11) DEFAULT NULL,
  `I_BILL` bigint(20) DEFAULT NULL,
  `S_CONTENT` varchar(512) DEFAULT NULL,
  `I_OPERATOR_ID` bigint(20) DEFAULT NULL,
  `S_OPERATOR_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_cus_shop`
--

DROP TABLE IF EXISTS `t_cus_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_cus_shop` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_AGENT_ID` bigint(20) DEFAULT NULL,
  `S_BACKGROUND_URL` varchar(256) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `D_EXPIRE_TIME` datetime DEFAULT NULL,
  `S_LOGO_PATH` varchar(256) DEFAULT NULL,
  `D_OPEN_TIME` datetime DEFAULT NULL,
  `I_ORDER_MONEY` double DEFAULT NULL,
  `I_ORDER_NUM` int(11) DEFAULT NULL,
  `S_SHOP_DESC` varchar(1024) DEFAULT NULL,
  `S_SHOP_NAME` varchar(128) DEFAULT NULL,
  `S_SHOP_URL` varchar(256) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_exception_info_cfg`
--

DROP TABLE IF EXISTS `t_exception_info_cfg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_exception_info_cfg` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATOR_ID` bigint(20) DEFAULT NULL,
  `S_ERR_CODE` varchar(128) DEFAULT NULL,
  `S_ERR_INFO` varchar(215) DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `I_ERR_LEVEL` int(11) DEFAULT NULL,
  `S_ERR_SOLVE_DESC` varchar(215) DEFAULT NULL,
  `I_IS_ENABLE_I18N` bit(1) DEFAULT NULL,
  `PARAMS` varbinary(255) DEFAULT NULL,
  `S_REMARK` varchar(215) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_express_log`
--

DROP TABLE IF EXISTS `t_express_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_express_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_EX_CODE` varchar(255) DEFAULT NULL,
  `I_EX_COM` int(11) DEFAULT NULL,
  `S_INFO` varchar(2048) DEFAULT NULL,
  `I_QUERY_STATE` int(11) DEFAULT NULL,
  `S_REMARK` varchar(255) DEFAULT NULL,
  `I_STATE` int(11) DEFAULT NULL,
  `I_IS_SYNC` int(11) NOT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_extract_order`
--

DROP TABLE IF EXISTS `t_extract_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_extract_order` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BANK_ACCOUNT` varchar(128) DEFAULT NULL,
  `S_BANK_CARD` varchar(128) DEFAULT NULL,
  `I_BANK_TYPE` int(11) DEFAULT NULL,
  `S_BRANCH` varchar(256) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_MONEY` float DEFAULT NULL,
  `S_ORDER_NO` varchar(50) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_extract_order_log`
--

DROP TABLE IF EXISTS `t_extract_order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_extract_order_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACT` int(11) DEFAULT NULL,
  `BANK_SEQ` varchar(128) DEFAULT NULL,
  `S_CONTENT` varchar(512) DEFAULT NULL,
  `I_OPERATOR_ID` bigint(20) DEFAULT NULL,
  `S_OPERATOR_NAME` varchar(32) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_REMIT_RESULT` int(11) DEFAULT NULL,
  `S_REMIT_FAILED_REASON` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_factory_agent`
--

DROP TABLE IF EXISTS `t_factory_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_factory_agent` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_AGENT_NAME` varchar(128) DEFAULT NULL,
  `S_APPID` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` datetime DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_LEVEL` int(11) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_factory_info`
--

DROP TABLE IF EXISTS `t_factory_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_factory_info` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_DEL_FLAG` int(11) DEFAULT NULL,
  `S_FACTORY_NAME` varchar(128) DEFAULT NULL,
  `S_PURCHASE_NOTES` varchar(255) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_department`
--

DROP TABLE IF EXISTS `t_hr_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_department` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_DEPT_CODE` varchar(200) DEFAULT NULL,
  `S_DUTYDESCRIPTION` varchar(1000) DEFAULT NULL,
  `S_DISP_NAME` varchar(200) DEFAULT NULL,
  `I_DEL_FLAG` bit(1) NOT NULL,
  `I_DEPT_LEVEL` int(11) DEFAULT NULL,
  `S_DEPT_NAME` varchar(200) NOT NULL,
  `S_PATH_ID` varchar(255) NOT NULL,
  `S_REMARK` varchar(200) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_SHORT_NAME` varchar(200) DEFAULT NULL,
  `I_DEPT_TYPE` int(11) DEFAULT NULL,
  `I_DOMAIN_ID` bigint(20) NOT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  UNIQUE KEY `UK_h69n8xi1i0ji053lq3ondfns8` (`S_DEPT_CODE`) USING BTREE,
  KEY `FKou0k7cja8be9w15gnv0db90cl` (`I_DOMAIN_ID`) USING BTREE,
  KEY `FK5kojc77mjgw1ds6xykws7ruxo` (`I_PARENT_ID`) USING BTREE,
  CONSTRAINT `FK5kojc77mjgw1ds6xykws7ruxo` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `FKou0k7cja8be9w15gnv0db90cl` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_department_ibfk_1` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `t_hr_department_ibfk_2` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_department_ibfk_3` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `t_hr_department_ibfk_4` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_domain`
--

DROP TABLE IF EXISTS `t_hr_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_domain` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_APP_ID` bigint(20) DEFAULT NULL,
  `S_DOMAIN_CODE` varchar(200) DEFAULT NULL,
  `S_DESCRIPTION` varchar(1000) DEFAULT NULL,
  `I_IS_DEL` bit(1) DEFAULT NULL,
  `S_DOMAIN_NAME` varchar(200) NOT NULL,
  `S_PATH_ID` varchar(255) NOT NULL,
  `S_RAMARK` varchar(200) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `I_DOMAIN_TYPE` int(11) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FKhav3xtnnsng5qq2otcvkic2wr` (`I_PARENT_ID`) USING BTREE,
  CONSTRAINT `FKhav3xtnnsng5qq2otcvkic2wr` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_domain_ibfk_1` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_domain_ibfk_2` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_domain` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_module`
--

DROP TABLE IF EXISTS `t_hr_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_module` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_APP_ID` bigint(20) DEFAULT NULL,
  `S_DESCRIPTION` varchar(1000) DEFAULT NULL,
  `S_MODULE_NAME` varchar(200) NOT NULL,
  `S_PATH_ID` varchar(255) NOT NULL,
  `S_REMARK` varchar(1000) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FK18gikau3ra2nhbjbaj11tx9gt` (`I_PARENT_ID`) USING BTREE,
  CONSTRAINT `FK18gikau3ra2nhbjbaj11tx9gt` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_module` (`I_ID`),
  CONSTRAINT `t_hr_module_ibfk_1` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_module` (`I_ID`),
  CONSTRAINT `t_hr_module_ibfk_2` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_module` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_right`
--

DROP TABLE IF EXISTS `t_hr_right`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_right` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_APP_ID` bigint(20) DEFAULT NULL,
  `S_ICON` varchar(200) DEFAULT NULL,
  `I_IS_BLANK_TARGET` bit(1) NOT NULL,
  `I_IS_ENABLED` bit(1) NOT NULL,
  `S_RIGHT_NAME` varchar(200) NOT NULL,
  `S_PATH_ID` varchar(255) NOT NULL,
  `S_PERMISSION` varchar(200) DEFAULT NULL,
  `S_REMARK` varchar(200) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `I_TYPE` int(11) NOT NULL,
  `S_URL` varchar(200) DEFAULT NULL,
  `I_MODULE_ID` bigint(20) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FK4o5rqxuwla80ojy35o2a6kfu7` (`I_MODULE_ID`) USING BTREE,
  KEY `FK7hrkhlmnpr5aifmi5o98atkf0` (`I_PARENT_ID`) USING BTREE,
  CONSTRAINT `FK4o5rqxuwla80ojy35o2a6kfu7` FOREIGN KEY (`I_MODULE_ID`) REFERENCES `t_hr_module` (`I_ID`),
  CONSTRAINT `FK7hrkhlmnpr5aifmi5o98atkf0` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_right_ibfk_1` FOREIGN KEY (`I_MODULE_ID`) REFERENCES `t_hr_module` (`I_ID`),
  CONSTRAINT `t_hr_right_ibfk_2` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_right_ibfk_3` FOREIGN KEY (`I_MODULE_ID`) REFERENCES `t_hr_module` (`I_ID`),
  CONSTRAINT `t_hr_right_ibfk_4` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_right` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_role`
--

DROP TABLE IF EXISTS `t_hr_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_role` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_APP_ID` bigint(20) DEFAULT NULL,
  `S_ROLE_NAME` varchar(200) NOT NULL,
  `S_PATH_ID` varchar(255) NOT NULL,
  `S_REMARK` varchar(200) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  `S_CODE` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FK1dkshaegfvknhehitufrl9aki` (`I_PARENT_ID`) USING BTREE,
  CONSTRAINT `FK1dkshaegfvknhehitufrl9aki` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_role_ibfk_1` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_role_ibfk_2` FOREIGN KEY (`I_PARENT_ID`) REFERENCES `t_hr_role` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_role_rel_right`
--

DROP TABLE IF EXISTS `t_hr_role_rel_right`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_role_rel_right` (
  `I_ROLE_ID` bigint(20) NOT NULL,
  `I_RIGHT_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_ROLE_ID`,`I_RIGHT_ID`),
  KEY `FK73x87d7so26c4bcia0y7s3tvc` (`I_RIGHT_ID`) USING BTREE,
  CONSTRAINT `FK73x87d7so26c4bcia0y7s3tvc` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `FK85dw5vqukss6qafigcf8i9d3v` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_role_rel_right_ibfk_1` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_role_rel_right_ibfk_2` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_role_rel_right_ibfk_3` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_role_rel_right_ibfk_4` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_staff`
--

DROP TABLE IF EXISTS `t_hr_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_staff` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ACCOUNT` varchar(255) NOT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `ATTRIBUTE_VALUE0` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE1` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE2` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE3` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE4` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE5` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE6` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE7` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE8` varchar(255) DEFAULT NULL,
  `ATTRIBUTE_VALUE9` varchar(255) DEFAULT NULL,
  `D_AVAIL_BEGIN_DATE` datetime NOT NULL,
  `D_AVAIL_END_DATE` datetime NOT NULL,
  `D_BIRTHDAY` datetime DEFAULT NULL,
  `S_FAXCODE` varchar(200) DEFAULT NULL,
  `I_SEX` int(11) DEFAULT NULL,
  `S_IMAGE_PATH` varchar(255) DEFAULT NULL,
  `S_IN_EMAIL` varchar(200) DEFAULT NULL,
  `I_DEL_FLAG` bit(1) NOT NULL,
  `I_IS_ENABLED` bit(1) NOT NULL,
  `I_IS_LOCKED` bit(1) NOT NULL,
  `I_IS_SYNCH` bit(1) DEFAULT NULL,
  `I_IS_SYSTEM` bit(1) NOT NULL,
  `I_KNOWLEDGE` int(11) DEFAULT NULL,
  `D_LOCK_DATE` datetime DEFAULT NULL,
  `D_LOGIN_DATE` datetime DEFAULT NULL,
  `I_LOGIN_FAILURE_COUNT` int(11) NOT NULL,
  `S_LOGIN_IP` varchar(200) DEFAULT NULL,
  `S_MOBILE` varchar(200) DEFAULT NULL,
  `S_OUT_EMAIL` varchar(200) DEFAULT NULL,
  `S_PASSWORD` varchar(255) NOT NULL,
  `S_TELPHONE` varchar(200) DEFAULT NULL,
  `S_REGISTER_IP` varchar(200) NOT NULL,
  `S_REMARK` varchar(200) DEFAULT NULL,
  `D_UPDATE_PASS_TIME` datetime DEFAULT NULL,
  `S_WORK_ADDRESS` varchar(200) DEFAULT NULL,
  `I_DEPT_ID` bigint(20) DEFAULT NULL,
  `I_DOMAIN_ID` bigint(20) DEFAULT NULL,
  `I_IS_VERIFICATION` int(2) DEFAULT NULL,
  `I_IS_BINDCARD` int(2) DEFAULT NULL,
  `I_IS_SET_SINA_PASSWORD` int(2) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FKd2gqfj3j57i8xye47f30nibga` (`I_DEPT_ID`) USING BTREE,
  KEY `FKo5hh8al52uvr82f7awuun95u8` (`I_DOMAIN_ID`) USING BTREE,
  CONSTRAINT `FKd2gqfj3j57i8xye47f30nibga` FOREIGN KEY (`I_DEPT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `FKo5hh8al52uvr82f7awuun95u8` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_staff_ibfk_1` FOREIGN KEY (`I_DEPT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `t_hr_staff_ibfk_2` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`),
  CONSTRAINT `t_hr_staff_ibfk_3` FOREIGN KEY (`I_DEPT_ID`) REFERENCES `t_hr_department` (`I_ID`),
  CONSTRAINT `t_hr_staff_ibfk_4` FOREIGN KEY (`I_DOMAIN_ID`) REFERENCES `t_hr_domain` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_staff_rel_right`
--

DROP TABLE IF EXISTS `t_hr_staff_rel_right`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_staff_rel_right` (
  `I_STAFF_ID` bigint(20) NOT NULL,
  `I_RIGHT_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_STAFF_ID`,`I_RIGHT_ID`),
  KEY `FKp9cl8phba9m8yu4iup806isv2` (`I_RIGHT_ID`) USING BTREE,
  CONSTRAINT `FK4cp4sqncr5ik049q9cn8t5qpd` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`),
  CONSTRAINT `FKp9cl8phba9m8yu4iup806isv2` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_right_ibfk_1` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_right_ibfk_2` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_right_ibfk_3` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_right_ibfk_4` FOREIGN KEY (`I_RIGHT_ID`) REFERENCES `t_hr_right` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hr_staff_rel_role`
--

DROP TABLE IF EXISTS `t_hr_staff_rel_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_hr_staff_rel_role` (
  `I_STAFF_ID` bigint(20) NOT NULL,
  `I_ROLE_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_STAFF_ID`,`I_ROLE_ID`),
  KEY `FKm27mi0mvi885eh021fbps59ae` (`I_ROLE_ID`) USING BTREE,
  CONSTRAINT `FKm27mi0mvi885eh021fbps59ae` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `FKrc4610wcf3i1u8csjk6vedelc` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_role_ibfk_1` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_role_ibfk_2` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_role_ibfk_3` FOREIGN KEY (`I_ROLE_ID`) REFERENCES `t_hr_role` (`I_ID`),
  CONSTRAINT `t_hr_staff_rel_role_ibfk_4` FOREIGN KEY (`I_STAFF_ID`) REFERENCES `t_hr_staff` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_log_login`
--

DROP TABLE IF EXISTS `t_log_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_log_login` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_ACCOUNT` varchar(64) DEFAULT NULL,
  `S_BROWSER_TYPE` varchar(512) DEFAULT NULL,
  `I_KIND` int(11) DEFAULT NULL,
  `S_LOGIN_IP` varchar(64) DEFAULT NULL,
  `I_LOGIN_LENGTH` bigint(20) DEFAULT NULL,
  `D_LOGIN_TIME` datetime DEFAULT NULL,
  `D_OUT_TIME` datetime DEFAULT NULL,
  `S_SESSION_ID` varchar(64) DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `I_SYS_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_ali_trade`
--

DROP TABLE IF EXISTS `t_pay_ali_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_ali_trade` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APP_ID` varchar(32) DEFAULT NULL,
  `S_BODY` varchar(400) DEFAULT NULL,
  `S_BUSINESS_SCENE` varchar(64) DEFAULT NULL,
  `S_BUYER_EMAIL` varchar(128) DEFAULT NULL,
  `S_BUYER_ID` varchar(64) DEFAULT NULL,
  `S_BUYER_LOGON_ID` varchar(100) DEFAULT NULL,
  `I_BUYER_PAY_AMOUNT` double DEFAULT NULL,
  `I_DISCOUNT` double DEFAULT NULL,
  `S_EXTRA_COMMON_PARAM` varchar(100) DEFAULT NULL,
  `S_FUND_BILL_LIST` varchar(512) DEFAULT NULL,
  `D_GMT_CLOSE` datetime DEFAULT NULL,
  `D_GMT_CREATE` datetime DEFAULT NULL,
  `D_GMT_PAYMENT` datetime DEFAULT NULL,
  `D_GMT_REFUND` datetime DEFAULT NULL,
  `I_INVOICE_AMOUNT` double DEFAULT NULL,
  `S_IS_TOTAL_FEE_ADJUST` varchar(1) DEFAULT NULL,
  `S_OUT_BIZ_NO` varchar(64) DEFAULT NULL,
  `S_OUT_CHANNEL_AMOUNT` varchar(128) DEFAULT NULL,
  `S_OUT_CHANNEL_INST` varchar(128) DEFAULT NULL,
  `S_OUT_CHANNEL_TYPE` varchar(128) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_PAYMENT_TYPE` varchar(4) DEFAULT NULL,
  `I_POINT_AMOUNT` double DEFAULT NULL,
  `I_PRICE` double DEFAULT NULL,
  `I_QUANTITY` bigint(20) DEFAULT NULL,
  `I_RECEIPT_AMOUNT` double DEFAULT NULL,
  `I_REFUND_FEE` double DEFAULT NULL,
  `S_REFUND_STATUS` varchar(64) DEFAULT NULL,
  `S_SELLER_EMAIL` varchar(128) DEFAULT NULL,
  `S_SELLER_ID` varchar(64) DEFAULT NULL,
  `I_SEND_BACK_FEE` double DEFAULT NULL,
  `S_SUBJECT` varchar(256) DEFAULT NULL,
  `I_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_FEE` double DEFAULT NULL,
  `S_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_TRADE_STATUS` varchar(64) DEFAULT NULL,
  `S_USE_COUPON` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_ali_trade_async_notify_log`
--

DROP TABLE IF EXISTS `t_pay_ali_trade_async_notify_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_ali_trade_async_notify_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APP_ID` varchar(32) DEFAULT NULL,
  `S_BODY` varchar(400) DEFAULT NULL,
  `S_BUSINESS_SCENE` varchar(64) DEFAULT NULL,
  `S_BUYER_EMAIL` varchar(128) DEFAULT NULL,
  `S_BUYER_ID` varchar(64) DEFAULT NULL,
  `S_BUYER_LOGON_ID` varchar(100) DEFAULT NULL,
  `I_BUYER_PAY_AMOUNT` double DEFAULT NULL,
  `I_DISCOUNT` double DEFAULT NULL,
  `S_EXTRA_COMMON_PARAM` varchar(100) DEFAULT NULL,
  `S_FUND_BILL_LIST` varchar(512) DEFAULT NULL,
  `D_GMT_CLOSE` datetime DEFAULT NULL,
  `D_GMT_CREATE` datetime DEFAULT NULL,
  `D_GMT_PAYMENT` datetime DEFAULT NULL,
  `D_GMT_REFUND` datetime DEFAULT NULL,
  `I_INVOICE_AMOUNT` double DEFAULT NULL,
  `S_IS_TOTAL_FEE_ADJUST` varchar(1) DEFAULT NULL,
  `S_NOTIFY_ID` varchar(128) DEFAULT NULL,
  `D_NOTIFY_TIME` datetime DEFAULT NULL,
  `S_NOTIFY_TYPE` varchar(64) DEFAULT NULL,
  `S_OUT_BIZ_NO` varchar(64) DEFAULT NULL,
  `S_OUT_CHANNEL_AMOUNT` varchar(128) DEFAULT NULL,
  `S_OUT_CHANNEL_INST` varchar(128) DEFAULT NULL,
  `S_OUT_CHANNEL_TYPE` varchar(128) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_PAYMENT_TYPE` varchar(4) DEFAULT NULL,
  `I_POINT_AMOUNT` double DEFAULT NULL,
  `I_PRICE` double DEFAULT NULL,
  `I_QUANTITY` bigint(20) DEFAULT NULL,
  `I_RECEIPT_AMOUNT` double DEFAULT NULL,
  `I_REFUND_FEE` double DEFAULT NULL,
  `S_REFUND_STATUS` varchar(64) DEFAULT NULL,
  `S_SELLER_EMAIL` varchar(128) DEFAULT NULL,
  `S_SELLER_ID` varchar(64) DEFAULT NULL,
  `I_SEND_BACK_FEE` double DEFAULT NULL,
  `S_SIGN` varchar(256) DEFAULT NULL,
  `S_SIGN_TYPE` varchar(32) DEFAULT NULL,
  `S_SUBJECT` varchar(256) DEFAULT NULL,
  `I_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_FEE` double DEFAULT NULL,
  `S_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_TRADE_STATUS` varchar(64) DEFAULT NULL,
  `S_USE_COUPON` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_ali_trade_error_notify_log`
--

DROP TABLE IF EXISTS `t_pay_ali_trade_error_notify_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_ali_trade_error_notify_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BUYER_EMAIL` varchar(128) DEFAULT NULL,
  `S_BUYER_ID` varchar(64) DEFAULT NULL,
  `S_ERROR_CODE` varchar(1024) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_PARTNER` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_RETURN_URL` varchar(200) DEFAULT NULL,
  `S_SELLER_EMAIL` varchar(128) DEFAULT NULL,
  `S_SELLER_ID` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_ali_trade_req_log`
--

DROP TABLE IF EXISTS `t_pay_ali_trade_req_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_ali_trade_req_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ANTI_PHISHING_KEY` varchar(128) DEFAULT NULL,
  `S_APP_ID` varchar(64) DEFAULT NULL,
  `S_APPENV` varchar(128) DEFAULT NULL,
  `S_BODY` varchar(1000) DEFAULT NULL,
  `S_BUYER_ACCOUNT_NAME` varchar(128) DEFAULT NULL,
  `S_BUYER_EMAIL` varchar(128) DEFAULT NULL,
  `S_BUYER_ID` varchar(64) DEFAULT NULL,
  `S_CHARSET` varchar(10) DEFAULT NULL,
  `S_DEFAULT_LOGIN` varchar(1) DEFAULT NULL,
  `I_DISCOUNTABLE_AMOUNT` double DEFAULT NULL,
  `S_ENABLE_PAYMETHOD` varchar(128) DEFAULT NULL,
  `S_ERROR_NOTIFY_URL` varchar(200) DEFAULT NULL,
  `S_EXTEND_PARAM` varchar(1000) DEFAULT NULL,
  `S_EXTEND_PARAMS` varchar(512) DEFAULT NULL,
  `S_EXTER_INVOKE_IP` varchar(15) DEFAULT NULL,
  `S_EXTERN_TOKEN` varchar(32) DEFAULT NULL,
  `S_EXTRA_COMMON_PARAM` varchar(100) DEFAULT NULL,
  `S_GOODS_DETAIL` varchar(1000) DEFAULT NULL,
  `S_INPUT_CHARSET` varchar(32) DEFAULT NULL,
  `S_IT_B_PAY` varchar(64) DEFAULT NULL,
  `S_ITEM_ORDERS_INFO` longtext,
  `S_METHOD` varchar(128) DEFAULT NULL,
  `S_NEED_CTU_CHECK` varchar(1) DEFAULT NULL,
  `S_NOTIFY_URL` varchar(200) DEFAULT NULL,
  `S_OPERATOR_ID` varchar(28) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_PARTNER` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_PAYMENT_TYPE` varchar(4) DEFAULT NULL,
  `S_PAYMETHOD` varchar(32) DEFAULT NULL,
  `I_PRICE` double DEFAULT NULL,
  `S_PRODUCT_TYPE` varchar(50) DEFAULT NULL,
  `S_QR_PAY_MODE` varchar(1) DEFAULT NULL,
  `I_QUANTITY` bigint(20) DEFAULT NULL,
  `S_RETURN_URL` varchar(200) DEFAULT NULL,
  `S_ROYALTY_INFO` varchar(2000) DEFAULT NULL,
  `S_ROYALTY_PARAMETERS` varchar(1000) DEFAULT NULL,
  `S_ROYALTY_TYPE` varchar(2) DEFAULT NULL,
  `S_SELLER_ACCOUNT_NAME` varchar(128) DEFAULT NULL,
  `S_SELLER_EMAIL` varchar(128) DEFAULT NULL,
  `S_SELLER_ID` varchar(128) DEFAULT NULL,
  `S_SERVICE` varchar(64) DEFAULT NULL,
  `S_SHOW_URL` varchar(400) DEFAULT NULL,
  `S_SIGN` varchar(256) DEFAULT NULL,
  `S_SIGN_ID_EXT` varchar(50) DEFAULT NULL,
  `S_SIGN_NAME_EXT` varchar(128) DEFAULT NULL,
  `S_SIGN_TYPE` varchar(32) DEFAULT NULL,
  `S_STORE_ID` varchar(32) DEFAULT NULL,
  `S_SUBJECT` varchar(128) DEFAULT NULL,
  `S_TERMINAL_ID` varchar(32) DEFAULT NULL,
  `S_TIMEOUT_EXPRESS` varchar(16) DEFAULT NULL,
  `D_TIMESTAMP` datetime DEFAULT NULL,
  `S_TOKEN` varchar(40) DEFAULT NULL,
  `I_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_FEE` double DEFAULT NULL,
  `I_UNDISCOUNTABLE_AMOUNT` double DEFAULT NULL,
  `S_VERSION` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_ali_trade_sync_notify_log`
--

DROP TABLE IF EXISTS `t_pay_ali_trade_sync_notify_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_ali_trade_sync_notify_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_AGENT_USER_ID` varchar(64) DEFAULT NULL,
  `S_BODY` varchar(400) DEFAULT NULL,
  `S_BUYER_EMAIL` varchar(128) DEFAULT NULL,
  `S_BUYER_ID` varchar(64) DEFAULT NULL,
  `S_EXTERFACE` varchar(32) DEFAULT NULL,
  `S_EXTRA_COMMON_PARAM` varchar(100) DEFAULT NULL,
  `S_IS_SUCCESS` varchar(1) DEFAULT NULL,
  `S_MEMO` varchar(128) DEFAULT NULL,
  `S_NOTIFY_ID` varchar(128) DEFAULT NULL,
  `D_NOTIFY_TIME` datetime DEFAULT NULL,
  `S_NOTIFY_TYPE` varchar(64) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_PAYMENT_TYPE` varchar(4) DEFAULT NULL,
  `S_RESULT` longtext,
  `S_RESULT_STATUS` varchar(8) DEFAULT NULL,
  `S_SELLER_EMAIL` varchar(128) DEFAULT NULL,
  `S_SELLER_ID` varchar(64) DEFAULT NULL,
  `S_SIGN` varchar(256) DEFAULT NULL,
  `S_SIGN_TYPE` varchar(32) DEFAULT NULL,
  `S_SUBJECT` varchar(128) DEFAULT NULL,
  `I_TOTAL_FEE` double DEFAULT NULL,
  `S_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_TRADE_STATUS` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_jd_trade_async_notify_log`
--

DROP TABLE IF EXISTS `t_pay_jd_trade_async_notify_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_jd_trade_async_notify_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_REMARK1` varchar(150) DEFAULT NULL,
  `S_REMARK2` varchar(150) DEFAULT NULL,
  `S_V_AMOUNT` varchar(10) DEFAULT NULL,
  `S_V_MD5STR` varchar(64) DEFAULT NULL,
  `S_V_MONEYTYPE` varchar(10) DEFAULT NULL,
  `S_V_OID` varchar(64) DEFAULT NULL,
  `S_V_PMODE` varchar(64) DEFAULT NULL,
  `S_V_PSTATUS` varchar(10) DEFAULT NULL,
  `S_V_PSTRING` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_jd_trade_req_log`
--

DROP TABLE IF EXISTS `t_pay_jd_trade_req_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_jd_trade_req_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BIZ_RETURN_URL` varchar(200) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_PMODE_ID` varchar(32) DEFAULT NULL,
  `S_REMARK1` varchar(150) DEFAULT NULL,
  `S_REMARK2` varchar(150) DEFAULT NULL,
  `S_SUBJECT` varchar(128) DEFAULT NULL,
  `S_V_AMOUNT` varchar(10) DEFAULT NULL,
  `S_V_MD5INFO` varchar(32) DEFAULT NULL,
  `S_V_MID` varchar(64) DEFAULT NULL,
  `S_V_MONEYTYPE` varchar(10) DEFAULT NULL,
  `S_V_OID` varchar(64) DEFAULT NULL,
  `S_V_ORDERADDR` varchar(200) DEFAULT NULL,
  `S_V_ORDEREMAIL` varchar(100) DEFAULT NULL,
  `S_V_ORDERMOBILE` varchar(13) DEFAULT NULL,
  `S_V_ORDERNAME` varchar(80) DEFAULT NULL,
  `S_V_ORDERPOST` varchar(10) DEFAULT NULL,
  `S_V_ORDERTEL` varchar(50) DEFAULT NULL,
  `S_V_RCVADDR` varchar(200) DEFAULT NULL,
  `S_V_RCVEMAIL` varchar(100) DEFAULT NULL,
  `S_V_RCVMOBILE` varchar(13) DEFAULT NULL,
  `S_V_RCVNAME` varchar(80) DEFAULT NULL,
  `S_V_RCVPOST` varchar(10) DEFAULT NULL,
  `S_V_RCVTEL` varchar(50) DEFAULT NULL,
  `S_V_URL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_jd_trade_sync_notify_log`
--

DROP TABLE IF EXISTS `t_pay_jd_trade_sync_notify_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_jd_trade_sync_notify_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `S_REMARK1` varchar(150) DEFAULT NULL,
  `S_REMARK2` varchar(150) DEFAULT NULL,
  `S_V_AMOUNT` varchar(10) DEFAULT NULL,
  `S_V_MD5STR` varchar(64) DEFAULT NULL,
  `S_V_MONEYTYPE` varchar(10) DEFAULT NULL,
  `S_V_OID` varchar(64) DEFAULT NULL,
  `S_V_PMODE` varchar(64) DEFAULT NULL,
  `S_V_PSTATUS` varchar(10) DEFAULT NULL,
  `S_V_PSTRING` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_order`
--

DROP TABLE IF EXISTS `t_pay_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_order` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BUSINESS_PARAM` varchar(512) DEFAULT NULL,
  `S_BUSINESS_REL` varchar(64) DEFAULT NULL,
  `S_BUSINESS_TYPE` varchar(128) DEFAULT NULL,
  `D_CLOSE_TIME` datetime DEFAULT NULL,
  `I_CLOSE_TYPE` int(11) DEFAULT NULL,
  `S_DETAIL` varchar(512) DEFAULT NULL,
  `S_ORDER_NO` varchar(64) DEFAULT NULL,
  `I_PAY_MODE` int(11) DEFAULT NULL,
  `D_PAY_TIME` datetime DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `I_TIMEOUT` int(11) DEFAULT NULL,
  `S_TITLE` varchar(128) DEFAULT NULL,
  `I_TOTAL_AMOUNT` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_close_order_log`
--

DROP TABLE IF EXISTS `t_pay_wechat_close_order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_close_order_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_micropay_resp_log`
--

DROP TABLE IF EXISTS `t_pay_wechat_micropay_resp_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_micropay_resp_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_ATTACH` varchar(128) DEFAULT NULL,
  `S_BANK_TYPE` varchar(16) DEFAULT NULL,
  `I_CASH_FEE` int(11) DEFAULT NULL,
  `S_CASH_FEE_TYPE` varchar(16) DEFAULT NULL,
  `I_COUPON_FEE` int(11) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_ERR_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE_DES` varchar(128) DEFAULT NULL,
  `S_FEE_TYPE` varchar(16) DEFAULT NULL,
  `S_IS_SUBSCRIBE` varchar(1) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_OPENID` varchar(128) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_RESULT_CODE` varchar(16) DEFAULT NULL,
  `S_RETURN_CODE` varchar(16) DEFAULT NULL,
  `S_RETURN_MSG` varchar(128) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_TIME_END` varchar(14) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRADE_TYPE` varchar(16) DEFAULT NULL,
  `S_TRANSACTION_ID` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_order_log`
--

DROP TABLE IF EXISTS `t_pay_wechat_order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_order_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APP_ID` varchar(32) DEFAULT NULL,
  `S_ATTACH` varchar(127) DEFAULT NULL,
  `S_BODY` varchar(128) DEFAULT NULL,
  `S_DETAIL` varchar(8192) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_FEE_TYPE` varchar(16) DEFAULT NULL,
  `S_GOODS_TAG` varchar(32) DEFAULT NULL,
  `S_LIMIT_PAY` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_NOTIFY_URL` varchar(256) DEFAULT NULL,
  `S_OPEN_ID` varchar(128) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_PRODUCT_ID` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_SPBILL_CREATE_IP` varchar(16) DEFAULT NULL,
  `S_TIME_EXPIRE` varchar(14) DEFAULT NULL,
  `S_TIME_START` varchar(14) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRADE_TYPE` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_pay`
--

DROP TABLE IF EXISTS `t_pay_wechat_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_pay` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APP_ID` varchar(32) DEFAULT NULL,
  `S_NONCESTR` varchar(32) DEFAULT NULL,
  `S_PARTNERID` varchar(32) DEFAULT NULL,
  `S_PACKAGE` varchar(128) DEFAULT NULL,
  `S_PREPAYID` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_TIMESTAMP` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_pay_result_notify`
--

DROP TABLE IF EXISTS `t_pay_wechat_pay_result_notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_pay_result_notify` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_ATTACH` varchar(128) DEFAULT NULL,
  `S_BANK_TYPE` varchar(16) DEFAULT NULL,
  `S_CASH_FEE` int(11) DEFAULT NULL,
  `S_CASH_FEE_TYPE` varchar(16) DEFAULT NULL,
  `I_COUPON_COUNT` int(11) DEFAULT NULL,
  `S_COUPON_FEE` int(11) DEFAULT NULL,
  `I_COUPON_FEE_$N` int(11) DEFAULT NULL,
  `S_COUPON_ID_$N` varchar(20) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_ERR_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE_DES` varchar(128) DEFAULT NULL,
  `S_FEE_TYPE` varchar(8) DEFAULT NULL,
  `S_IS_SUBSCRIBE` varchar(1) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_OPENID` varchar(128) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_RESULT_CODE` varchar(32) DEFAULT NULL,
  `S_RETURN_CODE` varchar(16) DEFAULT NULL,
  `S_RETURN_MSG` varchar(128) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_TIME_END` varchar(14) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRADE_TYPE` varchar(16) DEFAULT NULL,
  `I_TRANSACTION_ID` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_refund_log`
--

DROP TABLE IF EXISTS `t_pay_wechat_refund_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_refund_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_OP_USER_ID` varchar(32) DEFAULT NULL,
  `S_OUT_REFUND_NO` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_REFUND_FEE_TYPE` varchar(8) DEFAULT NULL,
  `I_REFUND_NO` int(11) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRANSACTION_ID` varchar(28) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pay_wechat_trade`
--

DROP TABLE IF EXISTS `t_pay_wechat_trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pay_wechat_trade` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(64) DEFAULT NULL,
  `S_PAYMENTTYPE` varchar(64) DEFAULT NULL,
  `S_TIME_END` varchar(14) DEFAULT NULL,
  `S_TITLE` varchar(128) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRADESTATUS` varchar(64) DEFAULT NULL,
  `S_TRANSACTION_ID` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_plat_income_set`
--

DROP TABLE IF EXISTS `t_plat_income_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_plat_income_set` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `i_type` int(2) DEFAULT NULL,
  `i_order_num` int(11) DEFAULT NULL,
  `i_order_money` double DEFAULT NULL,
  `i_created_id` bigint(20) DEFAULT NULL,
  `s_created_name` varchar(64) DEFAULT NULL,
  `d_created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_plugin_config`
--

DROP TABLE IF EXISTS `t_plugin_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_plugin_config` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `IS_ENABLED` bit(1) NOT NULL,
  `PLUGIN_ID` varchar(100) NOT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_plugin_config_attribute`
--

DROP TABLE IF EXISTS `t_plugin_config_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_plugin_config_attribute` (
  `PLUGIN_CONFIG` bigint(20) NOT NULL,
  `ATTRIBUTES` varchar(255) DEFAULT NULL,
  `NAME` varchar(100) NOT NULL,
  PRIMARY KEY (`PLUGIN_CONFIG`,`NAME`),
  CONSTRAINT `FKmyhm417dwg1va63tludq9tju` FOREIGN KEY (`PLUGIN_CONFIG`) REFERENCES `t_plugin_config` (`I_ID`),
  CONSTRAINT `t_plugin_config_attribute_ibfk_1` FOREIGN KEY (`PLUGIN_CONFIG`) REFERENCES `t_plugin_config` (`I_ID`),
  CONSTRAINT `t_plugin_config_attribute_ibfk_2` FOREIGN KEY (`PLUGIN_CONFIG`) REFERENCES `t_plugin_config` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_attr`
--

DROP TABLE IF EXISTS `t_product_attr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_attr` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `S_ATTR_JSON` varchar(4000) DEFAULT NULL,
  `S_SPEC_JSON` varchar(4000) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_cate`
--

DROP TABLE IF EXISTS `t_product_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_cate` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_NAME` varchar(128) DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `I_LEVEL` tinyint(4) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  `S_PATH` varchar(512) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `I_DEL_FLAG` tinyint(4) NOT NULL DEFAULT '0',
  `S_PIC_PATH` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_cate_attr_define`
--

DROP TABLE IF EXISTS `t_product_cate_attr_define`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_cate_attr_define` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_SPEC_JSON` varchar(4000) DEFAULT NULL,
  `S_ATTR_DEFINE_JSON` varchar(4000) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_document`
--

DROP TABLE IF EXISTS `t_product_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_document` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `S_DOC_CODE` varchar(64) DEFAULT NULL,
  `I_STATUS` tinyint(4) DEFAULT NULL,
  `S_DESC` varchar(1024) DEFAULT NULL,
  `S_PATH` varchar(128) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_TYPE` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_document_log`
--

DROP TABLE IF EXISTS `t_product_document_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_document_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_BILL` bigint(20) DEFAULT NULL,
  `S_ACT` varchar(128) DEFAULT NULL,
  `S_CONTENT` varchar(512) DEFAULT NULL,
  `I_OPERATOR_ID` bigint(20) DEFAULT NULL,
  `S_OPERATOR_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_info`
--

DROP TABLE IF EXISTS `t_product_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_info` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_ZH_NAME` varchar(128) DEFAULT NULL,
  `S_EN_NAME` varchar(128) DEFAULT NULL,
  `I_TYPE` tinyint(4) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `S_BRAND_NAME` varchar(128) DEFAULT NULL,
  `I_STATUS` tinyint(4) DEFAULT NULL,
  `S_CODE` varchar(128) DEFAULT NULL,
  `S_BAR_CODE` varchar(128) DEFAULT NULL,
  `I_CATE_ID` bigint(20) DEFAULT NULL,
  `S_CATE_NAME` varchar(128) DEFAULT NULL,
  `S_INTRODUCE` varchar(2048) DEFAULT NULL,
  `I_UNIT` tinyint(4) DEFAULT NULL,
  `S_HEAD_PATH` varchar(512) DEFAULT NULL,
  `S_PIC_PATH` varchar(512) DEFAULT NULL,
  `I_SHOP_SALES` int(11) DEFAULT NULL,
  `I_DEL_FLAG` tinyint(4) NOT NULL DEFAULT '2',
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `D_SHELVE_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_package`
--

DROP TABLE IF EXISTS `t_product_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_package` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `I_PACKAGE_PROID` bigint(20) DEFAULT NULL,
  `I_PRICE_ID` bigint(20) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_price`
--

DROP TABLE IF EXISTS `t_product_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_price` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `S_SPEC_JSON` varchar(4000) DEFAULT NULL,
  `I_SALES_PRICE` double DEFAULT NULL,
  `I_COST_PRICE` double DEFAULT NULL,
  `I_PROFIT` double DEFAULT NULL,
  `I_STOCK_NUM` int(11) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_SALE_NUM` int(11) DEFAULT NULL,
  `I_CITY_AGENT` double DEFAULT NULL,
  `I_GENERAL_AGENT` double DEFAULT NULL,
  `I_PROVINCIAL_AGENT` double DEFAULT NULL,
  `I_REGIONAL_AGENT` double DEFAULT NULL,
  `I_REBATE_FIVE` double DEFAULT NULL,
  `I_REBATE_FOUR` double DEFAULT NULL,
  `I_REBATE_ONE` double DEFAULT NULL,
  `I_REBATE_THREE` double DEFAULT NULL,
  `I_REBATE_TWO` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_product_shop`
--

DROP TABLE IF EXISTS `t_product_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_product_shop` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `I_SHOP_ID` bigint(20) NOT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_PRODUCT_ID` bigint(20) DEFAULT NULL,
  `I_STATUS` tinyint(4) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_area`
--

DROP TABLE IF EXISTS `t_pub_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_area` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `I_COUNTRY_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FK8v9h4apbnw8n8vknh473akfjs` (`I_COUNTRY_ID`) USING BTREE,
  CONSTRAINT `FK8v9h4apbnw8n8vknh473akfjs` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_area_ibfk_1` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_attachment`
--

DROP TABLE IF EXISTS `t_pub_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_attachment` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CONVERT_STATE` int(11) DEFAULT NULL,
  `S_FILENAME` varchar(128) DEFAULT NULL,
  `S_MDE_FIELD` varchar(64) DEFAULT NULL,
  `S_MDE_TABLE` varchar(64) DEFAULT NULL,
  `S_PATH` varchar(512) DEFAULT NULL,
  `S_PDF_PATH` varchar(512) DEFAULT NULL,
  `I_REL_ID` bigint(20) DEFAULT NULL,
  `I_SIZE` bigint(20) DEFAULT NULL,
  `S_SYS_FILENAME` varchar(128) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  `I_CREATE_STAFF_ID` bigint(20) DEFAULT NULL,
  `S_CREATE_STAFF_NAME` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_city`
--

DROP TABLE IF EXISTS `t_pub_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_city` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_ADDR_CODE` varchar(64) DEFAULT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `S_PROVINCE_CODE` varchar(64) DEFAULT NULL,
  `S_ZIP_CODE` varchar(255) DEFAULT NULL,
  `I_AREA_ID` bigint(20) NOT NULL,
  `I_COUNTRY_ID` bigint(20) NOT NULL,
  `I_PROVINCE_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FK7iiop9ar2h4aad7uei9m3xlmo` (`I_AREA_ID`) USING BTREE,
  KEY `FKsx93ib7px8sqabajmet582oo4` (`I_COUNTRY_ID`) USING BTREE,
  KEY `FK1l5wi1obwcyvhooouvo7ys4oo` (`I_PROVINCE_ID`) USING BTREE,
  CONSTRAINT `t_pub_city_ibfk_1` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_10` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_11` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_12` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_13` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_14` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_15` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_16` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_17` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_18` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_2` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_3` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_4` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_5` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_6` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_7` FOREIGN KEY (`I_PROVINCE_ID`) REFERENCES `t_pub_province` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_8` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_city_ibfk_9` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_country`
--

DROP TABLE IF EXISTS `t_pub_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_country` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_NAME` varchar(200) NOT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_county`
--

DROP TABLE IF EXISTS `t_pub_county`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_county` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `S_ADDR_CODE` varchar(64) DEFAULT NULL,
  `S_CITY_CODE` varchar(64) DEFAULT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `I_CITY_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FKi876e3f0mv56eo63d6ec3g5pk` (`I_CITY_ID`) USING BTREE,
  CONSTRAINT `t_pub_county_ibfk_1` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`),
  CONSTRAINT `t_pub_county_ibfk_2` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`),
  CONSTRAINT `t_pub_county_ibfk_3` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`),
  CONSTRAINT `t_pub_county_ibfk_4` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`),
  CONSTRAINT `t_pub_county_ibfk_5` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`),
  CONSTRAINT `t_pub_county_ibfk_6` FOREIGN KEY (`I_CITY_ID`) REFERENCES `t_pub_city` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_province`
--

DROP TABLE IF EXISTS `t_pub_province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_province` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ADDR_CODE` varchar(64) DEFAULT NULL,
  `S_NAME` varchar(200) DEFAULT NULL,
  `I_AREA_ID` bigint(20) NOT NULL,
  `I_COUNTRY_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FKgnk1q0gwwpkvaoy91bfyua7q7` (`I_AREA_ID`) USING BTREE,
  KEY `FKarjvoa8ctph1utyi6gmm17fmy` (`I_COUNTRY_ID`) USING BTREE,
  CONSTRAINT `t_pub_province_ibfk_1` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_10` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_11` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_12` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_2` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_3` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_4` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_5` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_6` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_7` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_8` FOREIGN KEY (`I_AREA_ID`) REFERENCES `t_pub_area` (`I_ID`),
  CONSTRAINT `t_pub_province_ibfk_9` FOREIGN KEY (`I_COUNTRY_ID`) REFERENCES `t_pub_country` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_setup`
--

DROP TABLE IF EXISTS `t_pub_setup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_setup` (
  `S_ID` varchar(64) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_CODE` varchar(64) DEFAULT NULL,
  `S_NAME` varchar(64) DEFAULT NULL,
  `S_VALUE` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`S_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_pub_sys`
--

DROP TABLE IF EXISTS `t_pub_sys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_pub_sys` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ALL_PATH` varchar(512) DEFAULT NULL,
  `I_INDUSTRY` bigint(20) DEFAULT NULL,
  `I_PARENT_ID` bigint(20) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `S_SYS_DOMAIN` varchar(128) NOT NULL,
  `S_SYS_NAME` varchar(128) NOT NULL,
  `I_TYPE` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_query_wechat_return_result`
--

DROP TABLE IF EXISTS `t_query_wechat_return_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_query_wechat_return_result` (
  `I_ID` decimal(20,0) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_RETURN_CODE` varchar(16) DEFAULT NULL,
  `S_RETURN_MSG` varchar(128) DEFAULT NULL,
  `S_RESULT_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE_DES` varchar(128) DEFAULT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_TRANSACTION_ID` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `I_SETTLEMENT_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_FEE_TYPE` varchar(8) DEFAULT NULL,
  `I_CASH_FEE` int(11) DEFAULT NULL,
  `I_REFOUNT_COUNT` int(11) DEFAULT NULL,
  `S_OUT_REFUND_NO_$N` varchar(32) DEFAULT NULL,
  `S_REFUND_ID_$N` varchar(32) DEFAULT NULL,
  `S_REFUND_CHANN_$N` varchar(32) DEFAULT NULL,
  `I_REFUND_FEE_$N` int(11) DEFAULT NULL,
  `I_SETTLEMENT_REFUND_FEE_$N` int(11) DEFAULT NULL,
  `I_COUPON_TYPE_$N` int(11) DEFAULT NULL,
  `I_COUPON_REFUND_FEE_$N` int(11) DEFAULT NULL,
  `I_COUPON_REFUND_COUNT_$N` int(11) DEFAULT NULL,
  `S_COUPON_REFUND_ID_$N_$M` varchar(20) DEFAULT NULL,
  `I_COUPON_REFUND_FEE_$N_$M` int(11) DEFAULT NULL,
  `I_REFUND_STATUS_$N` varchar(32) DEFAULT NULL,
  `S_REFUND_ACCOUNT_$N` varchar(32) DEFAULT NULL,
  `S_REFUND_RECV_ACCOUNT_$N` varchar(32) DEFAULT NULL,
  `S_REFUND_ACCOUT_$N` varchar(32) DEFAULT NULL,
  `S_OPENID` varchar(128) DEFAULT NULL,
  `S_IS_SUBSCRIBE` varchar(1) DEFAULT NULL,
  `S_ATTACH` varchar(128) DEFAULT NULL,
  `S_TIME_END` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_refunds_set`
--

DROP TABLE IF EXISTS `t_refunds_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_refunds_set` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `i_refund_days` int(6) DEFAULT NULL,
  `s_address` varchar(1024) DEFAULT NULL,
  `s_province_name` varchar(128) DEFAULT NULL,
  `s_province_id` varchar(32) DEFAULT NULL,
  `s_region_name` varchar(128) DEFAULT NULL,
  `s_region_id` varchar(32) DEFAULT NULL,
  `s_city_name` varchar(128) DEFAULT NULL,
  `s_city_id` varchar(32) DEFAULT NULL,
  `i_created_id` bigint(20) DEFAULT NULL,
  `s_created_name` varchar(64) DEFAULT NULL,
  `d_created_time` datetime DEFAULT NULL,
  `S_PHONE` varchar(64) DEFAULT NULL,
  `S_ONTACT` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_return_wechat_order_log`
--

DROP TABLE IF EXISTS `t_return_wechat_order_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_return_wechat_order_log` (
  `I_ID` decimal(20,0) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_APP_ID` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_REFUND_FEE_TYPE` varchar(16) DEFAULT NULL,
  `I_REFUND_FEE` int(11) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_TRADE_TYPE` varchar(16) DEFAULT NULL,
  `S_OPEN_ID` varchar(128) DEFAULT NULL,
  `S_OUT_REFUND_NO` varchar(32) DEFAULT NULL,
  `S_OP_USER_ID` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_business`
--

DROP TABLE IF EXISTS `t_settlement_business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_business` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_GIVE_MONEY` double DEFAULT NULL,
  `I_LEADER_GET_MONEY` double DEFAULT NULL,
  `I_LEADER_MONEY` double DEFAULT NULL,
  `I_PLAT_GET_MONEY` double DEFAULT NULL,
  `I_SHOP_GET_MONEY` double DEFAULT NULL,
  `I_TOTAL_MONEY` double DEFAULT NULL,
  `I_TOTAL_NUM` int(11) DEFAULT NULL,
  `I_TOTAL_PLAT_MONEY` double DEFAULT NULL,
  `I_TOTAL_SHOP_MONEY` double DEFAULT NULL,
  `S_VALID_NO` varchar(256) DEFAULT NULL,
  `I_VOUCHER_MONEY` double DEFAULT NULL,
  `I_VOUCHER_NUM` int(11) DEFAULT NULL,
  `I_VOUCHER_USE_NUM` double DEFAULT NULL,
  `I_VOUCHER_USE_MONEY` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_order_detail`
--

DROP TABLE IF EXISTS `t_settlement_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_order_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_COUPON_MONEY` double DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_LEADER_AMOUNT` double DEFAULT NULL,
  `I_LEADER_DETAIL_ID` bigint(20) DEFAULT NULL,
  `I_LEADER_GIVE_SETTLE` int(11) DEFAULT NULL,
  `I_LEADER_ID` bigint(20) DEFAULT NULL,
  `I_LEADER_SETTLEMENT` int(11) DEFAULT NULL,
  `I_LOGISTICS_AMOUNT` double DEFAULT NULL,
  `I_LOGISTICS_COST` double DEFAULT NULL,
  `I_LOGISTICS_SETTLEMENT` int(11) DEFAULT NULL,
  `S_ORDER_CODE` varchar(128) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `I_ORDER_STATUS` int(11) DEFAULT NULL,
  `D_ORDER_TIME` datetime DEFAULT NULL,
  `I_PLAT_AMOUNT` double DEFAULT NULL,
  `I_PLAT_DETAIL_ID` bigint(20) DEFAULT NULL,
  `I_PLAT_SETTLEMENT` int(11) DEFAULT NULL,
  `I_PRODUCT_AMOUNT` double DEFAULT NULL,
  `I_SHOP_DETAIL_ID` bigint(20) DEFAULT NULL,
  `I_SHOP_GIVE_SETTLE` int(11) DEFAULT NULL,
  `I_SHOP_ID` bigint(20) DEFAULT NULL,
  `I_SHOPKEEPER_AMOUNT` double DEFAULT NULL,
  `I_SHOPKEEPER_ID` bigint(20) DEFAULT NULL,
  `I_SHOPKEEPER_SETTLEMENT` int(11) DEFAULT NULL,
  `I_TOTAL_AMOUNT` double DEFAULT NULL,
  `I_TOTAL_PAY_AMOUNT` double DEFAULT NULL,
  `I_ORDER_TYPE` int(11) DEFAULT NULL,
  `S_REBATE_JSON` varchar(1024) DEFAULT NULL,
  `I_PAY_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_plan`
--

DROP TABLE IF EXISTS `t_settlement_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_plan` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `D_BEGIN_TIME` datetime DEFAULT NULL,
  `I_DAY` int(11) DEFAULT NULL,
  `D_END_TIME` datetime DEFAULT NULL,
  `S_EXCEPTION` varchar(512) DEFAULT NULL,
  `D_RUN_DATE` datetime DEFAULT NULL,
  `I_RUN_STATE` int(11) DEFAULT NULL,
  `I_RUN_TIME` bigint(20) DEFAULT NULL,
  `I_TASK_ID` bigint(20) DEFAULT NULL,
  `I_TASK_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_plat`
--

DROP TABLE IF EXISTS `t_settlement_plat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_plat` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACCOUNT_MONEY` double DEFAULT NULL,
  `I_APPLY_MONEY` double DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_GET_MONEY` double DEFAULT NULL,
  `I_TOTAL_MONEY` double DEFAULT NULL,
  `I_TOTAL_NUM` int(11) DEFAULT NULL,
  `S_VALID_NO` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_plat_detail`
--

DROP TABLE IF EXISTS `t_settlement_plat_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_plat_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_ORDER_MONEY` double DEFAULT NULL,
  `I_ORDER_NUM` int(11) DEFAULT NULL,
  `I_RULE_ID` bigint(20) DEFAULT NULL,
  `I_SALES_MONEY` double DEFAULT NULL,
  `D_SETTLE_DATE` datetime NOT NULL,
  `S_RULE_REMARK` varchar(255) DEFAULT NULL,
  `I_STATUS` int(6) DEFAULT NULL,
  `S_SETTLE_STAFF_NAME` varchar(32) DEFAULT NULL,
  `S_SETTLE_CODE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_push_record`
--

DROP TABLE IF EXISTS `t_settlement_push_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_push_record` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_ACCOUNT_DETAIL_ID` bigint(20) DEFAULT NULL,
  `I_ORDER_ID` bigint(20) DEFAULT NULL,
  `I_PUSH_MONEY` double DEFAULT NULL,
  `I_REBATE_LEVEL` int(11) DEFAULT NULL,
  `I_SHOPKEEPER_ID` bigint(20) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  `I_UNIT_PRICE` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_shop_detail`
--

DROP TABLE IF EXISTS `t_settlement_shop_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_shop_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_COUPON_ID` varchar(1000) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_ID` bigint(20) DEFAULT NULL,
  `I_CUS_TYPE` int(11) DEFAULT NULL,
  `I_GIVE_MONEY` double DEFAULT NULL,
  `I_RULE_ID` bigint(20) DEFAULT NULL,
  `I_SALES_MONEY` double DEFAULT NULL,
  `I_SETTLEMENT_TYPE` int(11) DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_shop_rule`
--

DROP TABLE IF EXISTS `t_settlement_shop_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_shop_rule` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_CUS_TYPE` int(11) DEFAULT NULL,
  `I_CYCLE` int(11) DEFAULT NULL,
  `D_END_TIME` datetime DEFAULT NULL,
  `I_FACTORY_ID` bigint(20) DEFAULT NULL,
  `I_LENGTH` int(11) DEFAULT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `I_REWARD_TYPE` int(11) DEFAULT NULL,
  `D_START_TIME` datetime DEFAULT NULL,
  `I_STATUS` int(11) DEFAULT NULL,
  `D_STOP_TIME` datetime DEFAULT NULL,
  `I_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_settlement_shop_rule_detail`
--

DROP TABLE IF EXISTS `t_settlement_shop_rule_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_settlement_shop_rule_detail` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_COUPON_ID` varchar(1000) DEFAULT NULL,
  `I_CREATED_ID` bigint(20) DEFAULT NULL,
  `S_CREATED_NAME` varchar(32) DEFAULT NULL,
  `I_REWARD_MONEY` double DEFAULT NULL,
  `I_REWARD_TYPE` int(11) DEFAULT NULL,
  `I_RULE_ID` bigint(20) DEFAULT NULL,
  `I_SALES_END` double DEFAULT NULL,
  `I_SALES_START` double DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_sms_log`
--

DROP TABLE IF EXISTS `t_sms_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_sms_log` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_CODE` varchar(32) DEFAULT NULL,
  `S_CONTENT` varchar(1024) DEFAULT NULL,
  `S_PHONE_NUMBER` varchar(16) DEFAULT NULL,
  `I_PLATFORM_ENUM` int(11) DEFAULT NULL,
  `S_SCENE` varchar(255) DEFAULT NULL,
  `S_USER_ACCOUNT` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_staff_attribute`
--

DROP TABLE IF EXISTS `t_staff_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_staff_attribute` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_SEQ` int(11) DEFAULT NULL,
  `IS_ENABLED` bit(1) NOT NULL,
  `IS_REQUIRED` bit(1) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `PROPERTY_INDEX` int(11) DEFAULT NULL,
  `TYPE` int(11) NOT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_staff_attribute_option`
--

DROP TABLE IF EXISTS `t_staff_attribute_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_staff_attribute_option` (
  `STAFF_ATTRIBUTE` bigint(20) NOT NULL,
  `OPTIONS` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wechat_return_order`
--

DROP TABLE IF EXISTS `t_wechat_return_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wechat_return_order` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_ORDER_NO` varchar(64) NOT NULL,
  `I_PAY_MODE` int(2) NOT NULL,
  `I_TOTAL_AMOUNT` bigint(20) NOT NULL,
  `S_BUSINESS_TYPE` varchar(128) NOT NULL,
  `S_BUSINESS_REL` varchar(64) DEFAULT NULL,
  `S_BUSINESS_PARAM` varchar(512) DEFAULT NULL,
  `I_STATUS` tinyint(1) NOT NULL,
  `D_RETURN_TIME` datetime DEFAULT NULL,
  `D_CLOSE_TIME` datetime DEFAULT NULL,
  `I_CLOSE_TYPE` int(1) DEFAULT NULL,
  `I_RETURN_AMOUNT` int(11) DEFAULT NULL,
  `S_REFUND_NO` varchar(32) DEFAULT NULL,
  `I_RETURN_ID` bigint(32) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wechat_return_result_notify`
--

DROP TABLE IF EXISTS `t_wechat_return_result_notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wechat_return_result_notify` (
  `I_ID` decimal(20,0) NOT NULL,
  `D_CREATE_DATE` datetime DEFAULT NULL,
  `D_MODIFY_DATE` datetime DEFAULT NULL,
  `S_RETURN_CODE` varchar(16) DEFAULT NULL,
  `S_RETURN_MSG` varchar(128) DEFAULT NULL,
  `S_RESULT_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE` varchar(32) DEFAULT NULL,
  `S_ERR_CODE_DES` varchar(128) DEFAULT NULL,
  `S_APPID` varchar(32) DEFAULT NULL,
  `S_MCH_ID` varchar(32) DEFAULT NULL,
  `S_DEVICE_INFO` varchar(32) DEFAULT NULL,
  `S_NONCE_STR` varchar(32) DEFAULT NULL,
  `S_SIGN` varchar(32) DEFAULT NULL,
  `S_TRANSACTION_ID` varchar(32) DEFAULT NULL,
  `S_OUT_TRADE_NO` varchar(32) DEFAULT NULL,
  `S_OUT_REFUND_NO` varchar(32) DEFAULT NULL,
  `S_REFUND_ID` varchar(32) DEFAULT NULL,
  `S_REFUND_CHANN` varchar(32) DEFAULT NULL,
  `I_REFUND_FEE` int(11) DEFAULT NULL,
  `I_SETTLEMENT_REFUND_FEE` int(11) DEFAULT NULL,
  `I_TOTAL_FEE` int(11) DEFAULT NULL,
  `I_SETTLEMENT_TOTAL_FEE` int(11) DEFAULT NULL,
  `S_FEE_TYPE` varchar(8) DEFAULT NULL,
  `I_CASH_FEE` int(11) DEFAULT NULL,
  `S_CASH_FEE_TYPE` varchar(16) DEFAULT NULL,
  `I_CASH_REFUND_FEE` int(11) DEFAULT NULL,
  `S_COUPON_TYPE_$N` varchar(8) DEFAULT NULL,
  `I_COUPON_REFUND_FEE` int(11) DEFAULT NULL,
  `I_COUPON_REFUND_FEE_$N` int(11) DEFAULT NULL,
  `I_COUPON_REFUND_COUNT` int(11) DEFAULT NULL,
  `S_COUPON_REFUND_ID_$N` varchar(20) DEFAULT NULL,
  `S_OPENID` varchar(128) DEFAULT NULL,
  `S_IS_SUBSCRIBE` varchar(1) DEFAULT NULL,
  `S_ATTACH` varchar(128) DEFAULT NULL,
  `S_TIME_END` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_whs_enum_module`
--

DROP TABLE IF EXISTS `t_whs_enum_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_whs_enum_module` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_PARENT_ID` int(11) DEFAULT NULL,
  `S_MODULE_NAME` varchar(255) DEFAULT NULL,
  `S_PATH` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_whs_enum_tbl`
--

DROP TABLE IF EXISTS `t_whs_enum_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_whs_enum_tbl` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_DOMAIN_ID` int(11) DEFAULT NULL,
  `I_ENUM_VALUE` int(11) DEFAULT NULL,
  `I_REL_ENUM_ID` int(11) DEFAULT NULL,
  `S_ENUM_CN_NAME` varchar(255) DEFAULT NULL,
  `S_ENUM_COL_NAME` varchar(255) DEFAULT NULL,
  `S_ENUM_NAME` varchar(255) DEFAULT NULL,
  `S_ENUM_TBL_NAME` varchar(255) DEFAULT NULL,
  `S_REFERENCE_NAME` varchar(255) DEFAULT NULL,
  `S_REL_ENUM_NAME` varchar(255) DEFAULT NULL,
  `S_REMARK` varchar(255) DEFAULT NULL,
  `I_IS_ENABLED` int(11) DEFAULT NULL,
  `I_MODULE_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`I_ID`),
  KEY `FKn7xs8ilxvy77i6mmb6awk9l0v` (`I_MODULE_ID`) USING BTREE,
  CONSTRAINT `t_whs_enum_tbl_ibfk_1` FOREIGN KEY (`I_MODULE_ID`) REFERENCES `t_whs_enum_module` (`I_ID`),
  CONSTRAINT `t_whs_enum_tbl_ibfk_2` FOREIGN KEY (`I_MODULE_ID`) REFERENCES `t_whs_enum_module` (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_withdraw_set`
--

DROP TABLE IF EXISTS `t_withdraw_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_withdraw_set` (
  `I_ID` bigint(20) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `i_withdraw_start` int(11) DEFAULT NULL,
  `i_withdraw_end` int(11) DEFAULT NULL,
  `i_withdraw_money` double DEFAULT NULL,
  `i_created_id` bigint(20) DEFAULT NULL,
  `s_created_name` varchar(64) DEFAULT NULL,
  `d_created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wx_api_ticket`
--

DROP TABLE IF EXISTS `t_wx_api_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wx_api_ticket` (
  `S_ID` varchar(64) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `I_EXPIRED_TIME` bigint(20) NOT NULL,
  `I_EXPIRESIN` bigint(20) NOT NULL,
  `S_PUBLIC_ACCOUNT_ID` varchar(256) NOT NULL,
  `S_REMARK` varchar(1024) DEFAULT NULL,
  `S_TICKET` varchar(256) NOT NULL,
  `I_TICKET_TYPE` int(11) NOT NULL,
  PRIMARY KEY (`S_ID`),
  KEY `IDX7fpekdot3vflrqh53yxygume3` (`S_PUBLIC_ACCOUNT_ID`) USING BTREE,
  KEY `IDXb6ucfmt6kpyh9cs43j9vg5nox` (`S_PUBLIC_ACCOUNT_ID`,`I_TICKET_TYPE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wx_public_account`
--

DROP TABLE IF EXISTS `t_wx_public_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wx_public_account` (
  `S_ID` varchar(64) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_APPID` varchar(128) DEFAULT NULL,
  `S_APPSECRET` varchar(128) DEFAULT NULL,
  `S_BIND_URL` varchar(512) DEFAULT NULL,
  `S_ENCODING_AESKEY` varchar(256) DEFAULT NULL,
  `I_ENCRYPT_TYPE` int(11) DEFAULT NULL,
  `I_MULI_SERVER` int(11) DEFAULT NULL,
  `S_NAME` varchar(64) DEFAULT NULL,
  `S_TOKEN` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`S_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wx_user`
--

DROP TABLE IF EXISTS `t_wx_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wx_user` (
  `S_ID` varchar(64) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_ACCESS_TOKEN` varchar(128) DEFAULT NULL,
  `S_CITY` varchar(128) DEFAULT NULL,
  `S_COUNTRY` varchar(64) DEFAULT NULL,
  `S_ENCODE_NICK_NAME` varchar(128) DEFAULT NULL,
  `I_EXPIRED_TIME` bigint(20) DEFAULT NULL,
  `I_EXPIRE_IN` bigint(20) DEFAULT NULL,
  `S_FAKE_ID` varchar(64) DEFAULT NULL,
  `S_HEAD_IMG_URL` varchar(1024) DEFAULT NULL,
  `S_LANGUAGE` varchar(64) DEFAULT NULL,
  `S_NICK_NAME` varchar(128) DEFAULT NULL,
  `S_OPEN_ID` varchar(64) DEFAULT NULL,
  `S_PROVINCE` varchar(64) DEFAULT NULL,
  `S_PUBLIC_ACCOUNT_ID` varchar(256) DEFAULT NULL,
  `S_REFRESH_TOKEN` varchar(128) DEFAULT NULL,
  `S_REMARK_NAME` varchar(256) DEFAULT NULL,
  `S_SEX` varchar(64) DEFAULT NULL,
  `I_IS_SUBSCRIBE` bit(1) NOT NULL,
  `I_SUBSCRIBE_TIME` bigint(20) DEFAULT NULL,
  `S_UNION_ID` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`S_ID`),
  KEY `IDXf4fqeif4ymuw2mwx7xcie45b` (`S_OPEN_ID`,`S_PUBLIC_ACCOUNT_ID`) USING BTREE,
  KEY `IDX1ytepllvfrd800pewld60ss3j` (`S_UNION_ID`) USING BTREE,
  KEY `IDXp0ti5uuqgqhfb0yeecqhpk98j` (`S_PUBLIC_ACCOUNT_ID`) USING BTREE,
  KEY `IDXli3rqq3bev6pb6x11s8w0m7bs` (`S_OPEN_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_wx_user_ref_bis`
--

DROP TABLE IF EXISTS `t_wx_user_ref_bis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wx_user_ref_bis` (
  `S_ID` varchar(64) NOT NULL,
  `D_CREATE_DATE` datetime NOT NULL,
  `D_MODIFY_DATE` datetime NOT NULL,
  `S_BIS_ID` varchar(128) NOT NULL,
  `I_BIS_TYPE` int(11) NOT NULL,
  `S_OPEN_ID` varchar(128) NOT NULL,
  `S_PUBLIC_ACCOUNT_ID` varchar(128) NOT NULL,
  `S_WECHAT_USER_ID` varchar(128) NOT NULL,
  PRIMARY KEY (`S_ID`),
  KEY `IDXbcckwjjhnwir2mmyykcfkcbv9` (`S_PUBLIC_ACCOUNT_ID`,`S_OPEN_ID`) USING BTREE,
  KEY `IDXks0qbxfn9yd11qvhe7hmpx80e` (`S_BIS_ID`,`I_BIS_TYPE`) USING BTREE,
  KEY `IDXkmcp0actwgfpx6qyhbu6vpmlv` (`S_WECHAT_USER_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_app_publish_log`
--

DROP TABLE IF EXISTS `t_app_publish_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
create table t_app_publish_log
(
  I_ID bigint not null
    primary key,
  D_CREATE_DATE datetime not null,
  D_MODIFY_DATE datetime not null,
  S_APP_PACKAGE_PATH varchar(256) null,
  S_DETAIL_URL varchar(512) null,
  I_FORCE_UPDATE int null,
  I_OPERATOR_ID bigint null,
  S_OPERATOR_NAME varchar(64) null,
  I_PLATFORM int null,
  S_REMARK varchar(512) null,
  S_VERSION varchar(64) null,
  S_VERSION_DESC varchar(512) null
)
  engine=InnoDB collate=utf8_bin
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_app_publish_log`
--

DROP TABLE IF EXISTS `t_loading_page_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
create table t_loading_page_setting
(
  I_ID bigint not null
    primary key,
  D_CREATE_DATE datetime not null,
  D_MODIFY_DATE datetime not null,
  D_END_DATE datetime null,
  S_LOADING_PAGE varchar(128) null,
  D_START_DATE datetime null
)
  engine=InnoDB collate=utf8_bin
;
/*!40101 SET character_set_client = @saved_cs_client */;





--
-- Dumping events for database 'hypnus_test'
--

--
-- Dumping routines for database 'hypnus_test'
--
/*!50003 DROP FUNCTION IF EXISTS `currval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `currval`(seq_name VARCHAR(50)) RETURNS int(11)
    READS SQL DATA
    DETERMINISTIC
BEGIN  

  

DECLARE VALUE INTEGER;  

  

SET VALUE = 0;  

  

SELECT current_value INTO VALUE FROM sequence WHERE NAME = seq_name;  

  

RETURN VALUE;  

  

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `nextval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `nextval`(seq_name VARCHAR(50)) RETURNS int(11)
    DETERMINISTIC
BEGIN  

  

UPDATE sequence SET current_value = current_value + increment WHERE NAME = seq_name;  

  

RETURN currval(seq_name);  

  

END ;;
DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-29 17:08:16
