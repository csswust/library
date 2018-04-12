package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.BookOrderDao;
import com.zjl.library.entity.BookOrder;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class BookOrderDaoImpl extends CommonMapper<BookOrder, BaseQuery> implements BookOrderDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.BookOrderDao.";
    }

    @Override
    public void insertInit(BookOrder record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }

    @Override
    public void updateInit(BookOrder record, Date date) {
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }
}
