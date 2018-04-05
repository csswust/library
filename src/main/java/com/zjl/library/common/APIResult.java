package com.zjl.library.common;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by 972536780 on 2018/3/12.
 */
public class APIResult {
    private Integer status = 0;
    private String desc = "";
    private Map<String, Object> data = new HashMap<>();

    public APIResult() {
        status = 0;
        desc = "";
    }

    public APIResult(Integer status) {
        this.status = status;
    }

    public APIResult(Integer status, String desc) {
        this.status = status;
        this.desc = desc;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public void setStatusAndDesc(Integer status, String desc) {
        this.status = status;
        this.desc = desc;
    }

    public void setData(String key, Object vlaue) {
        data.put(key, vlaue);
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
