package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.AddressDao;
import com.zjl.library.entity.Address;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class AddressDaoImpl extends CommonMapper<Address, BaseQuery> implements AddressDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.AddressDao.";
    }

    @Override
    public void insertInit(Address record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
    }

    @Override
    public void updatInit(Address record, Date date) {
        record.setModifyTime(date);
    }
}
