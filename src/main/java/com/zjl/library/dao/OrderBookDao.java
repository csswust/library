package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.OrderBook;

import java.util.List;

public interface OrderBookDao {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderBook record);

    int insertSelective(OrderBook record);

    OrderBook selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderBook record);

    int updateByPrimaryKeyWithBLOBs(OrderBook record);

    int updateByPrimaryKey(OrderBook record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<OrderBook> selectByCondition(OrderBook record, BaseQuery query);

    int selectByConditionGetCount(OrderBook record, BaseQuery query);

    List<OrderBook> selectByIds(String ids);

    List<OrderBook> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<OrderBook> recordList);
}
