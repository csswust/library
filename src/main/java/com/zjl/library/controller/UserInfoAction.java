package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.UserInfoDao;
import com.zjl.library.entity.UserInfo;
import org.apache.commons.lang3.StringUtils;
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

    @RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
    public Object login(@RequestParam String username, @RequestParam String password) {
        APIResult apiResult = new APIResult();
        if (StringUtils.isBlank(username)) {
            apiResult.setStatusAndDesc(-1, "用户不能为空");
        } else if (StringUtils.isBlank(password)) {
            apiResult.setStatusAndDesc(-2, "密码不能为空");
        } else {
            UserInfo userInfo = userInfoDao.selectByUsername(username);
            if (userInfo == null) {
                apiResult.setStatusAndDesc(-3, "用户不存在");
            } else if (!password.equals(userInfo.getPassword())) {
                apiResult.setStatusAndDesc(-4, "密码错误");
            } else {
                apiResult.setStatusAndDesc(1, "登录成功");
                userInfo.setPassword(null);
                apiResult.setData("userInfo", userInfo);
                saveSession(request, "userId", userInfo.getId());
            }
        }
        return apiResult;
    }

    @RequestMapping(value = "/check", method = {RequestMethod.GET, RequestMethod.POST})
    public Object check() {
        APIResult apiResult = new APIResult();
        Integer userId = (Integer) getSession(request, "userId");
        if (userId == null) apiResult.setStatus(-1);
        else {
            UserInfo userInfo = userInfoDao.selectByPrimaryKey(userId);
            if (userInfo == null) apiResult.setStatus(-2);
            else {
                apiResult.setStatus(1);
                userInfo.setPassword(null);
                apiResult.setData("userInfo", userInfo);
            }
        }
        return apiResult;
    }
}
