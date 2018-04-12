package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookInfo;

import java.util.List;

public interface BookInfoDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BookInfo record);

    int insertSelective(BookInfo record);

    BookInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookInfo record);

    int updateByPrimaryKeyWithBLOBs(BookInfo record);

    int updateByPrimaryKey(BookInfo record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<BookInfo> selectByCondition(BookInfo record, BaseQuery query);

    int selectByConditionGetCount(BookInfo record, BaseQuery query);

    List<BookInfo> selectByIds(String ids);

    List<BookInfo> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<BookInfo> recordList);
}
