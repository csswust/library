package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.OrderBookDao;
import com.zjl.library.entity.OrderBook;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class OrderBookDaoImpl extends CommonMapper<OrderBook, BaseQuery> implements OrderBookDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.OrderBookDao.";
    }

    @Override
    public void insertInit(OrderBook record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }

    @Override
    public void updateInit(OrderBook record, Date date) {
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }
}
