package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.FirstClassify;

import java.util.List;

public interface FirstClassifyDao {
    int deleteByPrimaryKey(Integer id);

    int insert(FirstClassify record);

    int insertSelective(FirstClassify record);

    FirstClassify selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FirstClassify record);

    int updateByPrimaryKeyWithBLOBs(FirstClassify record);

    int updateByPrimaryKey(FirstClassify record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<FirstClassify> selectByCondition(FirstClassify record, BaseQuery query);

    int selectByConditionGetCount(FirstClassify record, BaseQuery query);

    List<FirstClassify> selectByIds(String ids);

    List<FirstClassify> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<FirstClassify> recordList);
}
