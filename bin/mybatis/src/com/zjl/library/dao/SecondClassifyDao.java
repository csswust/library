package com.zjl.library.dao;

import com.zjl.library.entity.SecondClassify;

public interface SecondClassifyDao {
    int deleteByPrimaryKey(Integer id);

    int insert(SecondClassify record);

    int insertSelective(SecondClassify record);

    SecondClassify selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SecondClassify record);

    int updateByPrimaryKey(SecondClassify record);
}