package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookCommentDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookComment;
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
@RequestMapping("/bookComment")
public class BookCommentAction extends BaseAction {
    @Autowired
    private BookCommentDao bookCommentDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            BookComment bookComment,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (bookComment == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<BookComment> bookCommentList = bookCommentDao.selectByCondition(bookComment,
                new BaseQuery(page, rows));
        Integer total = bookCommentDao.selectByConditionGetCount(bookComment, new BaseQuery());
        res.put("total", total);
        res.put("list", bookCommentList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public BookComment selectById(@RequestParam Integer id) {
        return bookCommentDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(BookComment bookComment) {
        Map<String, Object> res = new HashMap<>();
        int result = bookCommentDao.insertSelective(bookComment);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(BookComment bookComment) {
        Map<String, Object> res = new HashMap<>();
        int result = bookCommentDao.updateByPrimaryKeySelective(bookComment);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = bookCommentDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam BookComment[] bookCommentList) {
        if (bookCommentList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = bookCommentDao.insertBatch(Arrays.asList(bookCommentList));
        if (status == bookCommentList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
