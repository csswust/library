/**
 * Created by Sunny on 2018/4/22.
 */
$(function () {
    var orderList = {
        order_id: "",
        sumMoney: "",
        createTime: "",
        orderStatus: "",
        orderNumber: "",
        orderListContent: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectByCondition",
                dataType: "json",
                async: false,
                data:{
                    id: orderList.order_id
                },
                success: function (result) {
                    console.log(result);
                    orderList.orderNumber = result.total;
                    console.log(orderList.orderNumber);
                    var orderListContent = result.list;
                    console.log(orderListContent);
                    var bookList = result.bookInfoList;

                    $(".orderList_Main").empty();
                    var html ="";
                    for(var i = 0; i < orderList.orderNumber ; i++){
                        // console.log(orderListContent[i].id);

                        orderListContent[i].createTime = orderListContent[i].createTime.split(" ")[0];
                        if(orderListContent[i].status == 1){
                            orderListContent[i].orderStatus = "已收货";
                            console.log(orderListContent[i].id);
                            $("#writeComment").click(function () {
                                window.location.href = "../goods/writeGoodComment.html?orderId=" + orderListContent[i].id;
                            })
                        }else{
                            orderListContent[i].orderStatus = "待付款";
                        }

                        html += template("orderList", orderListContent[i]);
                    }
                    $(".orderList_Main").append(html);
                }
            });
        }
    }
    orderList.orderListContent();
});