package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.Address;

import java.util.List;

public interface AddressDao {
    int deleteByPrimaryKey(Integer id);

    int insert(Address record);

    int insertSelective(Address record);

    Address selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Address record);

    int updateByPrimaryKeyWithBLOBs(Address record);

    int updateByPrimaryKey(Address record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<Address> selectByCondition(Address record, BaseQuery query);

    int selectByConditionGetCount(Address record, BaseQuery query);

    List<Address> selectByIds(String ids);

    List<Address> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<Address> recordList);
}
