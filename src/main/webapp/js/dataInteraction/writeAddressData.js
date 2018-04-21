/**
 * Created by Sunny on 2018/4/21.
 */
$(function () {
   var writeAddress = {
       list_id: "",
       myOrderBookList: function () {
            $.ajax({
                type: "POST",
                url: "/library/bookOrder/selectById",
                dataType: "json",
                async: false,
                data:{
                    id: writeAddress.id
                },
                success: function (result) {
                    // alert(2);
                    console.log(result);

                    // var orderList = result.orderBookList;
                    var bookList = result.bookInfoList;
                    console.log(result.bookInfoList);
                    $(".bookList_Content").empty();
                    bookList.number = result.orderBookList.number;

                    bookList.sumCount = bookList.number * bookList.money;
                    var writeAddressRander = template("bookOrderList", bookList[i]);
                    $(".bookList_Content").append(writeAddressRander);
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
});