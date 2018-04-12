package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.SecondClassify;

import java.util.List;

public interface SecondClassifyDao {
    int deleteByPrimaryKey(Integer id);

    int insert(SecondClassify record);

    int insertSelective(SecondClassify record);

    SecondClassify selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SecondClassify record);

    int updateByPrimaryKeyWithBLOBs(SecondClassify record);

    int updateByPrimaryKey(SecondClassify record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<SecondClassify> selectByCondition(SecondClassify record, BaseQuery query);

    int selectByConditionGetCount(SecondClassify record, BaseQuery query);

    List<SecondClassify> selectByIds(String ids);

    List<SecondClassify> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<SecondClassify> recordList);
}
