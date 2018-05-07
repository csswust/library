/**
 * Created by Sunny on 2018/5/6.
 */
/**
 * Created by Sunny on 2018/5/5.
 */
/**
 * Created by Sunny on 2018/5/5.
 */
/**
 * Created by Sunny on 2018/5/4.
 */
$(function () {
    var program = {
        orderId: 0,
        searchBookOrderById: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: parseInt(program.orderId)
                },
                success: function (result) {
                    var bookOrder = result.data.bookOrder;
                    var orderBookList = result.data.orderBookList;
                    var bookInfoList = result.data.bookInfoList;
                    var address = result.data.address;
                    var userInfo = result.data.userInfo;
                    $("#orderNumber").val(bookOrder.id);
                    $("#userName").val(userInfo.username);
                    $("#userAddress").val(address.addressInfo);
                    var sum=0;
                    for(var i=0; i<orderBookList.length; i++){
                        sum += orderBookList[i].subtotal;
                    }
                    var html ="";
                    for(var i=0; i<bookInfoList.length;i++){
                         var bookInfo = bookInfoList[i];
                         bookInfo.num = orderBookList[i].number;
                         bookInfo.sum = orderBookList[i].subtotal;
                         html += template("booklist",bookInfo);
                    }
                    document.getElementById("content").innerHTML = html;
                    $("#totalMoney").val(sum);
                    if(bookOrder.status == 1){
                        $("#orderStatus").val("已付款");
                    }else{
                        $("#orderStatus").val("未付款");
                    }

                    $("#orderTime").val(bookOrder.createTime);
                    // $("#userNote").val(order);order
                }
            });
        }
    };
    var request = new urlSearch();
    program.orderId = request.id;
    program.searchBookOrderById();

});
