package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.FirstClassifyDao;
import com.zjl.library.entity.FirstClassify;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class FirstClassifyDaoImpl extends CommonMapper<FirstClassify, BaseQuery> implements FirstClassifyDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.FirstClassifyDao.";
    }

    @Override
    public void insertInit(FirstClassify record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }

    @Override
    public void updateInit(FirstClassify record, Date date) {
        record.setModifyTime(date);
        // record.setModifyUserId(getUserId());
    }
}
