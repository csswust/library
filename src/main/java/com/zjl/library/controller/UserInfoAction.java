package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.UserInfoDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.UserInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/userInfo")
public class UserInfoAction extends BaseAction {
    @Autowired
    private UserInfoDao userInfoDao;

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

    @RequestMapping(value = "/logout", method = {RequestMethod.GET, RequestMethod.POST})
    public Object logout(HttpServletRequest request) {
        APIResult apiResult = new APIResult();
        this.clearSession(request);
        apiResult.setDesc("退出成功");
        apiResult.setStatus(1);
        return apiResult;
    }


    @RequestMapping(value = "/register", method = {RequestMethod.GET, RequestMethod.POST})
    public Object register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email) {
        APIResult apiResult = new APIResult();
        if (StringUtils.isBlank(username)) {
            apiResult.setStatusAndDesc(-403, "username不能为空");
            return apiResult;
        }
        if (StringUtils.isBlank(password)) {
            apiResult.setStatusAndDesc(-403, "password");
            return apiResult;
        }
        if (StringUtils.isBlank(email)) {
            apiResult.setStatusAndDesc(-403, "email不能为空");
            return apiResult;
        }
        UserInfo userInfo = userInfoDao.selectByUsername(username);
        if (userInfo != null) {
            apiResult.setStatusAndDesc(-1, "此用户名已存在");
        } else {
            UserInfo record = new UserInfo();
            record.setUsername(username);
            record.setPassword(password);
            record.setEmail(email);
            int status = userInfoDao.insertSelective(record);
            apiResult.setStatus(status);
        }
        return apiResult;
    }

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            UserInfo userInfo,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (userInfo == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<UserInfo> userInfoList = userInfoDao.selectByCondition(userInfo,
                new BaseQuery(page, rows));
        Integer total = userInfoDao.selectByConditionGetCount(userInfo, new BaseQuery());
        res.put("total", total);
        res.put("list", userInfoList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public UserInfo selectById(@RequestParam Integer id) {
        return userInfoDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(UserInfo userInfo) {
        Map<String, Object> res = new HashMap<>();
        int result = userInfoDao.insertSelective(userInfo);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(UserInfo userInfo) {
        Map<String, Object> res = new HashMap<>();
        int result = userInfoDao.updateByPrimaryKeySelective(userInfo);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = userInfoDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam UserInfo[] userInfoList) {
        if (userInfoList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = userInfoDao.insertBatch(Arrays.asList(userInfoList));
        if (status == userInfoList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
