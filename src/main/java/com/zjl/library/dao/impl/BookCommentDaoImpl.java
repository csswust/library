package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.BookCommentDao;
import com.zjl.library.entity.BookComment;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class BookCommentDaoImpl extends CommonMapper<BookComment, BaseQuery> implements BookCommentDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.BookCommentDao.";
    }

    @Override
    public void insertInit(BookComment record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }

    @Override
    public void updateInit(BookComment record, Date date) {
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }
}
