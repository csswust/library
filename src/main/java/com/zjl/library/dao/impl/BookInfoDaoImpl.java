package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.BookInfoDao;
import com.zjl.library.entity.BookInfo;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class BookInfoDaoImpl extends CommonMapper<BookInfo, BaseQuery> implements BookInfoDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.BookInfoDao.";
    }

    @Override
    public void insertInit(BookInfo record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
    }

    @Override
    public void updatInit(BookInfo record, Date date) {
        record.setModifyTime(date);
    }
}
