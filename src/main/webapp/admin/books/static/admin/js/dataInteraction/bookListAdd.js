/**
 * Created by Sunny on 2018/5/17.
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
        bookName: "",
        bookIntroduction: "",
        title: "",
        image: "",
        author: "",
        pressTime: "",
        press: "",
        secondId: "",
        money: 0,
        price: 0,
        isbn: "",
        bookSize: "",
        bookPage: "",
        createTime: "",
        modifyTime: "",
        bookIntroduction: "",
        bookSpecial: "",
        insertBook: function () {
            $.ajax({
                type: "POST",
                url: "/library/bookInfo/insertOne",
                dataType: "json",
                async: false,
                data: {
                    bookIntroduction: program.bookIntroduction,
                    title: program.title,
                    image: program.image,
                    author: program.author,
                    pressTime: program.pressTime,
                    press: program.press,
                    secondId: program.secondId,
                    money: program.money,
                    price: program.price,
                    isbn: program.isbn,
                    bookSize: program.bookSize,
                    bookPage: program.bookPage,
                    createTime: program.createTime,
                    bookIntroduction: program.bookIntroduction,
                    bookSpecial: program.bookSpecial,
                },
                success: function (result) {
                    window.location.href = "bookList.html"
                }

            });
        },
        seacherClassificationSecond: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/selectByCondition",
                dataType: "json",
                async: false,
                data: {},
                success: function (result) {
                    var secondClassifyList = result.list;
                    for (var i = 0; i < secondClassifyList.length; i++) {
                        $("#classification").prepend("<option value='" + secondClassifyList[i].id + "'>" + secondClassifyList[i].name + "</option>");
                    }
                }
            });
        },
        uploadFile: function () {
            $.ajaxFileUpload({
                type: "POST",
                url: "/library/system/upload",
                secureuri: false,
                fileElementId: "file",
                dataType: "json",
                async: false,
                success: function (data) {
                    program.image = "/" + data.path;
                }
            });
        }
    };
    program.seacherClassificationSecond();
    $("#submit_btn").click(function () {
        program.bookIntroduction = $("#bookIntroduction").val();
        program.title = $("#account").val();
        program.author = $("#author").val();
        program.pressTime = $("#bookPressTime").val();
        program.press = $("#bookPress").val();
        program.secondId = $("#classification").val();
        program.money = $("#money").val();
        program.price = $("#price").val();
        program.isbn = $("#ISBN").val();
        program.bookSize = $("#bookSize").val();
        program.bookPage = $("#bookPage").val();
        program.bookIntroduction = $("#bookIntroduction").val();
        program.bookSpecial = $("#bookSpecial").val();
        program.insertBook();
    });
    $("#upload").click(function () {
        program.uploadFile();
    });
});
