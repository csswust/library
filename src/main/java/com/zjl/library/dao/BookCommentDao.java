package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookComment;

import java.util.List;

public interface BookCommentDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BookComment record);

    int insertSelective(BookComment record);

    BookComment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookComment record);

    int updateByPrimaryKeyWithBLOBs(BookComment record);

    int updateByPrimaryKey(BookComment record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<BookComment> selectByCondition(BookComment record, BaseQuery query);

    int selectByConditionGetCount(BookComment record, BaseQuery query);

    List<BookComment> selectByIds(String ids);

    List<BookComment> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<BookComment> recordList);
}
