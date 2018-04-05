package com.zjl.library.dao;

import com.zjl.library.entity.BookComment;

public interface BookCommentDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BookComment record);

    int insertSelective(BookComment record);

    BookComment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookComment record);

    int updateByPrimaryKeyWithBLOBs(BookComment record);

    int updateByPrimaryKey(BookComment record);
}