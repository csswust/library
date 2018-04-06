package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.BookInfoDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by 972536780 on 2018/4/6.
 */
@RestController
@RequestMapping("/bookInfo")
public class BookInfoAction extends BaseAction {
    @Autowired
    private BookInfoDao bookInfoDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectByCondition(
            @RequestParam BookInfo bookInfo,
            @RequestParam Integer page,
            @RequestParam Integer rows) {
        APIResult apiResult = new APIResult();
        int total = bookInfoDao.selectByConditionGetCount(bookInfo, new BaseQuery());
        List<BookInfo> bookInfoList = bookInfoDao.selectByCondition(
                bookInfo, new BaseQuery(page, rows));
        apiResult.setData("bookInfoList", bookInfoList);
        apiResult.setData("total", total);
        return apiResult;
    }
}
