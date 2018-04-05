package com.zjl.library.dao;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.UserInfo;

import java.util.List;

public interface UserInfoDao {
    int deleteByPrimaryKey(Integer id);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);

    int deleteByIds(String ids);

    int deleteByIdsList(List<Integer> idsList);

    List<UserInfo> selectByCondition(UserInfo record, BaseQuery query);

    int selectByConditionGetCount(UserInfo record, BaseQuery query);

    List<UserInfo> selectByIds(String ids);

    List<UserInfo> selectByIdsList(List<Integer> idsList);

    int insertBatch(List<UserInfo> recordList);

    UserInfo selectByUsername(String username);
}