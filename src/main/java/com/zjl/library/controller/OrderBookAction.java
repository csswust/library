package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookInfoDao;
import com.zjl.library.dao.BookOrderDao;
import com.zjl.library.dao.OrderBookDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookInfo;
import com.zjl.library.entity.BookOrder;
import com.zjl.library.entity.OrderBook;
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
@RequestMapping("/orderBook")
public class OrderBookAction extends BaseAction {
    @Autowired
    private OrderBookDao orderBookDao;
    @Autowired
    private BookOrderDao bookOrderDao;
    @Autowired
    private BookInfoDao bookInfoDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            OrderBook orderBook,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (orderBook == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<OrderBook> orderBookList = orderBookDao.selectByCondition(orderBook,
                new BaseQuery(page, rows));
        Integer total = orderBookDao.selectByConditionGetCount(orderBook, new BaseQuery());
        res.put("total", total);
        res.put("list", orderBookList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectById(@RequestParam Integer id) {
        APIResult apiResult = new APIResult();
        OrderBook orderBook = orderBookDao.selectByPrimaryKey(id);
        apiResult.setData("orderBook", orderBook);
        if (orderBook != null) {
            BookOrder bookOrder = bookOrderDao.selectByPrimaryKey(orderBook.getOrderId());
            BookInfo bookInfo = bookInfoDao.selectByPrimaryKey(orderBook.getBookId());
            apiResult.setData("bookOrder", bookOrder);
            apiResult.setData("bookInfo", bookInfo);
        }
        return apiResult;
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(OrderBook orderBook) {
        Map<String, Object> res = new HashMap<>();
        int result = orderBookDao.insertSelective(orderBook);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(OrderBook orderBook) {
        Map<String, Object> res = new HashMap<>();
        int result = orderBookDao.updateByPrimaryKeySelective(orderBook);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = orderBookDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam OrderBook[] orderBookList) {
        if (orderBookList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = orderBookDao.insertBatch(Arrays.asList(orderBookList));
        if (status == orderBookList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
