package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.UserInfoDao;
import com.zjl.library.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/user")
public class UserInfoAction extends BaseAction {
    @Autowired
    private UserInfoDao userInfoDao;

    @RequestMapping(value = "/selectById", method = RequestMethod.GET)
    public Object selectById(@RequestParam Integer userId) {
        UserInfo userInfo = userInfoDao.selectByPrimaryKey(userId);
        return userInfo;
    }
}
