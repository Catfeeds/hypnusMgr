package com.catt.hypnus.repository.entity.userMgr;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/31
 * 影子设备
 */

import java.io.Serializable;

public class DeviceShadowDTO implements Serializable {

    /**
     * 起始压力
     */
    private String start_pressure;
    private String intelligent_stop;
    private String temperature_unit;
    private String data_version;
    private String backlight;
    private String intelligent_start;
    private String language;
    private String cpap_p;
    /**
     * ST呼气压力
     */
    private String st_ex_p;
    private String swi_time;
    /**
     * 呼吸比
     */
    private String breath_ratio;
    /**
     * 下降斜坡
     */
    private String buckslope;
    /**
     * 呼吸频率
     */
    private String breath_rate;
    /**
     * 呼气压力
     */
    private String t_ex_p;
    /**
     * 治疗模式
     */
    private String cure_model;
    private String tv_alarm;
    private String pipe;
    private String leak_alarm;
    private String ai_alarm;
    private String dep_level;
    private String bpap_ex_p;
    private String mv_alarm;
    private String mask;
    /**
     * T吸气压力
     */
    private String t_in_p;
    private String heattube_tem;
    private String bpap_in_p;
    private String screensaver;
    private String inhale_sensitive;
    private String exhale_sensitive;
    private String deviceID;
    private String apap_max_p;
    private String autos_max_p;
    private String humidify_level;
    private String dep_type;
    private String breath_fit;
    private String light;
    private String machine;
    /**
     * 上升斜坡
     */
    private String boostslope;
    private String pressure_support;
    /**
     * 延迟时间
     */
    private String cure_delay;
    private String apap_min_p;
    /**
     * ST吸气压力
     */
    private String st_in_p;
    private String flight_mode;
    private String autos_min_p;

    public String getStart_pressure() {
        return start_pressure;
    }

    public void setStart_pressure(String start_pressure) {
        this.start_pressure = start_pressure;
    }

    public String getIntelligent_stop() {
        return intelligent_stop;
    }

    public void setIntelligent_stop(String intelligent_stop) {
        this.intelligent_stop = intelligent_stop;
    }

    public String getTemperature_unit() {
        return temperature_unit;
    }

    public void setTemperature_unit(String temperature_unit) {
        this.temperature_unit = temperature_unit;
    }

    public String getData_version() {
        return data_version;
    }

    public void setData_version(String data_version) {
        this.data_version = data_version;
    }

    public String getBacklight() {
        return backlight;
    }

    public void setBacklight(String backlight) {
        this.backlight = backlight;
    }

    public String getIntelligent_start() {
        return intelligent_start;
    }

    public void setIntelligent_start(String intelligent_start) {
        this.intelligent_start = intelligent_start;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCpap_p() {
        return cpap_p;
    }

    public void setCpap_p(String cpap_p) {
        this.cpap_p = cpap_p;
    }

    public String getSt_ex_p() {
        return st_ex_p;
    }

    public void setSt_ex_p(String st_ex_p) {
        this.st_ex_p = st_ex_p;
    }

    public String getSwi_time() {
        return swi_time;
    }

    public void setSwi_time(String swi_time) {
        this.swi_time = swi_time;
    }

    public String getBreath_ratio() {
        return breath_ratio;
    }

    public void setBreath_ratio(String breath_ratio) {
        this.breath_ratio = breath_ratio;
    }

    public String getBuckslope() {
        return buckslope;
    }

    public void setBuckslope(String buckslope) {
        this.buckslope = buckslope;
    }

    public String getBreath_rate() {
        return breath_rate;
    }

    public void setBreath_rate(String breath_rate) {
        this.breath_rate = breath_rate;
    }

    public String getT_ex_p() {
        return t_ex_p;
    }

    public void setT_ex_p(String t_ex_p) {
        this.t_ex_p = t_ex_p;
    }

    public String getCure_model() {
        return cure_model;
    }

    public void setCure_model(String cure_model) {
        this.cure_model = cure_model;
    }

    public String getTv_alarm() {
        return tv_alarm;
    }

    public void setTv_alarm(String tv_alarm) {
        this.tv_alarm = tv_alarm;
    }

    public String getPipe() {
        return pipe;
    }

    public void setPipe(String pipe) {
        this.pipe = pipe;
    }

    public String getLeak_alarm() {
        return leak_alarm;
    }

    public void setLeak_alarm(String leak_alarm) {
        this.leak_alarm = leak_alarm;
    }

    public String getAi_alarm() {
        return ai_alarm;
    }

    public void setAi_alarm(String ai_alarm) {
        this.ai_alarm = ai_alarm;
    }

    public String getDep_level() {
        return dep_level;
    }

    public void setDep_level(String dep_level) {
        this.dep_level = dep_level;
    }

    public String getBpap_ex_p() {
        return bpap_ex_p;
    }

    public void setBpap_ex_p(String bpap_ex_p) {
        this.bpap_ex_p = bpap_ex_p;
    }

    public String getMv_alarm() {
        return mv_alarm;
    }

    public void setMv_alarm(String mv_alarm) {
        this.mv_alarm = mv_alarm;
    }

    public String getMask() {
        return mask;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public String getT_in_p() {
        return t_in_p;
    }

    public void setT_in_p(String t_in_p) {
        this.t_in_p = t_in_p;
    }

    public String getHeattube_tem() {
        return heattube_tem;
    }

    public void setHeattube_tem(String heattube_tem) {
        this.heattube_tem = heattube_tem;
    }

    public String getBpap_in_p() {
        return bpap_in_p;
    }

    public void setBpap_in_p(String bpap_in_p) {
        this.bpap_in_p = bpap_in_p;
    }

    public String getScreensaver() {
        return screensaver;
    }

    public void setScreensaver(String screensaver) {
        this.screensaver = screensaver;
    }

    public String getInhale_sensitive() {
        return inhale_sensitive;
    }

    public void setInhale_sensitive(String inhale_sensitive) {
        this.inhale_sensitive = inhale_sensitive;
    }

    public String getExhale_sensitive() {
        return exhale_sensitive;
    }

    public void setExhale_sensitive(String exhale_sensitive) {
        this.exhale_sensitive = exhale_sensitive;
    }

    public String getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    public String getApap_max_p() {
        return apap_max_p;
    }

    public void setApap_max_p(String apap_max_p) {
        this.apap_max_p = apap_max_p;
    }

    public String getAutos_max_p() {
        return autos_max_p;
    }

    public void setAutos_max_p(String autos_max_p) {
        this.autos_max_p = autos_max_p;
    }

    public String getHumidify_level() {
        return humidify_level;
    }

    public void setHumidify_level(String humidify_level) {
        this.humidify_level = humidify_level;
    }

    public String getDep_type() {
        return dep_type;
    }

    public void setDep_type(String dep_type) {
        this.dep_type = dep_type;
    }

    public String getBreath_fit() {
        return breath_fit;
    }

    public void setBreath_fit(String breath_fit) {
        this.breath_fit = breath_fit;
    }

    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getBoostslope() {
        return boostslope;
    }

    public void setBoostslope(String boostslope) {
        this.boostslope = boostslope;
    }

    public String getPressure_support() {
        return pressure_support;
    }

    public void setPressure_support(String pressure_support) {
        this.pressure_support = pressure_support;
    }

    public String getCure_delay() {
        return cure_delay;
    }

    public void setCure_delay(String cure_delay) {
        this.cure_delay = cure_delay;
    }

    public String getApap_min_p() {
        return apap_min_p;
    }

    public void setApap_min_p(String apap_min_p) {
        this.apap_min_p = apap_min_p;
    }

    public String getSt_in_p() {
        return st_in_p;
    }

    public void setSt_in_p(String st_in_p) {
        this.st_in_p = st_in_p;
    }

    public String getFlight_mode() {
        return flight_mode;
    }

    public void setFlight_mode(String flight_mode) {
        this.flight_mode = flight_mode;
    }

    public String getAutos_min_p() {
        return autos_min_p;
    }

    public void setAutos_min_p(String autos_min_p) {
        this.autos_min_p = autos_min_p;
    }
}
