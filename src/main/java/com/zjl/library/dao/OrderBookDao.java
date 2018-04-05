package com.zjl.library.dao;

import com.zjl.library.entity.OrderBook;

public interface OrderBookDao {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderBook record);

    int insertSelective(OrderBook record);

    OrderBook selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderBook record);

    int updateByPrimaryKeyWithBLOBs(OrderBook record);

    int updateByPrimaryKey(OrderBook record);
}