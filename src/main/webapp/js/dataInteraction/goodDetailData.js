/**
 * Created by Sunny on 2018/4/7.
 */
$(function () {
    $("#searchButton").click(function () {
       var goodDetail_title = $("#keyword").val();
       window.location.href =  "goodList.html?goodDetail_title="+goodDetail_title;
    });

    var bookDetail_program = {
        bookId: "",
        bookDetail: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/selectById",
                dataType: "json",
                async: false,
                data:{
                    id: bookDetail_program.bookId
                },
                success: function (bookDetail_result) {
                    console.log(bookDetail_result);

                    $(".bookDetailContent").empty();
                    $(".bookDetailMain").empty();
                    bookDetail_result.bookInfo.pressTime = bookDetail_result.bookInfo.pressTime.split(" ")[0];
                    var bookDetail_content_rander = template("bookDetail_content", bookDetail_result);
                    var bookDetail_main_rander = template("bookDetail_main", bookDetail_result);
                    $(".bookDetailContent").append(bookDetail_content_rander);
                    $(".bookDetailMain").append(bookDetail_main_rander);
                }
            });
        },
        bookComments:function () {
            $.ajax({
                type: "GET",
                url: "/library/bookComment/selectByCondition",
                dataType: "json",
                async: false,
                data:{
                    bookId: bookDetail_program.bookId
                },
                success: function (result) {
                    console.log(result);
                    $("#total").text(result.total);
                    var bookCommentList = result.list;
                    var userInfoList = result.userInfoList;
                    var html = "";
                    for(var i=0; i<bookCommentList.length; i++){
                        var comment = bookCommentList[i];
                        var arr = [];
                        comment.userName = userInfoList[i].username;
                        for(var j=0; j<comment.score; j++){
                            arr.push("one");
                        }
                        for(var j=comment.score; j<5; j++){
                            arr.push("none");
                        }
                        comment.arr = arr;
                        html += template("themes",comment);
                    }
                    document.getElementById("content").innerHTML = html;
                }
            });
        }
    };
    var request = new urlSearch();
    bookDetail_program.bookId = request.bookId;
    bookDetail_program.bookDetail();
    bookDetail_program.bookComments();

    //添加购物车
    var addShoppingCart = {
        book_id: "",
        book_number: "1",
        addShoppingCart_success: function () {
            $.ajax({
                type: "POST",
                url: "/library/shoppingCart/insertOne",
                dataType: "json",
                async: false,
                data:{
                    bookId: request.id,
                    number: addShoppingCart.book_number
                },
                success: function (result) {
                    if(result.status == 1){
                        window.location.href = "../ShoppingCart/addShoppingCart_success.html?id="+ result.id;
                    }
                }
            });
        }
    };
    $(".goodDetail_addShoppingCart").click(function () {
        addShoppingCart.addShoppingCart_success();
    });
});