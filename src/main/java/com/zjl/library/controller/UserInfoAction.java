package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.UserInfoDao;
import com.zjl.library.entity.UserInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

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

    @RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
    public Object login(@RequestParam String username, @RequestParam String password) {
        Map<String, Object> res = new HashMap<>();
        if (StringUtils.isBlank(username)) {
            res.put("desc", "用户不能为空");
        } else if (StringUtils.isBlank(password)) {
            res.put("desc", "密码不能为空");
        } else {
            UserInfo userInfo = userInfoDao.selectByUsername(username);
            if (userInfo == null) res.put("desc", "用户不存在");
            else if (!password.equals(userInfo.getPassword())) {
                res.put("desc", "密码错误");
            } else {
                res.put("status", 1);
                saveSession(request, "userId", userInfo.getId());
            }
        }
        return res;
    }
}
