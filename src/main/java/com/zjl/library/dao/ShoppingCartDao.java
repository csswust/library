package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.ShoppingCart;

import java.util.List;

public interface ShoppingCartDao {
    int deleteByPrimaryKey(Integer id);

    int insert(ShoppingCart record);

    int insertSelective(ShoppingCart record);

    ShoppingCart selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShoppingCart record);

    int updateByPrimaryKeyWithBLOBs(ShoppingCart record);

    int updateByPrimaryKey(ShoppingCart record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<ShoppingCart> selectByCondition(ShoppingCart record, BaseQuery query);

    int selectByConditionGetCount(ShoppingCart record, BaseQuery query);

    List<ShoppingCart> selectByIds(String ids);

    List<ShoppingCart> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<ShoppingCart> recordList);
}
