package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.ShoppingCartDao;
import com.zjl.library.entity.ShoppingCart;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class ShoppingCartDaoImpl extends CommonMapper<ShoppingCart, BaseQuery> implements ShoppingCartDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.ShoppingCartDao.";
    }

    @Override
    public void insertInit(ShoppingCart record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
    }

    @Override
    public void updatInit(ShoppingCart record, Date date) {
        record.setModifyTime(date);
    }
}
