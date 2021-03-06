package com.zjl.library.controller;

import com.zjl.library.common.APIResult;
import com.zjl.library.controller.common.BaseAction;
import com.zjl.library.dao.*;
import com.zjl.library.dao.common.BaseDao;
import com.zjl.library.dao.common.BaseQuery;
import com.zjl.library.entity.*;
import com.zjl.library.utils.ArrayUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.zjl.library.service.common.BatchQueryService.getFieldByList;
import static com.zjl.library.service.common.BatchQueryService.selectRecordByIds;

/**
 * Created by 972536780 on 2018/4/1.
 */
@RestController
@RequestMapping("/bookOrder")
public class BookOrderAction extends BaseAction {
    @Autowired
    private BookOrderDao bookOrderDao;
    @Autowired
    private ShoppingCartDao shoppingCartDao;
    @Autowired
    private OrderBookDao orderBookDao;
    @Autowired
    private BookInfoDao bookInfoDao;
    @Autowired
    private BookCommentDao bookCommentDao;
    @Autowired
    private AddressDao addressDao;
    @Autowired
    private UserInfoDao userInfoDao;

    @RequestMapping(value = "/createOrder", method = {RequestMethod.GET, RequestMethod.POST})
    public Object createOrder(@RequestParam String ids) {
        APIResult apiResult = new APIResult();
        List<Integer> idList = ArrayUtil.StringToArray(ids, ",");
        BookOrder bookOrder = new BookOrder();
        bookOrder.setAddressId(1);
        bookOrder.setStatus(0);
        int status = bookOrderDao.insertSelective(bookOrder);
        if (status == 0 || bookOrder.getId() == null) {
            apiResult.setStatusAndDesc(-1, "订单插入失败");
            return apiResult;
        }
        int orderId = bookOrder.getId(), count = 0;
        double totalMoney = 0.0;
        for (int i = 0; i < idList.size(); i++) {
            ShoppingCart shoppingCart = shoppingCartDao.selectByPrimaryKey(idList.get(i));
            if (shoppingCart == null) continue;
            if (shoppingCart.getId() == null) continue;
            if (shoppingCart.getBookId() == null) continue;
            BookInfo bookInfo = bookInfoDao.selectByPrimaryKey(shoppingCart.getBookId());
            if (bookInfo == null) continue;
            if (bookInfo.getMoney() == null) continue;
            OrderBook orderBook = new OrderBook();
            orderBook.setBookId(shoppingCart.getBookId());
            orderBook.setOrderId(orderId);
            orderBook.setNumber(shoppingCart.getNumber());
            double subtotal = orderBook.getNumber() * bookInfo.getMoney();
            totalMoney += subtotal;
            orderBook.setSubtotal(subtotal);
            count += orderBookDao.insertSelective(orderBook);
            ShoppingCart record = new ShoppingCart();
            record.setId(shoppingCart.getId());
            record.setStatus(1);
            shoppingCartDao.updateByPrimaryKeySelective(record);
        }
        BookOrder record = new BookOrder();
        record.setId(orderId);
        record.setTotalMoney(totalMoney);
        bookOrderDao.updateByPrimaryKeySelective(record);
        apiResult.setData("orderId", orderId);
        apiResult.setData("count", count);
        apiResult.setStatusAndDesc(1, "创建订单成功");
        return apiResult;
    }

    @RequestMapping(value = "/selectByCondition", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> selectByCondition(
            BookOrder bookOrder,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer rows) {
        if (bookOrder == null) return null;
        Map<String, Object> res = new HashMap<>();
        List<BookOrder> bookOrderList = bookOrderDao.selectByCondition(bookOrder,
                new BaseQuery(page, rows));
        Integer total = bookOrderDao.selectByConditionGetCount(bookOrder, new BaseQuery());

        List<Address> addressList = selectRecordByIds(
                getFieldByList(bookOrderList, "addressId", BookOrder.class),
                "id", (BaseDao) addressDao, Address.class);
        List<UserInfo> userInfoList = selectRecordByIds(
                getFieldByList(addressList, "userId", Address.class),
                "id", (BaseDao)userInfoDao , UserInfo.class);
        List<List<OrderBook>> orderBookList = new ArrayList<List<OrderBook>>();
        for(int i=0; i<bookOrderList.size(); i++){
            OrderBook record = new OrderBook();
            record.setOrderId(bookOrderList.get(i).getId());
            orderBookList.add(orderBookDao.selectByCondition(record, new BaseQuery()));
        }
        res.put("total", total);
        res.put("addressList",addressList);
        res.put("userInfoList",userInfoList);
        res.put("orderBookList", orderBookList);
        res.put("list", bookOrderList);
        return res;
    }

    @RequestMapping(value = "/selectById", method = {RequestMethod.GET, RequestMethod.POST})
    public Object selectById(@RequestParam Integer id) {
        APIResult apiResult = new APIResult();
        BookOrder bookOrder = bookOrderDao.selectByPrimaryKey(id);
        if (bookOrder == null) {
            apiResult.setStatusAndDesc(-1, "查询失败");
            return apiResult;
        }
        OrderBook condition = new OrderBook();
        condition.setOrderId(id);
        List<OrderBook> orderBookList = orderBookDao.selectByCondition(
                condition, new BaseQuery());
        List<BookInfo> bookInfoList = selectRecordByIds(
                getFieldByList(orderBookList, "bookId", OrderBook.class),
                "id", (BaseDao) bookInfoDao, BookInfo.class);
        List<BookComment> bookCommentList = new ArrayList<>();
        for (BookInfo bookInfo : bookInfoList) {
            BookComment CommentCondition = new BookComment();
            CommentCondition.setOrderId(id);
            CommentCondition.setBookId(bookInfo.getId());
            List<BookComment> temp = bookCommentDao.selectByCondition(
                    CommentCondition, new BaseQuery(1, 1));
            if (temp == null || temp.size() == 0) bookCommentList.add(null);
            else bookCommentList.add(temp.get(0));
        }
        Address address = addressDao.selectByPrimaryKey(bookOrder.getAddressId());

        UserInfo userInfo = userInfoDao.selectByPrimaryKey(address.getUserId());
        apiResult.setStatusAndDesc(1, "查询成功");
        apiResult.setData("bookOrder", bookOrder);
        apiResult.setData("orderBookList", orderBookList);
        apiResult.setData("bookInfoList", bookInfoList);
        apiResult.setData("bookCommentList", bookCommentList);
        apiResult.setData("address",address);
        apiResult.setData("userInfo",userInfo);
        return apiResult;
    }

    @RequestMapping(value = "/insertOne", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertOne(BookOrder bookOrder) {
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.insertSelective(bookOrder);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/updateById", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> updateById(BookOrder bookOrder) {
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.updateByPrimaryKeySelective(bookOrder);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/deleteByIds", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> deleteByIds(@RequestParam String ids) {
        if (ids == null || StringUtils.isBlank(ids)) return null;
        Map<String, Object> res = new HashMap<>();
        int result = bookOrderDao.deleteByIds(ids);
        res.put("status", result);
        return res;
    }

    @RequestMapping(value = "/insertBatch", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> insertBatch(@RequestParam BookOrder[] bookOrderList) {
        if (bookOrderList == null) return null;
        Map<String, Object> res = new HashMap<>();
        int status = bookOrderDao.insertBatch(Arrays.asList(bookOrderList));
        if (status == bookOrderList.length) res.put("status", status);
        else res.put("status", 0);
        return res;
    }
}
