package com.zjl.library.dao.impl;

import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.dao.common.CommonMapper;
import com.zjl.library.dao.UserInfoDao;
import com.zjl.library.entity.UserInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class UserInfoDaoImpl extends CommonMapper<UserInfo, BaseQuery> implements UserInfoDao {
    @Override
    public String getPackage() {
        return "com.zjl.library.dao.UserInfoDao.";
    }

    @Override
    public void insertInit(UserInfo record, Date date) {
        record.setId(null);
        record.setCreateTime(date);
        record.setModifyTime(date);
    }

    @Override
    public void updatInit(UserInfo record, Date date) {
        record.setModifyTime(date);
    }

    @Override
    public UserInfo selectByUsername(String username) {
        if (StringUtils.isBlank(username)) return null;
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(username);
        List<UserInfo> userInfoList = selectByCondition(userInfo, new BaseQuery(1, 1));
        if (userInfoList == null || userInfoList.size() == 0) return null;
        return userInfoList.get(0);
    }
}
