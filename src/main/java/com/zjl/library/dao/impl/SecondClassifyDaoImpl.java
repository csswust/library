package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.SecondClassifyDao;
import com.zjl.library.entity.SecondClassify;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class SecondClassifyDaoImpl extends CommonMapper<SecondClassify, BaseQuery> implements SecondClassifyDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.SecondClassifyDao.";
    }

    @Override
    public void insertInit(SecondClassify record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }

    @Override
    public void updateInit(SecondClassify record, Date date) {
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }
}
