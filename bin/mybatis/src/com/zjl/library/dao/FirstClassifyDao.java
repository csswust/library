package com.zjl.library.dao;

import com.zjl.library.entity.FirstClassify;

public interface FirstClassifyDao {
    int deleteByPrimaryKey(Integer id);

    int insert(FirstClassify record);

    int insertSelective(FirstClassify record);

    FirstClassify selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FirstClassify record);

    int updateByPrimaryKey(FirstClassify record);
}