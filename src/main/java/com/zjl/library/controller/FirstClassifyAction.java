package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.FirstClassifyDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.FirstClassify;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/firstClassify")
public class FirstClassifyAction extends BaseAction {
    @Autowired
    private FirstClassifyDao firstClassifyDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            FirstClassify firstClassify,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (firstClassify == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<FirstClassify> firstClassifyList = firstClassifyDao.selectByCondition(firstClassify,
                new BaseQuery(page, rows));
        Integer total = firstClassifyDao.selectByConditionGetCount(firstClassify, new BaseQuery());
        res.put("total", total);
        res.put("list", firstClassifyList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public FirstClassify selectById(@RequestParam Integer id) {
        return firstClassifyDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(FirstClassify firstClassify) {
        Map<String, Object> res = new HashMap<>();
        int result = firstClassifyDao.insertSelective(firstClassify);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(FirstClassify firstClassify) {
        Map<String, Object> res = new HashMap<>();
        int result = firstClassifyDao.updateByPrimaryKeySelective(firstClassify);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = firstClassifyDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam FirstClassify[] firstClassifyList) {
        if (firstClassifyList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = firstClassifyDao.insertBatch(Arrays.asList(firstClassifyList));
        if (status == firstClassifyList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
