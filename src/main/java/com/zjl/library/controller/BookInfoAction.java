package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookInfoDao;
import com.zjl.library.dao.SecondClassifyDao;
import com.zjl.library.dao.common.BaseDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookInfo;
import com.zjl.library.entity.SecondClassify;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.zjl.library.service.common.BatchQueryService.getFieldByList;
import static com.zjl.library.service.common.BatchQueryService.selectRecordByIds;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/bookInfo")
public class BookInfoAction extends BaseAction {
    @Autowired
    private BookInfoDao bookInfoDao;
    @Autowired
    private SecondClassifyDao secondClassifyDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectByCondition(
            BookInfo bookInfo,
            @RequestParam(required = false) String sTitle,
            @RequestParam(required = false) String sAuthor,
            @RequestParam(required = false) String sPress,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        APIResult apiResult = new APIResult();
        BaseQuery baseQuery = new BaseQuery();
        if (StringUtils.isNotBlank(sTitle)) {
            baseQuery.setCustom("sTitle", sTitle);
        }
        if (StringUtils.isNotBlank(sAuthor)) baseQuery.setCustom("sAuthor", sAuthor);
        if (StringUtils.isNotBlank(sPress)) baseQuery.setCustom("sPress", sPress);
        int total = bookInfoDao.selectByConditionGetCount(bookInfo, baseQuery);
        baseQuery.setPageRows(page, rows);
        List<BookInfo> bookInfoList = bookInfoDao.selectByCondition(bookInfo, baseQuery);


        List<SecondClassify> secondClassifyList = selectRecordByIds(
                getFieldByList(bookInfoList, "secondId", BookInfo.class),
                "id", (BaseDao) secondClassifyDao, SecondClassify.class);
        apiResult.setData("bookInfoList", bookInfoList);
        apiResult.setData("secondClassifyList", secondClassifyList);
        apiResult.setData("total", total);
        return apiResult;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectById(@RequestParam Integer id) {
        Map<String, Object> res = new HashMap<>();
        BookInfo bookInfo = bookInfoDao.selectByPrimaryKey(id);
        if (bookInfo != null) {
            SecondClassify secondClassify = secondClassifyDao.selectByPrimaryKey(bookInfo.getSecondId());
            res.put("secondClassify", secondClassify);
        }
        List<SecondClassify> secondClassifyList = secondClassifyDao.selectByCondition(new SecondClassify(), new BaseQuery());
        res.put("secondClassifyList", secondClassifyList);
        res.put("bookInfo", bookInfo);
        return res;
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(BookInfo bookInfo) {
        Map<String, Object> res = new HashMap<>();
        bookInfo.setCreateTime(new Date());
        System.out.println(bookInfo.getPressTime());
        int result = bookInfoDao.insertSelective(bookInfo);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(BookInfo bookInfo) {
        Map<String, Object> res = new HashMap<>();
        int result = bookInfoDao.updateByPrimaryKeySelective(bookInfo);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = bookInfoDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam BookInfo[] bookInfoList) {
        if (bookInfoList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = bookInfoDao.insertBatch(Arrays.asList(bookInfoList));
        if (status == bookInfoList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
