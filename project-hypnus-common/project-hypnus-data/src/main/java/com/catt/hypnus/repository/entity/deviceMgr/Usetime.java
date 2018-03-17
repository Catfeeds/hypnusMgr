package com.catt.hypnus.repository.entity.deviceMgr;

import com.catt.common.base.repository.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * usetime实体类
 *
 * @author runtime
 * @version V1.0
 * @date 2018-03-17 17:09:14
 */
@Entity
@JsonAutoDetect
@Table(name = "USETIME")
public class Usetime extends BaseEntity {

    private static final long serialVersionUID = 1L;


    /**
     * <pre>
     * 开始时间
     * 开始时间
     * </pre>
     */
    private String starttime;
    /**
     * <pre>
     * device_id
     * 设备标识
     * </pre>
     */
    private String deviceId;
    /**
     * <pre>
     * mode
     * 0：CPAP，1：APAP，2：BPAP-S 3：AutoBPAP-S,
     * 4：BPAP-T,5： BPAP-ST
     * </pre>
     */
    private Integer mode;
    /**
     * <pre>
     * peroid
     * 治疗持续时间
     * </pre>
     */
    private Long peroid;
    /**
     * <pre>
     * end_time
     * 结束时间
     * </pre>
     */
    private String endTime;
    /**
     * <pre>
     * pressure_pos
     * 压力数据量
     * </pre>
     */
    private Long pressurePos;
    /**
     * <pre>
     * flow_pos
     * 流量数据量
     * </pre>
     */
    private Long flowPos;
    /**
     * <pre>
     * dileak_pos
     * 实时漏气文件的记录量
     * </pre>
     */
    private Long dileakPos;
    /**
     * <pre>
     * breathrate_pos
     * 呼吸频率数据量
     * </pre>
     */
    private Long breathratePos;
    /**
     * <pre>
     * mv_pos
     * 实时潮气量数据
     * </pre>
     */
    private Long mvPos;
    /**
     * <pre>
     * intime_pos
     * intime_pos
     * </pre>
     */
    private Long intimePos;
    /**
     * <pre>
     * m_pressure_1
     * 压力1
     * </pre>
     */
    private Double pressure1;
    /**
     * <pre>
     * m_pressure_2
     * 压力2
     * </pre>
     */
    private Double pressure2;
    /**
     * <pre>
     * start_pressure
     * 起始压力
     * </pre>
     */
    private Double startPressure;
    /**
     * <pre>
     * cure_delay
     * 延迟时间
     * </pre>
     */
    private Integer cureDelay;
    /**
     * <pre>
     * dep_type
     * 呼气释压
     * </pre>
     */
    private Integer depType;
    /**
     * <pre>
     * dep_level
     * 释压水平
     * </pre>
     */
    private Integer depLevel;
    /**
     * <pre>
     * breath_fit
     * 呼气舒适度
     * </pre>
     */
    private Integer breathFit;
    /**
     * <pre>
     * inhale_sensitive
     * 吸气灵敏度
     * </pre>
     */
    private Integer inhaleSensitive;
    /**
     * <pre>
     * exhale_sensitive
     * 呼气灵敏度
     * </pre>
     */
    private Integer exhaleSensitive;
    /**
     * <pre>
     * pressure_support
     * 最大压力支持
     * </pre>
     */
    private Integer pressureSupport;
    /**
     * <pre>
     * breath_ratio
     * 呼吸比
     * </pre>
     */
    private Integer breathRatio;
    /**
     * <pre>
     * breath_rate
     * 呼吸频率
     * </pre>
     */
    private Integer breathRate;
    /**
     * <pre>
     * data_version
     * 数据软件版本
     * </pre>
     */
    private String dataVersion;
    /**
     * <pre>
     * record_time
     * 服务器记录时间
     * </pre>
     */
    private String recordTime;

    @Column(name = "STARTTIME", length = 19)
    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    @Column(name = "DEVICE_ID", length = 32)
    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Column(name = "MODE")
    public Integer getMode() {
        return mode;
    }

    public void setMode(Integer mode) {
        this.mode = mode;
    }

    @Column(name = "PEROID")
    public Long getPeroid() {
        return peroid;
    }

    public void setPeroid(Long peroid) {
        this.peroid = peroid;
    }

    @Column(name = "END_TIME", length = 19)
    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Column(name = "PRESSURE_POS")
    public Long getPressurePos() {
        return pressurePos;
    }

    public void setPressurePos(Long pressurePos) {
        this.pressurePos = pressurePos;
    }

    @Column(name = "FLOW_POS")
    public Long getFlowPos() {
        return flowPos;
    }

    public void setFlowPos(Long flowPos) {
        this.flowPos = flowPos;
    }

    @Column(name = "DILEAK_POS")
    public Long getDileakPos() {
        return dileakPos;
    }

    public void setDileakPos(Long dileakPos) {
        this.dileakPos = dileakPos;
    }

    @Column(name = "BREATHRATE_POS")
    public Long getBreathratePos() {
        return breathratePos;
    }

    public void setBreathratePos(Long breathratePos) {
        this.breathratePos = breathratePos;
    }

    @Column(name = "MV_POS")
    public Long getMvPos() {
        return mvPos;
    }

    public void setMvPos(Long mvPos) {
        this.mvPos = mvPos;
    }

    @Column(name = "INTIME_POS")
    public Long getIntimePos() {
        return intimePos;
    }

    public void setIntimePos(Long intimePos) {
        this.intimePos = intimePos;
    }

    @Column(name = "M_PRESSURE_1")
    public Double getPressure1() {
        return pressure1;
    }

    public void setPressure1(Double pressure1) {
        this.pressure1 = pressure1;
    }

    @Column(name = "M_PRESSURE_2")
    public Double getPressure2() {
        return pressure2;
    }

    public void setPressure2(Double pressure2) {
        this.pressure2 = pressure2;
    }

    @Column(name = "START_PRESSURE")
    public Double getStartPressure() {
        return startPressure;
    }

    public void setStartPressure(Double startPressure) {
        this.startPressure = startPressure;
    }

    @Column(name = "CURE_DELAY")
    public Integer getCureDelay() {
        return cureDelay;
    }

    public void setCureDelay(Integer cureDelay) {
        this.cureDelay = cureDelay;
    }

    @Column(name = "DEP_TYPE")
    public Integer getDepType() {
        return depType;
    }

    public void setDepType(Integer depType) {
        this.depType = depType;
    }

    @Column(name = "DEP_LEVEL")
    public Integer getDepLevel() {
        return depLevel;
    }

    public void setDepLevel(Integer depLevel) {
        this.depLevel = depLevel;
    }

    @Column(name = "BREATH_FIT")
    public Integer getBreathFit() {
        return breathFit;
    }

    public void setBreathFit(Integer breathFit) {
        this.breathFit = breathFit;
    }

    @Column(name = "INHALE_SENSITIVE")
    public Integer getInhaleSensitive() {
        return inhaleSensitive;
    }

    public void setInhaleSensitive(Integer inhaleSensitive) {
        this.inhaleSensitive = inhaleSensitive;
    }

    @Column(name = "EXHALE_SENSITIVE")
    public Integer getExhaleSensitive() {
        return exhaleSensitive;
    }

    public void setExhaleSensitive(Integer exhaleSensitive) {
        this.exhaleSensitive = exhaleSensitive;
    }

    @Column(name = "PRESSURE_SUPPORT")
    public Integer getPressureSupport() {
        return pressureSupport;
    }

    public void setPressureSupport(Integer pressureSupport) {
        this.pressureSupport = pressureSupport;
    }

    @Column(name = "BREATH_RATIO")
    public Integer getBreathRatio() {
        return breathRatio;
    }

    public void setBreathRatio(Integer breathRatio) {
        this.breathRatio = breathRatio;
    }

    @Column(name = "BREATH_RATE")
    public Integer getBreathRate() {
        return breathRate;
    }

    public void setBreathRate(Integer breathRate) {
        this.breathRate = breathRate;
    }

    @Column(name = "DATA_VERSION", length = 10)
    public String getDataVersion() {
        return dataVersion;
    }

    public void setDataVersion(String dataVersion) {
        this.dataVersion = dataVersion;
    }

    @Column(name = "RECORD_TIME", length = 23)
    public String getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(String recordTime) {
        this.recordTime = recordTime;
    }

}

