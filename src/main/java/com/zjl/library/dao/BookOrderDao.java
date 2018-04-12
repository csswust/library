package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.BookOrder;

import java.util.List;

public interface BookOrderDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BookOrder record);

    int insertSelective(BookOrder record);

    BookOrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BookOrder record);

    int updateByPrimaryKeyWithBLOBs(BookOrder record);

    int updateByPrimaryKey(BookOrder record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<BookOrder> selectByCondition(BookOrder record, BaseQuery query);

    int selectByConditionGetCount(BookOrder record, BaseQuery query);

    List<BookOrder> selectByIds(String ids);

    List<BookOrder> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<BookOrder> recordList);
}
