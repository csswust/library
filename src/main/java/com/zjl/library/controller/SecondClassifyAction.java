package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.SecondClassifyDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.SecondClassify;
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
@RequestMapping("/secondClassify")
public class SecondClassifyAction extends BaseAction {
    @Autowired
    private SecondClassifyDao secondClassifyDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            SecondClassify secondClassify,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (secondClassify == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<SecondClassify> secondClassifyList = secondClassifyDao.selectByCondition(secondClassify,
                new BaseQuery(page, rows));
        Integer total = secondClassifyDao.selectByConditionGetCount(secondClassify, new BaseQuery());
        res.put("total", total);
        res.put("list", secondClassifyList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public SecondClassify selectById(@RequestParam Integer id) {
        return secondClassifyDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(SecondClassify secondClassify) {
        Map<String, Object> res = new HashMap<>();
        int result = secondClassifyDao.insertSelective(secondClassify);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(SecondClassify secondClassify) {
        Map<String, Object> res = new HashMap<>();
        int result = secondClassifyDao.updateByPrimaryKeySelective(secondClassify);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = secondClassifyDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam SecondClassify[] secondClassifyList) {
        if (secondClassifyList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = secondClassifyDao.insertBatch(Arrays.asList(secondClassifyList));
        if (status == secondClassifyList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
