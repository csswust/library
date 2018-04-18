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
        }
    };
    var request = new urlSearch();
    bookDetail_program.bookId = request.id;
    bookDetail_program.bookDetail();

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