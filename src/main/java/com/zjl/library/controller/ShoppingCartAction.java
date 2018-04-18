package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookInfoDao;
import com.zjl.library.dao.ShoppingCartDao;
import com.zjl.library.dao.common.BaseDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookInfo;
import com.zjl.library.entity.ShoppingCart;
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

import static com.zjl.library.service.common.BatchQueryService.getFieldByList;
import static com.zjl.library.service.common.BatchQueryService.selectRecordByIds;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/shoppingCart")
public class ShoppingCartAction extends BaseAction {
    @Autowired
    private ShoppingCartDao shoppingCartDao;
    @Autowired
    private BookInfoDao bookInfoDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            ShoppingCart shoppingCart,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (shoppingCart == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<ShoppingCart> shoppingCartList = shoppingCartDao.selectByCondition(shoppingCart,
                new BaseQuery(page, rows));
        List<BookInfo> bookInfoList = selectRecordByIds(
                getFieldByList(shoppingCartList, "bookId", ShoppingCart.class),
                "id", (BaseDao) bookInfoDao, BookInfo.class);
        Integer total = shoppingCartDao.selectByConditionGetCount(shoppingCart, new BaseQuery());
        res.put("total", total);
        res.put("list", shoppingCartList);
        res.put("bookInfoList", bookInfoList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectById(@RequestParam Integer id) {
        Map<String, Object> res = new HashMap<>();
        ShoppingCart shoppingCart = shoppingCartDao.selectByPrimaryKey(id);
        res.put("shoppingCart", shoppingCart);
        if (shoppingCart != null) {
            BookInfo bookInfo = bookInfoDao.selectByPrimaryKey(shoppingCart.getBookId());
            res.put("bookInfo", bookInfo);
        }
        return res;
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(ShoppingCart shoppingCart) {
        Map<String, Object> res = new HashMap<>();
        int userId = getUserId();
        shoppingCart.setUserId(userId);
        shoppingCart.setStatus(0);
        int result = shoppingCartDao.insertSelective(shoppingCart);
        res.put("status", result);
        res.put("id", shoppingCart.getId());
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(ShoppingCart shoppingCart) {
        Map<String, Object> res = new HashMap<>();
        int result = shoppingCartDao.updateByPrimaryKeySelective(shoppingCart);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = shoppingCartDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam ShoppingCart[] shoppingCartList) {
        if (shoppingCartList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = shoppingCartDao.insertBatch(Arrays.asList(shoppingCartList));
        if (status == shoppingCartList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
