package com.zjl.library.controller;

import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.AddressDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.Address;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/address")
public class AddressAction extends BaseAction {
    @Autowired
    private AddressDao addressDao;

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            Address address,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (address == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<Address> addressList = addressDao.selectByCondition(address,
                new BaseQuery(page, rows));
        Integer total = addressDao.selectByConditionGetCount(address, new BaseQuery());
        res.put("total", total);
        res.put("list", addressList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public Address selectById(@RequestParam Integer id) {
        return addressDao.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(Address address) {
        Map<String, Object> res = new HashMap<>();
        int result = addressDao.insertSelective(address);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(Address address) {
        Map<String, Object> res = new HashMap<>();
        int result = addressDao.updateByPrimaryKeySelective(address);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = addressDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam Address[] addressList) {
        if (addressList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = addressDao.insertBatch(Arrays.asList(addressList));
        if (status == addressList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
