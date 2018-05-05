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
        bookId: "",
        account: "",
        image: "",
        author: "",
        ISBN: "",
        price: 0,
        money: 0,
        classification: "",
        bookPressTime: "",
        bookPress: "",
        bookSize: 0,
        bookPage: 0,
        bookSpecial: "",
        bookIntroduction: "",
        secondId: 0,
        searchBookInfoById: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: program.bookId
                },
                success: function (result) {
                    var secondClassifyList = result.secondClassifyList;
                    program.bookId = result.bookInfo.id;
                    $("#account").val(result.bookInfo.title);
                    //
                    // image;
                    $("#author").val(result.bookInfo.author);
                    $("#bookPressTime").val(result.bookInfo.pressTime);
                    $("#bookPress").val(result.bookInfo.press);
                    $("#classification").prepend("<option value='" + result.secondClassify.id + "'>" + result.secondClassify.name + "</option>");
                    for (var i = 0; i < secondClassifyList.length; i++) {
                        $("#classification").prepend("<option value='" + secondClassifyList[i].id + "'>" + secondClassifyList[i].name + "</option>");
                    }
                    $("#money").val(result.bookInfo.money);
                    $("#price").val(result.bookInfo.price);
                    $("#ISBN").val(result.bookInfo.isbn);
                    $("#bookSize").val(result.bookInfo.bookSize);
                    $("#bookPage").val(result.bookInfo.bookPage);
                    $("#bookIntroduction").val(result.bookInfo.bookIntroduction);
                    $("#bookSpecial").val(result.bookInfo.bookSpecial);
                }
            });
        },
        updateBookInfo: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/updateById",
                dataType: "json",
                async: false,
                data: {
                    id: program.bookId,
                    title: program.account,
                    image: program.image,
                    author: program.author,
                    pressTime: program.bookPressTime,
                    press: program.bookPress,
                    secondId: program.secondId,
                    money: program.money,
                    price: program.price,
                    isbn: program.ISBN,
                    bookSize: program.bookSize,
                    bookPage: program.bookPage,
                    bookIntroduction: program.bookIntroduction,
                    bookSpecial: program.bookSpecial
                },
                success: function (result) {
                    window.location.href = "bookList.html";
                }
            });
        }
    };
    var request = new urlSearch();
    program.bookId = request.id;
    program.searchBookInfoById();
    $("#submit_btn").click(function () {
        program.account = $("#account").val();
        program.image = $("#image").val();
        program.author = $("#author").val();
        program.bookPressTime = $("#bookPressTime").val();
        program.bookPress = $("#bookSpecial").val();
        program.secondId = $("#classification").val();
        program.money = $("#money").val();
        program.price = $("#price").val();
        program.ISBN = $("#ISBN").val();
        program.bookSize = $("#bookSize").val();
        program.bookPage = $("#bookPage").val();
        program.bookIntroduction = $("#bookIntroduction").val();
        program.bookSpecial = $("#bookSpecial").val();
        program.updateBookInfo();
    });

});
