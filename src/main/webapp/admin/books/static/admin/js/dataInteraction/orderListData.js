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
    var index = 1;
    var program = {
        page: 1,
        rows: 10,
        total: 0,
        id: 0,
        searchBookOrderList: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.total;
                    var addressList = result.addressList;
                    var userInfoList = result.userInfoList;
                    var orderBookList = result.orderBookList;
                    var bookOrderList = result.list;
                    var html = "";
                    var secondClassifyList = result.secondClassifyList;
                    for (var i = 0; i < bookOrderList.length; i++) {
                        var bookOrder = bookOrderList[i];
                        bookOrder.index = index;
                        index += 1;
                        bookOrder.orderId = bookOrderList[i].id;
                        bookOrder.editId = bookOrderList[i].id;
                        bookOrder.deleteId = bookOrderList[i].id;
                        bookOrder.userName = userInfoList[i].username;
                        bookOrder.addressInfo = addressList[i].addressInfo;
                        var sum = 0;
                        for (var j = 0; j < orderBookList[i].length; j++) {
                            sum += orderBookList[i][j].subtotal;
                        }
                        bookOrder.subtotal = sum;
                        if (bookOrderList[i].status == 1) {
                            bookOrder.status = "已付款";
                        } else {
                            bookOrder.status = "未付款";
                        }
                        bookOrder.createTime = bookOrderList[i].createTime;
                        html += template("orderList", bookOrder);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".delete-order").click(function () {
                        program.id = this.id;
                        program.deleteOrderById();
                    });
                    $(".edit-order").click(function () {
                        window.location.href = "orderEdit.html?id=" + this.id;
                    });
                }

            });
        },
        deleteOrderById: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids: program.id + ""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchBookOrderList();
    $(".fa-search").click(function () {
        program.id = $("#keywords").val();
        program.searchBookOrderList();
    });
    $(function () {
        $('.M-box2').pagination({
            totalData: program.total,
            showData: program.row,
            coping: true,
            homePage: '<<',
            endPage: '>>',
            prevContent: '<',
            nextContent: '>',
            callback: function (api) {
                program.page = api.getCurrent();
                program.searchBookOrderList()
            }
        });
    });
});
