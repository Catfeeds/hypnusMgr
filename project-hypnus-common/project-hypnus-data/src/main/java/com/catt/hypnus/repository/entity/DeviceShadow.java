package com.catt.hypnus.repository.entity;

/**
 * @author: runtime
 * @version: Ver 1.0
 * @Date: 2018/3/31
 * 影子设备
 */

import java.io.Serializable;
public class DeviceShadow implements Serializable {

    /**
     * 起始压力
     */
    private int start_pressure;
    private int intelligent_stop;
    private int temperature_unit;
    private String data_version;
    private int backlight;
    private int intelligent_start;
    private int language;
    private int cpap_p;
    /**
     * ST呼气压力
     */
    private int st_ex_p;
    private int swi_time;
    /**
     * 呼吸比
     */
    private int breath_ratio;
    /**
     * 下降斜坡
     */
    private int buckslope;
    /**
     * 呼吸频率
     */
    private int breath_rate;
    /**
     * 呼气压力
     */
    private int t_ex_p;
    /**
     * 治疗模式
     */
    private int cure_model;
    private int tv_alarm;
    private int pipe;
    private int leak_alarm;
    private int ai_alarm;
    private int dep_level;
    private int bpap_ex_p;
    private int mv_alarm;
    private int mask;
    /**
     * T吸气压力
     */
    private int t_in_p;
    private int heattube_tem;
    private int bpap_in_p;
    private int screensaver;
    private int inhale_sensitive;
    private int exhale_sensitive;
    private String deviceID;
    private int apap_max_p;
    private int autos_max_p;
    private int humidify_level;
    private int dep_type;
    private int breath_fit;
    private int light;
    private int machine;
    /**
     * 上升斜坡
     */
    private int boostslope;
    private int pressure_support;
    /**
     * 延迟时间
     */
    private int cure_delay;
    private int apap_min_p;
    /**
     * ST吸气压力
     */
    private int st_in_p;
    private int flight_mode;
    private int autos_min_p;

    public void setStart_pressure(int start_pressure) {
        this.start_pressure = start_pressure;
    }

    public int getStart_pressure() {
        return start_pressure;
    }

    public void setIntelligent_stop(int intelligent_stop) {
        this.intelligent_stop = intelligent_stop;
    }

    public int getIntelligent_stop() {
        return intelligent_stop;
    }

    public void setTemperature_unit(int temperature_unit) {
        this.temperature_unit = temperature_unit;
    }

    public int getTemperature_unit() {
        return temperature_unit;
    }

    public void setData_version(String data_version) {
        this.data_version = data_version;
    }

    public String getData_version() {
        return data_version;
    }

    public void setBacklight(int backlight) {
        this.backlight = backlight;
    }

    public int getBacklight() {
        return backlight;
    }

    public void setIntelligent_start(int intelligent_start) {
        this.intelligent_start = intelligent_start;
    }

    public int getIntelligent_start() {
        return intelligent_start;
    }

    public void setLanguage(int language) {
        this.language = language;
    }

    public int getLanguage() {
        return language;
    }

    public void setCpap_p(int cpap_p) {
        this.cpap_p = cpap_p;
    }

    public int getCpap_p() {
        return cpap_p;
    }

    public void setSt_ex_p(int st_ex_p) {
        this.st_ex_p = st_ex_p;
    }

    public int getSt_ex_p() {
        return st_ex_p;
    }

    public void setSwi_time(int swi_time) {
        this.swi_time = swi_time;
    }

    public int getSwi_time() {
        return swi_time;
    }

    public void setBreath_ratio(int breath_ratio) {
        this.breath_ratio = breath_ratio;
    }

    public int getBreath_ratio() {
        return breath_ratio;
    }

    public void setBuckslope(int buckslope) {
        this.buckslope = buckslope;
    }

    public int getBuckslope() {
        return buckslope;
    }

    public void setBreath_rate(int breath_rate) {
        this.breath_rate = breath_rate;
    }

    public int getBreath_rate() {
        return breath_rate;
    }

    public void setT_ex_p(int t_ex_p) {
        this.t_ex_p = t_ex_p;
    }

    public int getT_ex_p() {
        return t_ex_p;
    }

    public void setCure_model(int cure_model) {
        this.cure_model = cure_model;
    }

    public int getCure_model() {
        return cure_model;
    }

    public void setTv_alarm(int tv_alarm) {
        this.tv_alarm = tv_alarm;
    }

    public int getTv_alarm() {
        return tv_alarm;
    }

    public void setPipe(int pipe) {
        this.pipe = pipe;
    }

    public int getPipe() {
        return pipe;
    }

    public void setLeak_alarm(int leak_alarm) {
        this.leak_alarm = leak_alarm;
    }

    public int getLeak_alarm() {
        return leak_alarm;
    }

    public void setAi_alarm(int ai_alarm) {
        this.ai_alarm = ai_alarm;
    }

    public int getAi_alarm() {
        return ai_alarm;
    }

    public void setDep_level(int dep_level) {
        this.dep_level = dep_level;
    }

    public int getDep_level() {
        return dep_level;
    }

    public void setBpap_ex_p(int bpap_ex_p) {
        this.bpap_ex_p = bpap_ex_p;
    }

    public int getBpap_ex_p() {
        return bpap_ex_p;
    }

    public void setMv_alarm(int mv_alarm) {
        this.mv_alarm = mv_alarm;
    }

    public int getMv_alarm() {
        return mv_alarm;
    }

    public void setMask(int mask) {
        this.mask = mask;
    }

    public int getMask() {
        return mask;
    }

    public void setT_in_p(int t_in_p) {
        this.t_in_p = t_in_p;
    }

    public int getT_in_p() {
        return t_in_p;
    }

    public void setHeattube_tem(int heattube_tem) {
        this.heattube_tem = heattube_tem;
    }

    public int getHeattube_tem() {
        return heattube_tem;
    }

    public void setBpap_in_p(int bpap_in_p) {
        this.bpap_in_p = bpap_in_p;
    }

    public int getBpap_in_p() {
        return bpap_in_p;
    }

    public void setScreensaver(int screensaver) {
        this.screensaver = screensaver;
    }

    public int getScreensaver() {
        return screensaver;
    }

    public void setInhale_sensitive(int inhale_sensitive) {
        this.inhale_sensitive = inhale_sensitive;
    }

    public int getInhale_sensitive() {
        return inhale_sensitive;
    }

    public void setExhale_sensitive(int exhale_sensitive) {
        this.exhale_sensitive = exhale_sensitive;
    }

    public int getExhale_sensitive() {
        return exhale_sensitive;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    public String getDeviceID() {
        return deviceID;
    }

    public void setApap_max_p(int apap_max_p) {
        this.apap_max_p = apap_max_p;
    }

    public int getApap_max_p() {
        return apap_max_p;
    }

    public void setAutos_max_p(int autos_max_p) {
        this.autos_max_p = autos_max_p;
    }

    public int getAutos_max_p() {
        return autos_max_p;
    }

    public void setHumidify_level(int humidify_level) {
        this.humidify_level = humidify_level;
    }

    public int getHumidify_level() {
        return humidify_level;
    }

    public void setDep_type(int dep_type) {
        this.dep_type = dep_type;
    }

    public int getDep_type() {
        return dep_type;
    }

    public void setBreath_fit(int breath_fit) {
        this.breath_fit = breath_fit;
    }

    public int getBreath_fit() {
        return breath_fit;
    }

    public void setLight(int light) {
        this.light = light;
    }

    public int getLight() {
        return light;
    }

    public void setMachine(int machine) {
        this.machine = machine;
    }

    public int getMachine() {
        return machine;
    }

    public void setBoostslope(int boostslope) {
        this.boostslope = boostslope;
    }

    public int getBoostslope() {
        return boostslope;
    }

    public void setPressure_support(int pressure_support) {
        this.pressure_support = pressure_support;
    }

    public int getPressure_support() {
        return pressure_support;
    }

    public void setCure_delay(int cure_delay) {
        this.cure_delay = cure_delay;
    }

    public int getCure_delay() {
        return cure_delay;
    }

    public void setApap_min_p(int apap_min_p) {
        this.apap_min_p = apap_min_p;
    }

    public int getApap_min_p() {
        return apap_min_p;
    }

    public void setSt_in_p(int st_in_p) {
        this.st_in_p = st_in_p;
    }

    public int getSt_in_p() {
        return st_in_p;
    }

    public void setFlight_mode(int flight_mode) {
        this.flight_mode = flight_mode;
    }

    public int getFlight_mode() {
        return flight_mode;
    }

    public void setAutos_min_p(int autos_min_p) {
        this.autos_min_p = autos_min_p;
    }

    public int getAutos_min_p() {
        return autos_min_p;
    }

}
