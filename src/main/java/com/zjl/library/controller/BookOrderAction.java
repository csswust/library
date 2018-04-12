package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookOrderDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookOrder;
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
@RequestMapping("/bookOrder")
public class BookOrderAction extends BaseAction {
    @Autowired
    private BookOrderDao bookOrderDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            BookOrder bookOrder,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (bookOrder == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<BookOrder> bookOrderList = bookOrderDao.selectByCondition(bookOrder,
                new BaseQuery(page, rows));
        Integer total = bookOrderDao.selectByConditionGetCount(bookOrder, new BaseQuery());
        res.put("total", total);
        res.put("list", bookOrderList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public BookOrder selectById(@RequestParam Integer id) {
        return bookOrderDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(BookOrder bookOrder) {
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.insertSelective(bookOrder);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(BookOrder bookOrder) {
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.updateByPrimaryKeySelective(bookOrder);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam BookOrder[] bookOrderList) {
        if (bookOrderList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = bookOrderDao.insertBatch(Arrays.asList(bookOrderList));
        if (status == bookOrderList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
