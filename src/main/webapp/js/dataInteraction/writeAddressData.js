/**
 * Created by Sunny on 2018/4/21.
 */
$(function () {
   var writeAddress = {
       list_id: "",
       sum:0,
       myOrderBookList: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectById",
                dataType: "json",
                async: false,
                data:{
                    id: writeAddress.id
                },
                success: function (result) {
                    console.log(result);
                    var orderList = result.data.orderBookList;
                    var bookList = result.data.bookInfoList;
                    console.log(bookList);
                    console.log(orderList);
                    console.log(orderList.length);

                    $(".bookList_Content").empty();
                    var html ="";
                    for(var i = 0; i < orderList.length; i++){
                        bookList[i].id = orderList[i].bookId;
                        bookList[i].number = orderList[i].number;
                        bookList[i].sumCount = bookList[i].number * bookList[i].money;
                        writeAddress.sum += bookList[i].sumCount;
                        html += template("bookOrderList", bookList[i]);
                    }
                    $(".bookList_Content").append(html);
                }
            });
       }
   }
    var request = new urlSearch();//实例化
    writeAddress.id = request.createOrderId;
    console.log( writeAddress.id);

    // writeAddress.arr = writeAddress.str.split(',');
    // console.log(writeAddress.arr);
    // var len = writeAddress.arr.length;
    // console.log(len);

    writeAddress.myOrderBookList();
    $("#sum").text(writeAddress.sum + "元");
    $("#sumMoney").text(writeAddress.sum);

    $("#order").click(function () {
        window.location.href = "submitOrder.html";
    });
});